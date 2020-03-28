import React from "react";
import {Router} from "../router.js";
import {createHistory} from "../util/history.js";

//Generate our new history manager
let history = createHistory();

//Browser history router component
export class BrowserRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "path": history.getCurrentPath()  //Initialize with the current path
        };
        //Bind internal methods
        this.handleHistoryChange = this.handleHistoryChange.bind(this);
    }
    //History change listener
    handleHistoryChange(newPath) {
        return this.setState({
            "path": newPath
        });
    }
    //Component did mount listener
    componentDidMount() {
        let self = this;
        //Register the history change listener
        history.addChangeListener(function (newPath) {
            return self.handleHistoryChange(newPath); 
        });
        history.mount(); //Start listening for changes
    }
    //Component will unmount listener
    componentWillUnmount() {
        history.removeChangeListener();
        history.unmount(); //Stop listening for changes
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

