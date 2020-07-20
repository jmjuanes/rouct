import React from "react";
import {Context} from "./context.js";
import {unescape} from "./util/unescape.js";
import {parsePath, parseQueryString, addLeadingSlash} from "./util/paths.js";
import {HashbangRouting} from "./routing/hashbang.js";
import {BrowserRouting} from "./routing/browser.js";
//import {MemoryRouting} from "./routing/memory.js";

//Current routing method
let currentRouting = null; //No routing

//Export Router component 
export class Router extends React.Component {
    constructor(props) {
        super(props);
        //let self = this; //Save instance to this
        this.handlePathChange = this.handlePathChange.bind(this); //Bind path change listener
        //Check for more instances of the router component
        if (currentRouting !== null) {
            throw new Error("Only one instance of a 'Router' component is allowed");
        }
        //Initialize the routing listener
        currentRouting = new props.routing(this.handlePathChange);
        this.state = {
            "path": currentRouting.getCurrentPath()
        };
        //currentRouting = routing; //Save routing
        currentRouting.mount(); //Mount the routing
    }
    //Component did unmount --> remove listeners from routing
    componentDidUnmount() {
        currentRouting.unmount(); //Unmount
        currentRouting = null; //Remove instance
    }
    //Handle path change
    handlePathChange() {
        return this.setState({"path": currentRouting.getCurrentPath()});
    }
    //Render router --> return an instance of the base router
    render() {
        //Get the current path
        let currentPath = (typeof this.state.path === "string") ? addLeadingSlash(this.state.path) : "/";
        //Initialize the request object
        let request = parsePath(currentPath);
        //Add query string values
        request.query = (request.search !== "") ? parseQueryString(request.search) : {};
        //Render the provider
        return React.createElement(Context.Provider, {"value": request}, this.props.children);
    }
}

//Default router props
Router.defaultProps = {
    "routing": null
};

//Export redirect method
export function redirect (newPath) {
    if (currentRouting === null) {
        throw new Error("No router is available"); //No router has been mounted
    }
    //Check for no strong path
    if (typeof newPath !== "string") {
        throw new Error("Expected string path in redirect method");
    }
    //Redirect to this path
    return currentRouting.redirect(newPath);
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
    return redirect(newPath);
}

//Legacy code --> use Router component instead
export function BrowserRouter (props) {
    return React.createElement(Router, {"routing": BrowserRouting}, props.children);
}

//Legacy code --> use redirect instead
export function redirectBrowser (newPath) {
    return redirect(newPath);
}

////Legacy code --> use Router component instead
//export function MemoryRouter (props) {
//    return React.createElement(Router, {"routing": MemoryRouting}, props.children);
//}
//
////Legacy code --> use redirect instead
//export function redirectMemory (newPath) {
//    return redirect(newPath);
//}

