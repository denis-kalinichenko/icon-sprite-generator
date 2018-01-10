const { path } = require("@uix/icons");

const matchFiles = require("./components/matchFiles");

module.exports = function iconSpriteGenerator(input = path) {
    return new Promise((resolve, reject) => {
        matchFiles(input).then(result => resolve(result), error => reject(error));
    });
};
