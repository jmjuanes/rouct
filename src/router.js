import React from "react";

//Import rouct libs
import {Context} from "./context.js";
import unescape from "./utils/unescape.js";
import * as paths from "./utils/paths.js";

//Parse a query-string
let parseQueryString = function (str) {
    if (typeof str !== 'string') {
        return {}; 
    }
    //Initialize the output query object
    let query = {};
    str.trim().split("&").forEach(function (item) {
        //Check for empty string
        if (item.trim() === "") {
            return; 
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
    //Return parsed query object
    return query;
};

//Export Router component 
export default class Router extends React.Component {
    render() {
        //Get the current path
        let currentPath = (typeof this.props.path === "string") ? paths.addLeadingSlash(this.props.path) : "/";
        //Initialize the request object
        let request = paths.parsePath(currentPath);
        //Add query string values
        request.query = (request.search !== "") ? parseQueryString(request.search) : {};
        //Render the provider
        return React.createElement(Context.Provider, {"value": request}, this.props.children);
    }
}

//Router default props
Router.defaultProps = {
    "path": "/"
};

