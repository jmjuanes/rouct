import {Route} from "./src/route.js";
import {Router} from "./src/router.js";
import {Switch} from "./src/switch.js";
import {HashbangRouting} from "./src/routing/hashbang.js";
import {BrowserRouting} from "./src/routing/browser.js";
import {MemoryRouting} from "./src/routing/memory.js";
import {redirect, redirectHashbang, redirectBrowser, redirectMemory} from "./src/router.js";
import {HashbangRouter, BrowserRouter, MemoryRouter} from "./src/router.js";

//Initialize rouct component
let Rouct = {
    Route,
    Router,
    Switch,
    redirect,
    //Routing methods
    HashbangRouting,
    BrowserRouting,
    MemoryRouting,
    //Legacy methods
    HashbangRouter,
    BrowserRouter,
    MemoryRouter,
    redirectHashbang,
    redirectBrowser,
    redirectMemory
};

//Export rouct
export default Rouct;


