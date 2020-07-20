import {addLeadingSlash} from "../util/paths.js";
import {unescape} from "../util/unescape.js";

//Get the current hash
let getCurrentHashbangPath = function () {
    //Get the current hash value
    //let hash = unescape(window.location.hash.substring(1));
    let hash = window.location.hash.substring(1);
    //Check for empty hash --> home route
    if (hash.trim() === "") {
        return "/";
    }
    //Check if is a vaid hashbang url
    return (hash.charAt(0) === "!") ? hash.substring(1) : "/";
};

//Export hashbang routing class
export class HashbangRouting {
    constructor(listener) {
        this.type = "hashband"; //Save hashbang routing
        this.listener = listener; //Save listener
    }
    //Get current
    getCurrentPath() {
        return getCurrentHashbangPath();
    }
    //Mount the routing listener
    mount() {
        let self = this;
        window.addEventListener("hashchange", self.listener, false);
    }
    //Unmount the routing listener
    unmount() {
        let self = this;
        window.removeEventListener("hashchange", self.listener); 
    }
    //Redirect to the provided url
    redirect(newPath) {
        //while (parsedPath.charAt(0) === "#" || parsedPath.charAt(0) === "!") {
        //    parsedPath = parsedPath.substring(1);
        //}
        //Update the hash section of the url
        window.location.hash = "#!" + addLeadingSlash(newPath.trim());
    }
}

