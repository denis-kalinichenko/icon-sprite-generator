const { path } = require("@uix/icons");

const matchFiles = require("./components/matchFiles");
const processFiles = require("./components/processFiles");
const SVGSpriter = require("./components/spriter");
const compileSprite = require("./components/spriterCompiler");
const writeOnDisk = require("./components/writeOnDisk");

module.exports = function iconSpriteGenerator(input = path, output = null) {
    return matchFiles(input)
        .then(processFiles)
        .then(collection => {
            const spriter = SVGSpriter();
            collection.forEach(file => {
                spriter.add(file);
            });
            return spriter;
        })
        .then(compileSprite)
        .then(sprite => writeOnDisk(sprite, output));
};
