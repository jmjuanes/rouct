import React from "react";
import {Context} from "./context.js";
import match from "./commons/match.js";

//Route class
export default class Route extends React.Component {
    render() {
        let self = this;
        //Check for invalid component 
        if (this.props.component === null) {
            return null;
        }
        //Render the consumer component
        return React.createElement(Conext.Consumer, {}, function (value) {
            //Check if the path of the route matches the current location
            let result = match(value.pathname, self.props.path, self.props.exact);
            if (result.matches === true) {
                //Generate the request object
                let request = Object.assign({params: result.params}, value);
                //Generate the new component props 
                let props = Object.assign({request: request}, self.props.props);
                //Return the component
                return React.createElement(self.props.component, props);
            }
            //If not matches, return null
            return null;
        });
    }
}

//Route default props
Route.defaultProps = {
    "path": "*", 
    "component": null, 
    "props": {},
    "exact": false
};

