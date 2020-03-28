import {addLeadingSlash} from "./paths.js";

//Get the current path with a leading slash
let getCurrentPath = function () {
    return addLeadingSlash(window.location.pathname + window.location.search + window.location.hash);
};

//History wrapper
export function createHistory () {
    let listener = null; //Initialize listener
    //Trigger change listeners
    let triggerChangeListener = function (newPath) {
        if (state.listener !== null) {
            return listener(newPath);
        }
    };
    //Handle pop state listener
    let handlePopState = function (event) {
        return triggerChangeListener(getCurrentPath());
    };
    //Return managers
    return {
        //Register the popstate listener
        "mount": function () {
            return window.addEventListener("popstate", handlePopState, false);
        },
        //Remove the popstate listener
        "unmount": function () {
            return window.removeEventListener("popstate", handlePopState, false);
        },
        "getCurrentPath": getCurrentPath,
        "push": function (newPath) {
            newPath = paths.addLeadingSlash(newPath); //Add leading slash to the path
            window.history.pushState({}, null, newPath); //Add to the history
            return triggerChangeListener(newPath);
        },
        //Add path change listener
        "addChangeListener": function (newListener) {
            listener = newListener;
        },
        //Remove path change listener
        "removeChangeListener": function () {
            listener = null;
        }
    };
}

