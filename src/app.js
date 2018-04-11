import React from "react";

//Router app main component
export default class App extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        //Add haschange event listener
        window.addEventListener("hashchange", function () {
            //Url changed --> update component
            return self.forceUpdate();
        }, false);
    }
}

//Router app default props
App.defaultProps = {};

