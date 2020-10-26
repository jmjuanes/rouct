import React from "react";
import {createContext, getContextProvider, getContext, removeContext} from "./context.js";
import {unescape} from "./util/unescape.js";
import {parsePath, parseQueryString, addLeadingSlash} from "./util/paths.js";
import {HashbangRouting} from "./routing/hashbang.js";
import {BrowserRouting} from "./routing/browser.js";
import {MemoryRouting} from "./routing/memory.js";

//Export Router component 
export class Router extends React.Component {
    constructor(props) {
        super(props);
        //let self = this; //Save instance to this
        this.handlePathChange = this.handlePathChange.bind(this); //Bind path change listener
        //Check for more instances of the router component
        //TODO: check for only one default context
        //if (currentRouting !== null) {
        //    throw new Error("Only one instance of a 'Router' component is allowed");
        //}
        //Initialize the routing listener
        //currentRouting = new props.routing(this.handlePathChange);
        createContext(this.props.context, new props.routing(this.handlePathChange));
        this.state = {
            "path": getContext(this.props.context).routing.getCurrentPath()
        };
        //currentRouting = routing; //Save routing
        //currentRouting.mount(); //Mount the routing
        getContext(this.props.context).routing.mount(); //Mount the routing
    }
    //Component did unmount --> remove listeners from routing
    componentDidUnmount() {
        //currentRouting.unmount(); //Unmount
        getContext(this.props.context).routing.unmount();
        removeContext(this.props.context); //Remove context
    }
    //Handle path change
    handlePathChange() {
        return this.setState({
            "path": getContext(this.props.context).routing.getCurrentPath()
        });
    }
    //Render router --> return an instance of the base router
    render() {
        let Provider = getContextProvider(this.props.context); //Get provider
        let currentPath = (typeof this.state.path === "string") ? addLeadingSlash(this.state.path) : "/";
        //Initialize the request object
        let request = parsePath(currentPath);
        //Add query string values
        request.query = (request.search !== "") ? parseQueryString(request.search) : {};
        //Render the provider
        return React.createElement(Provider, {"value": request}, this.props.children);
    }
}

//Default router props
Router.defaultProps = {
    "context": "default",
    "routing": null
};

//Export redirect method
export function redirect (context, newPath) {
    //Check for no path and context provided
    if (typeof newPath !== "string" && typeof context !== "string") {
        throw new Error("Expected string path in redirect method");
    }
    //Check for no new path to redirect --> use default context
    if (typeof newPath !== "string") {
        return redirect("default", context);
    }
    //if (currentRouting === null) {
    //    throw new Error("No router is available"); //No router has been mounted
    //}
    //Redirect to this path
    return getContext(context).routing.redirect(newPath);
}

//
// Alias and legacy code
//

//Legacy code --> use Router component instead
export function HashbangRouter (props) {
    return React.createElement(Router, {"routing": HashbangRouting}, props.children);
}

//Legacy code --> use redirect instead
export function redirectHashbang (newPath) {
    return redirect("default", newPath);
}

//Legacy code --> use Router component instead
export function BrowserRouter (props) {
    return React.createElement(Router, {"routing": BrowserRouting}, props.children);
}

//Legacy code --> use redirect instead
export function redirectBrowser (newPath) {
    return redirect("default", newPath);
}

//Legacy code --> use Router component instead
export function MemoryRouter (props) {
    return React.createElement(Router, {"routing": MemoryRouting, "context": props.context}, props.children);
}

//Legacy code --> use redirect instead
export function redirectMemory (context, newPath) {
    return redirect(context, newPath);
}

