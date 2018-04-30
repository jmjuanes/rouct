import React from "react";
import Router from "./router.js";
import unescape from "./commons/unescape.js";

//Get the current hash
let currentHash = function () {
    //Get the current hash value
    let hash = unescape(window.location.hash.substring(1));
    //Check for empty hash --> home route
    if (hash.trim() === "") {
        return "/";
    }
    //Check if is a vaid hashbang url
    return (hash.charAt(0) === "!") ? hash.substring(1) : "/";
};

//Hashbang router component
export default class HashbangRouter extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        //Initialize the state with the current hashbang location
        this.state = {
            "location": currentHash()
        };
        //Bind hash change method
        this.handleHashChange = this.handleHashChange.bind(this);
    }

    handleHashChange() {
        //Update the state with the new location
        return this.setState({
            "location": currentHash();
        });
    }

    componentDidMount () {
        let self = this;
        //Start listening hash change events
        window.addEventListener("hashchange", self.handleHashChange, false);
    }

    componentWillUnmount() {
        let self = this;
        //Remove the hashchange event listener
        window.removeEventListener("hashchange", self.handleHashChange); 
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        //Render the router component
        return React.createElement(Router, {location: this.state.location}, this.props.children);
    }
}

