//Unescape a character
export default function unescape (str) {
    return window.decodeURIComponent(str.replace(/\+/g, " "));
}

