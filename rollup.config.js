import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
//import { terser } from "rollup-plugin-terser";
//import replace from "@rollup/plugin-replace";

//Export rollup config
export default {
    "input": "./index.js",
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
        commonjs()
    ]
};

