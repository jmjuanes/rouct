import React from "react";
import {Consumer} from "./context.js";
import match from "./commons/match.js";

//Switch class
export default class Switch extends React.Component {
    render() {
        let self = this;
        return React.createElement(Consumer, {}, function (value) {
            let matchFound = false;
            let element = null;
            //Iterate over all routes
            React.Children.forEach(this.props.children, function (child) {
                //Check if a match has not been found
                if (foundMatch === true || React.isValidElement(child) === false) {
                    return;
                }
                //Check if the current location matches the child path
                let result = match(value.pathname, child.props.path, child.props.exact);
                if (result.matches === true) {
                    //Initialize the request object
                    let request = Object.assign({params: result.params}, value);
                    //Clone the new element props 
                    let props = Object.assign({request: request}, child.props.props);
                    element = React.createElement(child.props.component, props);
                    mathFound = true;
                }
            });
            //Return the element 
            return element;
        });
    }
}

