import React from "react";

//Route class
export default class Route extends React.Component {
    render() {
        return React.createElement("div", {}, null);
    }
}

//Route default props
Route.defaultProps = {
    path: "*", 
    component: null, 
    props: {},
    exact: false
};

