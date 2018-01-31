const { path } = require("@uix/icons");

const matchFiles = require("./components/matchFiles");
const processFiles = require("./components/processFiles");
const spriter = require("./components/spriter");
const compileSprite = require("./components/spriterCompiler");

module.exports = function iconSpriteGenerator(input = path) {
    return matchFiles(input)
        .then(processFiles)
        .then(collection => {
            collection.forEach(file => {
                spriter.add(file);
            });
            return spriter;
        })
        .then(compileSprite);
};
