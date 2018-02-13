const fs = require("fs");
const path = require("path");

module.exports = (sprite, output = null) => {
    if (!output) {
        return Promise.resolve(sprite);
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(output), sprite, "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(sprite);
        });
    });
};
