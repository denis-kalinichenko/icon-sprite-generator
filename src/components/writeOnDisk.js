const fs = require("fs");
const path = require("path");

module.exports = (sprite, output = null) => {
    return new Promise((resolve, reject) => {
        if (!output) {
            resolve(sprite);
            return;
        }

        fs.writeFile(path.resolve(output), sprite, "utf8", error => {
            if (error) {
                reject(error);
                return;
            }

            resolve(sprite);
        });
    });
};