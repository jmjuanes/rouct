import {Route} from "./src/route.js";
import {Router} from "./src/router.js";
import {Switch} from "./src/switch.js";
import {HashbangRouter, redirectHashbang} from "./src/routing/hashbang.js";
import {BrowserRouter, redirectBrowser} from "./src/routing/browser.js";

//Initialize rouct component
let Rouct = {
    Route,
    Router,
    Switch,
    //Hashbang routing
    HashbangRouter,
    redirectHashbang,
    //Browser routing
    BrowserRouter,
    redirectBrowser
};

//Export rouct
export default Rouct;


