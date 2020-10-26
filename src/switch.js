import React from "react";
import {getContextConsumer} from "./context.js";
import {match} from "./util/match.js";

//Switch class
export function Switch (props) {
    return React.createElement(getContextConsumer(props.context), {}, function (value) {
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
                let request = Object.assign({}, value, {
                    "params": result.params
                });
                //Check for render function in route component --> generate calling this function
                if (typeof child.props.render === "function") {
                    element = child.props.render(request); //Build calling the render
                }
                //Other value --> build from component
                else {
                    element = React.createElement(child.props.component, Object.assign({}, child.props.props, {
                        "request": request,
                        "key": (props.reset === true) ? value.pathname : undefined
                    }));
                }
                matchFound = true; //Stop looking for route
            }
        });
        //Return the element 
        return element;
    });
}

Switch.defaultProps = {
    "context": "default",
    "reset": false //Reset route when path changes
};

