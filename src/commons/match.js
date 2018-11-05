//Import rouct libs
import * as paths from "../utils/paths.js";

//Match function
export default function match (current, pattern, exact) {
    //Initialize the params object
    let params = {};
    //Check for catch-all path
    if (pattern === "*") {
        return {
            "matches": true, 
            "params": {}
        };
    }
    //Split the current and the pattern paths by slashes
    let currentItems = paths.splitPath(current);
    let patternItems = paths.splitPath(pattern);
    //Check the number of path items
    if (exact === true && (currentItems.length !== patternItems.length)) {
        return {"matches": false};
    }
    //Check all path items
    for (let i = 0; i < patternItems.length; i++) {
        //Check for dynamic parameter
        if (patternItems[i].charAt(0) === ":") {
            let paramKey = patternItems[i].substring(1);
            params[paramKey] = currentItems[i];
        }
        //Check for not equal path segment
        else if (currentItems[i] !== patternItems[i]) {
            return {"matches": false};
        }
    }
    //Paths matches
    return {
        "matches": true, 
        "params": params
    };
}

