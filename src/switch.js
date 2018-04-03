import React from "react";

//Parse a path
let parsePath = function (str) {
    let items = str.trim().split("/");
    if (items[0].trim().length === 0) {
        items.shift();
    }
    if (items[items.length - 1].trim().length === 0) {
        items.pop();
    }
    //items.map(function(item){ return item.trim(); });
    return items;
};

//Parse a query-string
let parseQueryString = function (str) {
    return {};
};


//Switch class
export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {path: null};
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("hashchange", function () {
            return self.refresh();
        }, false);
        //Reload the router
        return this.refresh();
    }

    refresh() {
        let hash = window.decodeURIComponent(window.location.hash.substring(1));
        if (hash.trim() === '') {
            hash = '!/';
        }
        if (hash.charAt(0) !== '!') {
            return;
        }

        let path = hash.substring(1);
        if (this.props.debug === true) {
            console.debug("New path: " + path);
        }

        return this.setState({path: path});
    }

    render() {
        //Check for no path
        if (this.state.path === null) {
            return React.createElement("div", {});
        }

        let self = this;
        let element = React.createElement("span", {}, "Not found"); //Default output element
        let foundPath = false;
        let request = {path: this.state.path, params: {}, query: {}};
        let pathItems = parsePath(this.state.path);

        React.Children.forEach(this.props.children, function (child) {
            //Check if path has been found
            if (foundPath === true) return;
            //Reset the params field
            request.params = {};
            //Check for catch-all path
            if (child.props.path === "*") {
                let props = Object.assign({request: request}, child.props.props);
                element = React.createElement(child.props.component, props);
                foundPath = true;
            }
            //let childProps = child.props.props;
            let childItems = parsePath(child.props.path);
            if (childItems.length === pathItems.length) {
                for (let i = 0; i < childItems.length; i++) {
                    if (childItems[i].charAt(0) === ":") {
                        let paramKey = childItems[i].substring(1);
                        //let paramValue = pathItems[i];
                        request.params[paramKey] = pathItems[i];
                    }
                    else if (childItems[i] !== pathItems[i]) {
                        return;
                    }
                }
                let props = Object.assign({request: request}, child.props.props);
                element = React.createElement(child.props.component, props);
                foundPath = true;
            }
        });
        return element;
    }
}

//Switch default props
Switch.defaultProps = {debug: false};
