import React from "react";
import {Context} from "./context.js";
import {unescape} from "./util/unescape.js";
import {parsePath, parseQueryString, addLeadingSlash} from "./util/paths.js";

//Export Router component 
export function Router (props) {
    //Get the current path
    let currentPath = (typeof props.path === "string") ? addLeadingSlash(props.path) : "/";
    //Initialize the request object
    let request = parsePath(currentPath);
    //Add query string values
    request.query = (request.search !== "") ? parseQueryString(request.search) : {};
    //Render the provider
    return React.createElement(Context.Provider, {"value": request}, props.children);
}

//Router default props
Router.defaultProps = {
    "path": "/"
};

