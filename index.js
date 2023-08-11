import React from "react";

// Rouct context
const Context = React.createContext("/");
const routing = {
    pathPrefix: "/",
    current: null,
};

// Unescape a character
const unescape = str => window.decodeURIComponent(str.replace(/\+/g, " "));

// Add a leading slash to a path string
const addLeadingSlash = str => str.charAt(0) === "/" ? str : "/" + str;

// Parse a string path
const parsePath = (str = "/", prefix = "/") => {
    const parsedPath = addLeadingSlash(str.startsWith(prefix) ? str.replace(prefix, "") : str);
    let pathname = parsedPath;
    let search = "";
    let hash = "";
    let hashIndex = pathname.indexOf("#");
    if (hashIndex !== -1) {
        hash = pathname.substr(hashIndex);
        pathname = pathname.substr(0, hashIndex);
    }
    let searchIndex = pathname.indexOf("?");
    if (searchIndex !== -1) {
        search = pathname.substr(searchIndex).trim();
        pathname = pathname.substr(0, searchIndex);
    }
    return {
        originalPath: str,
        prefix: prefix,
        path: parsedPath,
        pathname: pathname,
        search: search,
        query: parseQueryString(search),
        hash: (hash === "#") ? "" : hash,
    };
};

// Split a path by slashes
const splitPath = str => str.trim().split("/").filter(s => !!s);

// Join two paths
const joinPath = (base, ...segments) => {
    const paths = base.split("/").filter(p => p.length > 0);
    (segments || []).forEach(s => {
        s && typeof s === "string" && paths.push(s.split("/").filter(p => !!p && p !== "." && p !== "..").join("/"));
    });
    // Check if last segment is an object
    const last = (segments || []).length > 0 && segments[segments.length - 1];
    const query = (last && typeof last === "object") ? "?" + new URLSearchParams(last).toString() : "";
    // Return the joined paths
    return "/" + paths.join("/") + query;
};

// Parse the query string part of the path
const parseQueryString = str => {
    const query = {};
    if (str && typeof str === "string") {
        if (str.charAt(0) === "?") {
            str = str.substr(1);
        }
        str.trim().split("&").filter(s => !!s).forEach(item => {
            const items = item.trim().split("=");
            const key = unescape(items[0]);
            const value = unescape(items[1] || "");
            // Check if value exists
            if (typeof query[key] !== "undefined") {
                query[key] = [query[key], value].flat();
            }
            else {
                query[key] = value;
            }
        });
    }
    return query;
};

// Match function
const match = (current, pattern, exact) => {
    if (!pattern || pattern === "*") {
        return {
            matches: true, 
            params: {}
        };
    }
    // Split the current and the pattern paths by slashes
    const currentItems = splitPath(current);
    const patternItems = splitPath(pattern);
    if (exact === true && (currentItems.length !== patternItems.length)) {
        return {
            matches: false,
        };
    }
    const params = {};
    // Check all path items
    for (let i = 0; i < patternItems.length; i++) {
        if (patternItems[i].charAt(0) === ":") {
            params[patternItems[i].substring(1)] = currentItems[i];
        }
        else if (currentItems[i] !== patternItems[i]) {
            return {
                matches: false,
            };
        }
    }
    // Paths matches
    return {
        matches: true, 
        params: params
    };
};

// Memory routing manager
const MemoryRouting = {
    path: "/",
    eventName: null,
    listener: null,
    getCurrentPath: () => {
        return MemoryRouting.path;
    },
    redirect: newPath => {
        MemoryRouting.path = newPath;
        setTimeout(() => MemoryRouting.listener(), 10);
    },
};

// Hashbang routing class
const HashbangRouting = {
    eventName: "hashchange",
    listener: null,
    getCurrentPath: () => {
        const hash = window.location.hash.substring(1).trim();
        return (hash && hash.charAt(0) === "!") ? hash.substring(1) : "/";
    },
    redirect: newPath => {
        window.location.hash = "#!" + addLeadingSlash(newPath.trim());
    },
};

// Browser history routing manager
const BrowserRouting = {
    eventName: "popstate",
    listener: null,
    getCurrentPath: () => {
        return addLeadingSlash(window.location.pathname + window.location.search + window.location.hash);
    },
    redirect: newPath => {
        window.history.pushState({}, null, addLeadingSlash(newPath));
        setTimeout(() => BrowserRouting.listener(), 10);
    },
};

// Switch component
const Switch = props => {
    return React.createElement(Context.Consumer, {}, value => {
        let matchFound = false;
        let element = null;
        React.Children.forEach(props.children, child => {
            if (matchFound === true || React.isValidElement(child) === false) {
                return;
            }
            // Save this element --> If no route matches, we will render the last child automatically
            element = child;
            if (typeof child.props.path !== "string" || typeof child.props.component === "undefined") {
                return;
            }
            // Check if the current location matches the child path
            const result = match(value.pathname, child.props.path, child.props.exact);
            if (result.matches) {
                const request = {
                    ...value,
                    params: result.params,
                };
                // Check for render function in route component --> generate calling this function
                if (typeof child.props.render === "function") {
                    element = child.props.render(request);
                }
                // Other value --> build from component
                else {
                    element = React.createElement(child.props.component, {
                        ...(child.props.props || {}),
                        request: request,
                        key: (props.reset === true) ? value.pathname : undefined,
                    });
                }
                matchFound = true; // Stop looking for route
            }
        });
        // Return the element 
        return element;
    });
}

Switch.defaultProps = {
    reset: false // Reset route when path changes
};

// Route component
const Route = props => {
    if (!props.component && typeof props.render !== "function") {
        return null; // Nothing to render
    }
    //Render the consumer component
    return React.createElement(Context.Consumer, {}, value => {
        // Check if the path of the route matches the current location
        const result = match(value.pathname, props.path, props.exact);
        if (result.matches === true) {
            const request = {
                ...value,
                params: result.params,
            };
            // Check for render function --> call this function instead
            if (typeof props.render === "function") {
                return props.render(request);
            }
            // Render the component provided in the route props
            return React.createElement(props.component, {
                ...(props.props || {}),
                request: request,
            });
        }
        return null;
    });
}

Route.defaultProps = {
    path: "*", 
    component: null, 
    props: {},
    render: null,
    exact: false
};

// Router component
const Router = props => {
    const [path, setPath] = React.useState(() => {
        routing.current = props.routing || BrowserRouting;
        routing.pathPrefix = props.pathPrefix || "/";
        return routing.current.getCurrentPath(); // Get initial path
    });
    // On mout router component
    React.useEffect(() => {
        routing.current.listener = () => {
            return setPath(routing.current.getCurrentPath());
        };
        if (routing.current.eventName) {
            window.addEventListener(routing.current.eventName, routing.current.listener);
            return () => {
                window.removeEventListener(routing.current.eventName, routing.current.listener);
            };
        }
    }, []);
    // Generate request object and render provider component
    const request = parsePath(path, routing.pathPrefix);
    return React.createElement(Context.Provider, {value: request}, props.children);
};

Router.defaultProps = {
    pathPrefix: "/",
    routing: null
};

// Tiny redirect handler
const redirect = newPath => {
    if (routing.current) {
        return routing.current.redirect(joinPath(routing.pathPrefix, newPath || "/"));
    }
};

const Rouct = {
    Route,
    Router,
    Switch,
    redirect,
    HashbangRouting,
    BrowserRouting,
    MemoryRouting,
};

export default Rouct;
