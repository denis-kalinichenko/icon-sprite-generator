/**
 * Cleans the SVG string from unnecessary tags and attributes.
 *
 * @param {string} svgString - The SVG content string.
 * @return {string} file - The SVG content string after cleaning.
 */
module.exports = function cleaner(svgString) {
    var file = svgString;
    file = file.replace("&gt;", ">");
    file = file.replace(/ (style|class|id|fill)="[^"]*"/g, "");
    file = file.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
    return file;
};
