import * as Router from "../index.js";
import React from "react";
import reactDOM from "react-dom";

let h = React.createElement;

class App extends Router.App {
    constructor(props) {
        super(props);
    } 
    render() {
        let link1 = createLink("Home", "/", 1);
        let link2 = createLink("Link 1", "/section1/sub1", 2);
        let link3 = createLink("Link 2", "/section1/sub2?key1=value1", 3);
        let links = h("div", {}, link1, link2, link3);

        let route1 = h(Router.Route, {exact: true, path: "/", component: Home, props: {}});
        let route2 = h(Router.Route, {exact: false, path: "/section1", component: Section, props: {section: "Section 1"}});
        let route3 = h(Router.Route, {exact: false, path: "/section1", component: Section, props: {section: "Section 1"}});
        let dispatcher = h(Router.Switch, {debug: true}, route1, route2, route3);

        return h("div", {}, links, dispatcher);
    }
}

class Home extends React.Component {
    render() {
        console.log("Home route");
        return h("div", {}, "Home route");
    }
}

let createLink = function (name, to, index) {
    let clickListener = function () {
        return Router.redirect(to);
    };
    return h("div", {key: index, onClick: clickListener}, name);
};

class Section extends React.Component {
    render() {
        console.log(this.props.request);
        let section = h("div", {}, "Section: " + this.props.section);
        let route1 = h(Router.Route, {exact: true, path: "/section1/sub1", component: SubSection, props: {subSection: "SubSection 1"}});
        let route2 = h(Router.Route, {exact: true, path: "/section1/sub2", component: SubSection, props: {subSection: "SubSection 2"}});
        let dispatcher = h(Router.Switch, {debug: true}, route1, route2);
        return h("div", {}, section, dispatcher);
    }
}

class SubSection extends React.Component {
    render() {
        return h("div", {}, "Current subSection: " + this.props.subSection);
    }
}

reactDOM.render(h(App, {}), document.getElementById("app"));

