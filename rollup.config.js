import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import uglify from "rollup-plugin-uglify";

//Initialize the configuration file
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
    config.output.file = "./umd/rouct-min.js";
    config.plugins.push(uglify());
}

export default config;

