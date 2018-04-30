if (process.env.NODE_ENV === "production") {
    module.exports = require("./umd/rouct.min.js");
} else {
    module.exports = require("./umd/rouct.js");
}

