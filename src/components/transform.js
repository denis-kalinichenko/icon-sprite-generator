const path = require("path");

module.exports = function (content, mode = "auto", output = null) {
    let sprite = content;

    if (mode === "jsLoader" || mode === "auto" && output && path.extname(output) === ".js") {
        const template =
            "(function() {\n" +
            "var ready = false;\n" +
            "var inject = function() {\n" +
            "if (ready) { return; }\n" +
            "ready = true;\n" +
            "var svgHolder = document.createElement(\"div\");\n" +
            "svgHolder.className += \"svg-sprites-holder\";\n" +
            "svgHolder.innerHTML = \"%svg-content%\";\n" +
            "document.body.appendChild(svgHolder);\n" +
            "};\n" +
            "if (document.readyState === \"complete\") { inject(); }\n" +
            "else { document.addEventListener(\"DOMContentLoaded\", inject); }\n" +
            "})();";
        sprite = template.replace("%svg-content%", sprite.replace(/"/g, "\\\""));
    }

    return sprite;
};