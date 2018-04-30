//Redirect to a given path
export function redirectHashbang(path) {
    if (typeof path !== "string") {
        //Invalid path
        throw new Error("Expected string path in redirect method");
    }
    //Parse the path string --> trim the path 
    let parsedPath = path.trim();
    //while (parsedPath.charAt(0) === "#" || parsedPath.charAt(0) === "!") {
    //    parsedPath = parsedPath.substring(1);
    //}
    //Check if the first character is not a slash mark
    if (parsedPath.charAt(0) !== "/") {
        parsedPath = "/" + parsedPath;
    }
    window.location.hash = "#!" + parsedPath;
}

