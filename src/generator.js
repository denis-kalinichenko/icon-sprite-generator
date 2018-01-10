const { path } = require("@uix/icons");

const matchFiles = require("./components/matchFiles");

module.exports = function iconSpriteGenerator(input = path, targetPath = null) {
    return new Promise((resolve, reject) => {
        matchFiles(input).then(result => resolve(result), error => reject(error));
    });
};
