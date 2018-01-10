const globby = require("globby");

module.exports = function matchFiles(patterns) {
    return globby(patterns, {
        expandDirectories: {
            extensions: ["svg"],
        },
    });
};