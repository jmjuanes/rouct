import React from "react";
import {Context} from "./context.js";
import unescape from "./commons/unescape.js";

//Parse a query-string
let parseQueryString = function (str) {
    if (typeof str !== 'string'){ return {}; }
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
    return query;
};


//Export Router component 
export default class Router extends React.Component {
    render() {
        //Get the current location
        let currentLocation = (typeof this.props.location === "string") ? this.props.location : "/";
        //Initialize the request object
        let request = {
            "path": currentLocation,
            "pathname": currentLocation,
            "query": {}
        };
        //Check for query string values 
        let queryIndex = request.path.indexOf("?");
        if (queryIndex !== -1) {
            //Parse the query string values
            request.query = parseQueryString(request.path.substring(queryIndex + 1));
            //Update the pathname 
            request.pathname = request.path.slice(0, queryIndex);
        }
        //Render the provider
        return React.createElement(Context.Provider, {value: request}, this.props.children);
    }
}

//Router default props
Router.defaultProps = {
    "location": "/"
};

