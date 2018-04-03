//Redirect to a given path
export default function redirect(path) {
    window.location.hash = "#!" + path;
}

