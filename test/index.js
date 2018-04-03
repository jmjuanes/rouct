import * as Router from "../index.js";
import React from "react";
import reactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    } 
    render() {
        return React.createElement(
            Router.Switch, 
            {debug: true}, 
            React.createElement(Router.Route, {path: "/", component: Section, props: {section: "Home"}}),
            React.createElement(Router.Route, {path: "/test", component: Section, props: {section: "Test route"}})
        );
    }
}

class Section extends React.Component {
    render() {
        console.log(this.props.request);
        return React.createElement("div", {}, "Section: " + this.props.section);
    }
}

reactDOM.render(React.createElement(App, {}), document.getElementById("app"));

