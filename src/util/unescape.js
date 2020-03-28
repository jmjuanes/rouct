//Unescape a character
export function unescape (str) {
    return window.decodeURIComponent(str.replace(/\+/g, " "));
}

