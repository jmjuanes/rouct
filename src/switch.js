import React from "react";

//Import rouct dependencies
import {Context} from "./context.js";
import match from "./commons/match.js";

//Switch class
export default function Switch (props) {
    return React.createElement(Context.Consumer, {}, function (value) {
        let matchFound = false;
        let element = null;
        //Iterate over all chilren elements
        React.Children.forEach(props.children, function (child) {
            //Check if a match has not been found
            if (matchFound === true || React.isValidElement(child) === false) {
                return;
            }
            //Save this element --> If no route matches, we will render the last child automatically
            element = child;
            //Check for an invalid route component 
            if (typeof child.props.path !== "string" || typeof child.props.component === "undefined") {
                return;
            }
            //Check if the current location matches the child path
            let result = match(value.pathname, child.props.path, child.props.exact);
            if (result.matches === true) {
                //Initialize the request object
                let request = Object.assign({"params": result.params}, value);
                //Clone the new element props 
                let props = Object.assign({"request": request}, child.props.props);
                element = React.createElement(child.props.component, props);
                matchFound = true;
            }
        });
        //Return the element 
        return element;
    });
}

