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
    render() {
        let self = this;
        let element = React.createElement("span", {}, "Not found");
        let foundPath = false;
        //Get the hash
        let hash = window.decodeURIComponent(window.location.hash.substring(1));
        if (hash.trim() === "") {
            hash = "!/";
        }
        if (hash.charAt(0) !== "!") {
            //No valid hashbang url
            return element;
        }
        //Initialize the request object
        let request = {
            path: hash.substring(1),
            pathname: hash.substring(1), 
            params: {}, 
            query: {}
        };
        //Check for query string values 
        let queryIndex = request.path.indexOf("?");
        if (queryIndex !== -1) {
            //Parse the query string values
            request.query = parseQueryString(request.path.substring(queryIndex + 1));
            //Update the pathname 
            request.pathname = request.path.slice(0, queryIndex);
        }
        if (this.props.debug === true) {
            console.debug("New path: " + request.path);
        }
        //Split the string path
        let pathItems = parsePath(request.pathname);
        //Iterate over all routes
        React.Children.forEach(this.props.children, function (child) {
            //Check if path has been found
            if (foundPath === true) {
                return;
            }
            //Reset the params field
            request.params = {};
            //Check for catch-all path
            if (child.props.path === "*") {
                let props = Object.assign({request: request}, child.props.props);
                element = React.createElement(child.props.component, props);
                foundPath = true;
            }
            //Check if we want an exact path
            let exactPath = (typeof child.props.exact === "boolean") ? child.props.exact : false;
            let childItems = parsePath(child.props.path);
            //Check the number of path items
            if (exactPath === true && (childItems.length !== pathItems.length)) {
                //Path not valid
                return;
            }
            //Check all path items
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
            //Clone the new element props
            let props = Object.assign({request: request}, child.props.props);
            element = React.createElement(child.props.component, props);
            foundPath = true;
        });
        return element;
    }
}

//Switch default props
Switch.defaultProps = {
    debug: false
};

