import React from "react";
import {Context} from "./context.js";
import {match} from "./util/match.js";

//Export route component
export function Route (props) {
    if (props.component === null) {
        return null; //No component to render
    }
    //Render the consumer component
    return React.createElement(Context.Consumer, {}, function (value) {
        //Check if the path of the route matches the current location
        let result = match(value.pathname, props.path, props.exact);
        if (result.matches === true) {
            //Render the component provided in the route props
            return React.createElement(props.component, Object.assign({}, props.props, {
                "request": Object.assign({}, value, {
                    "params": result.params
                })
            }));
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

