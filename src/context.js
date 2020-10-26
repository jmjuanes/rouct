import React from "react";

//List of available contexts
let contexts = {};

//Create a new context
export function createContext (name, routing) {
    contexts[name] = {
        "context": React.createContext("/"),
        "routing": routing
    };
}

//Get context by name
export function getContext (name) {
    //return typeof contexts[name] !== "undefined" ? contexts[name] : contexts["default"];
    return contexts[name];
}

//Get context consumer
export function getContextConsumer (name) {
    return getContext(name).context.Consumer;
}

//Get context provider
export function getContextProvider (name) {
    return getContext(name).context.Provider;
}

//Delete context
export function removeContext (name) {
    delete contexts[name];
}

