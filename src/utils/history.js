//Import utils
import * as paths from "./paths.js";

//History wrapper
export default function createHistory () {
    //History state
    let state = {
        "changeListener": null
    };
    //Get the current path
    let getCurrentPath = function () {
        //Build the current path string
        let currentPath = window.location.pathname + window.location.search + window.location.hash;
        //Return the current path with a leading slash
        return paths.addLeadingSlash(currentPath);
    };
    //Trigger change listeners
    let triggerChangeListener = function (newPath) {
        if (state.changeListener !== null) {
            return state.changeListener(newPath);
        }
    };
    //Handle pop state listener
    let handlePopState = function (event) {
        return triggerChangeListener(getCurrentPath());
    };
    //Register the popstate listener
    window.addEventListener("popstate", handlePopState, false);
    //Return managers
    return {
        "getCurrentPath": getCurrentPath,
        "push": function (newPath) {
            newPath = paths.addLeadingSlash(newPath);
            //Add to the window history
            window.history.pushState({}, null, newPath);
            //Trigger all change listeners
            return triggerChangeListener(newPath);
        },
        "addChangeListener": function (listener) {
            //Save change function listener
            state.changeListener = listener;
        },
        "removeChangeListener": function () {
            //Remove the change listener
            state.changeListener = null;
        }
    };
};

