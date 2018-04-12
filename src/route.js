import React from "react";

//Route class
export default class Route extends React.Component {
    render() {
        //This component should never be rendered
        console.error("Warning: Route component should be used inside a Switch component");
        return null;
    }
}

//Route default props
Route.defaultProps = {
    path: "*", 
    component: null, 
    props: {},
    exact: false
};

