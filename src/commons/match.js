//Split a path by slashes
let splitPath = function (str) {
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

//Match function
export default function match (current, pattern, exact) {
    //Initialize the params object
    let params = {};
    //Check for catch-all path
    if (pattern === "*") {
        return {matches: true, params: {}};
    }
    //Split the current and the pattern paths by slashes
    let currentItems = splitPath(current);
    let patternItems = splitPath(pattern);
    //Check the number of path items
    if (exact === true && (currentItems.length !== patternItems.length)) {
        return {matches: false};
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
            return {matches: false};
        }
    }
    //Paths matches
    return {matches: true, params: params};
}

