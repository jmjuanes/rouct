//Import utils
import * as paths from "./paths.js";

//History wrapper
export default function createHistory () {
    //Current state
    let state = {
        "listeners": []
    };
    //Get the current path
    let getCurrentPath = function () {
        //Build the current path string
        let currentPath = window.location.pathname + window.location.search + window.location.hash;
        //Return the current path with a leading slash
        return paths.addLeadingSlash(currentPath);
    };
    //Trigger change listeners
    let triggerChangeListeners = function (newPath) {
        return state.listeners.forEach(function (listener) {
            return listener(newPath);
        });
    };
    //Push to history
    let pushHistory = function (newPath) {
        newPath = paths.addLeadingSlash(newPath);
        //Add to the window history
        window.history.pushState({}, null, newPath);
        //Trigger all change listeners
        return triggerChangeListeners(newPath);
    };
    //Handle pop state listener
    let handlePopState = function (event) {
        return triggerChangeLiseners(getCurrentPath());
    };
    //Register the popstate listener
    window.addEventLisener("popstate", handlePopState, false);
    //Return managers
    return {
        "getCurrentPath": getCurrentPath,
        "push": pushHistory,
        "addChangeListener": function (listener) {
            //Save change function listener
            state.listeners.push(listener);
        },
        "removeChangeListener": function (listener) {
            //Find and remove this listener
            state.listeners = state.listeners.filter(function (savedListener) {
                return savedListener !== listener;
            });
        },
        "goBack": function () {
            return window.history.go(-1);
        },
        "goForward": function () {
            return window.history.go(+1);
        },
        "go": function (count) {
            return window.history.go(count);
        },
        "destroy": function () {
            //Remove the pop state event listener
            window.removeEventListener("popstate", handlePopState);
        }
    };
};

