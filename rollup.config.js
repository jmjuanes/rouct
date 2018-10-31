import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

//Initialize the configuration object
let config = {
    "input": "./src/index.js",
    "output": {
        "file": "./umd/rouct.js",
        "format": "umd",
        "name": "Rouct",
        "globals": {
            "react": "React"
        }
    },
    "external": ["react"],
    "plugins": [
        resolve(),
        commonjs(),
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

//Check the node environment
if (process.env.NODE_ENV === "production") {
    config.output.file = "./umd/rouct.min.js";
    config.plugins.push(terser());
}

//Export rollup configuration 
export default config;

