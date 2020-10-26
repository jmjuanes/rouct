import {addLeadingSlash} from "../util/paths.js";

//Memory routing manager
export class MemoryRouting {
    constructor(listener) {
        this.type = "memory"; //Save routing type
        this.path = "/"; //Initialize path
        this.listener = listener;
    }
    //Get the current path
    getCurrentPath() {
        return this.path;
    }
    //Mount the listener
    mount() {
        return null;//Nothing to do
    }
    //Unmount the listener
    unmount() {
        return null;//Nothing to do
    }
    //Redirect to the provided url
    redirect(newPath) {
        let self = this;
        this.path = addLeadingSlash(newPath); //Save new path
        //Terrible hack to automatically call the listener with the new path
        return setTimeout(function () {
            return self.listener(); //Call the listener manually
        }, 10);
    }
}

