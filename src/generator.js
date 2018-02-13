const { path: DEFAULT_ICONS } = require("@uix/icons");

const matchFiles = require("./components/matchFiles");
const processFiles = require("./components/processFiles");
const svgSpriter = require("./components/spriter");
const compileSprite = require("./components/spriterCompiler");
const transform = require("./components/transform");
const writeOnDisk = require("./components/writeOnDisk");

module.exports = function iconSpriteGenerator(options = {}) {
    const {
        input = DEFAULT_ICONS,
        output = null,
        mode = "auto",
    } = options;

    return matchFiles(input)
        .then(processFiles)
        .then((collection) => {
            const spriter = svgSpriter();
            collection.forEach((file) => {
                spriter.add(file);
            });
            return spriter;
        })
        .then(compileSprite)
        .then(sprite => transform(sprite, mode, output))
        .then(sprite => writeOnDisk(sprite, output));
};
