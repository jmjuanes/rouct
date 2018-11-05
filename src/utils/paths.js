//Add a leading slash to a path string
export function addLeadingSlash (pathString) {
    return (pathString.charAt(0) === "/") ? pathString : "/" + pathString;
}
//Parse a string path
export function parsePath (pathString) {
    let parsedPath = (typeof pathString === "string") ? addLeadingSlash(pathString) : "/";
    let pathname = parsedPath;
    let search = "";
    let hash = "";
    //Check the hash index
    let hashIndex = pathname.indexOf("#");
    if (hashIndex !== -1) {
        hash = pathname.substr(hashIndex);
        pathname = pathname.substr(0, hashIndex);
    }
    //Check the search index
    let searchIndex = pathname.indexOf("?");
    if (searchIndex !== -1) {
        search = pathname.substr(searchIndex);
        pathname = pathname.substr(0, searchIndex);
    }
    //Return the parsed path
    return {
        "path": parsedPath,
        "pathname": pathname,
        "search": (search === "?") ? "" : search,
        "hash": (hash === "#") ? "" : hash
    };
}

//Build a path
export function buildPath (pathname, search, hash) {
    let buildPath = (typeof pathname === "string") ? pathname : "/";
    //Check the search value
    if (typeof search === "string" && search !== "?") {
        buildPath = buildPath + (search.charAt(0) === "?") ? search : "?" + search;
    }
    //Check the hash value
    if (typeof hash === "string" && hash !== "#") {
        buildPath = buildPath + (hash.charAt(0) === "#") ? hash : "#" + hash;
    }
    //Return the build path
    return buildPath;
}

//Split a path by slashes
export function splitPath (pathString) {
    let items = pathString.trim().split("/");
    //Check for empty first item
    if (items[0].trim().length === 0) {
        items.shift();
    }
    //Check for empty last item
    if (items[items.length - 1].trim().length === 0) {
        items.pop();
    }
    //items.map(function(item){ return item.trim(); });
    return items;
};

