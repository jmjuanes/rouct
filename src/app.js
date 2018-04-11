import React from "react";

//Router app main component
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let self = this;
        //Add haschange event listener
        window.addEventListener("hashchange", function () {
            //Url changed --> update component
            //console.log("Updated router app");
            return self.forceUpdate();
        }, false);
    }

    render() {
        //Return the children passed to router app without adding new dom nodes
        return React.createElement(React.Fragment, {}, this.props.children);
    }
}

//Router app default props
App.defaultProps = {};

