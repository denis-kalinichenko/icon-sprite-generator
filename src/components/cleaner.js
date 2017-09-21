const cheerio = require('cheerio');

/**
 * Cleans the SVG string from unnecessary tags and attributes.
 *
 * @param {string} svgString - The SVG content string.
 * @return {string} file - The SVG content string after cleaning.
 */
module.exports = function cleaner(svgString) {
    const xml = cheerio.load(svgString, {
        ignoreWhitespace: true,
        xmlMode: true,
    });
    xml("style").remove();
    xml("[style]").removeAttr("style");
    xml("[class]").removeAttr("class");
    xml("[id]").removeAttr("id");
    xml("[fill]").removeAttr("fill");
    return xml.html();
};
