import React from "react";

//Unescape a character
let unescape = function (str) {
    return decodeURIComponent(str.replace(/\+/g, " "));
};

//Parse a path
let parsePath = function (str) {
    let items = str.trim().split("/");
    if (items[0].trim().length === 0) {
        items.shift();
    }
    if (items[items.length - 1].trim().length === 0) {
        items.pop();
    }
    //items.map(function(item){ return item.trim(); });
    return items;
};

//Parse a query-string
let parseQueryString = function (str) {
    if (typeof str !== 'string'){ return {}; }
    //Initialize the output query object
    let query = {};
    str.trim().split("&").forEach(function (item) {
        //Check for empty string
        if (item.trim() === "") {
            return {}; 
        }
        let items = item.trim().split("=");
        let itemKey = unescape(items[0]);
        let itemValue = (typeof items[1] === "string") ? unescape(items[1]) : "";
        //Check if value exists
        if (typeof query[itemKey] !== "undefined") {
            if (Array.isArray(query[itemKey]) === false) {
                query[itemKey] = [ query[itemKey] ];
            }
            query[itemKey].push(itemValue);
        }
        else {
            query[itemKey] = itemValue;
        }
    });
    return query;
};

//Switch class
export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {path: null, pathname: null, query: {}};
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("hashchange", function () {
            return self.refresh();
        }, false);
        //Reload the router
        return this.refresh();
    }

    refresh() {
        let hash = window.decodeURIComponent(window.location.hash.substring(1));
        if (hash.trim() === "") {
            hash = "!/";
        }
        if (hash.charAt(0) !== "!") {
            return;
        }
        let path = hash.substring(1);
        let pathname = path;
        let query = {};
        //Check for query string values 
        let queryIndex = path.indexOf("?");
        if (queryIndex !== -1) {
            //Parse the query string values
            query = parseQueryString(pathname.substring(queryIndex + 1));
            //Update the pathname 
            pathname = pathname.slice(0, queryIndex);
        }
        if (this.props.debug === true) {
            console.debug("New path: " + path);
        }
        return this.setState({path: path, pathname: pathname, query: query});
    }

    render() {
        //Check for no path
        if (this.state.path === null) {
            return React.createElement("div", {});
        }
        let self = this;
        let element = React.createElement("span", {}, "Not found"); //Default output element
        let foundPath = false;
        //Initialize the request object
        let request = {
            path: this.state.path + "",
            pathname: this.state.pathname + "", 
            params: {}, 
            query: Object.assign({}, this.state.query)
        };
        //Split the string path
        let pathItems = parsePath(request.pathname);

        React.Children.forEach(this.props.children, function (child) {
            //Check if path has been found
            if (foundPath === true) return;
            //Reset the params field
            request.params = {};
            //Check for catch-all path
            if (child.props.path === "*") {
                let props = Object.assign({request: request}, child.props.props);
                element = React.createElement(child.props.component, props);
                foundPath = true;
            }
            //let childProps = child.props.props;
            let childItems = parsePath(child.props.path);
            if (childItems.length === pathItems.length) {
                for (let i = 0; i < childItems.length; i++) {
                    if (childItems[i].charAt(0) === ":") {
                        let paramKey = childItems[i].substring(1);
                        //let paramValue = pathItems[i];
                        request.params[paramKey] = pathItems[i];
                    }
                    else if (childItems[i] !== pathItems[i]) {
                        return;
                    }
                }
                let props = Object.assign({request: request}, child.props.props);
                element = React.createElement(child.props.component, props);
                foundPath = true;
            }
        });
        return element;
    }
}

//Switch default props
Switch.defaultProps = {debug: false};
