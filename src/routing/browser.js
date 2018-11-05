//Import dependencies
import React from "react";

//Import rouct utils
import Router from "../router.js";
import createHistory from "../utils/history.js";

//Generate our new history manager
let history = createHistory();

//Browser history router component
export class BrowserRouter extends React.Component {
    constructor(props) {
        super(props);
        //Initialize the state with the curren path
        this.state = {
            "path": history.getCurrentPath() 
        };
        //Bind internal methods
        this.handleHistoryChange = this.handleHistoryChange.bind(this);
    }
    //History change listener
    handleHistoryChange(newPath) {
        return this.setState({"path": newPath});
    }
    //Component did mount listener
    componentDidMount() {
        let self = this;
        //Register the history change listener
        history.addChangeListener(self.handleHistoryChange);
    }
    //Component will unmount listener
    componentWillUnmount() {
        let self = this;
        //Remove the history change listener
        history.removeChangeListener(self.handleHistoryChange);
    }
    //Render the router component
    render() {
        return React.createElement(Router, {"path": this.state.path}, this.props.children);
    }
}

//Function to redirect to a given path 
export function redirectBrowser (newPath) {
    return history.push(newPath);
}

