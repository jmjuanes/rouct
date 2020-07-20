import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
//import replace from "@rollup/plugin-replace";

//Generate output files
let generateOutputFiles = function () {
    return ["umd", "umd.min", "esm", "esm.min"].map(function (key) {
        let output = {
            "file": `./dist/rouct.${key}.js`,
            "format": key.replace(".min", ""),
            "globals": {
                "react": "React"
            }
        };
        //Check for umd export --> add name
        if (key.startsWith("umd")) {
            Object.assign(output, {"name": "Rouct"});
        }
        //Check for minimized file
        if (key.endsWith(".min")) {
            Object.assign(output, {"plugins": [terser()]});
        }
        //Return the output file config
        return output;
    });
};


//Export rollup config
export default {
    "input": "./index.js",
    "output": generateOutputFiles(),
    "external": ["react"],
    "plugins": [
        resolve(),
        commonjs()
    ]
};

