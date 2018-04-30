import React from "react";

//Hashbang router component
export default class HashbangRouter extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        //Add haschange event listener
        window.addEventListener("hashchange", function () {
            //Url changed --> update component
            return self.forceUpdate();
        }, false);
    }
    
    shouldComponentUpdate() {
        return true;
    }

    render() {
        //Render the children without adding extra nodes to the DOM
        return React.createElement(React.Fragment, {}, this.props.children);
    }
}

