import React from "react";

//Import rouct libs
import {Context} from "./context.js";
import match from "./commons/match.js";

//Export route component
export default function Route (props) {
    if (props.component === null) {
        return null;
    }
    //Render the consumer component
    return React.createElement(Context.Consumer, {}, function (value) {
        //Check if the path of the route matches the current location
        let result = match(value.pathname, props.path, props.exact);
        if (result.matches === true) {
            //Generate the request object
            let request = Object.assign({"params": result.params}, value);
            //Generate the new component props 
            let props = Object.assign({"request": request}, props.props);
            //Return the component
            return React.createElement(props.component, props);
        }
        //If does not match, return null
        return null;
    });
}

//Route default props
Route.defaultProps = {
    "path": "*", 
    "component": null, 
    "props": {},
    "exact": false
};

