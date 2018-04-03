import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";

export default {
    "input": "./test/index.js",
    "output": {
        "file": "./test/bundle.js",
        "format": "iife"
    },
    "plugins": [
        resolve(),
        commonjs(),
        replace({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ]
};

