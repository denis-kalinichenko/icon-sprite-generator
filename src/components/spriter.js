const SVGSpriter = require("svg-sprite");
const path = require("path");

module.exports = () => {
    return new SVGSpriter({
        dest: "",
        shape: {
            id: {
                generator: name => "icon-" + path.basename(name, ".svg"),
            },
            dimension: {
                attributes: false,
            },
        },
        mode: {
            symbol: {
                dest: "",
                sprite: path.join(__dirname, "sprite"),
                render: {
                    html: {
                        template: path.join(__dirname, "..", "template.html"),
                        dest: path.join(__dirname, "sprite"),
                    },
                },
            },
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
            dimensionAttributes: false,
        },
    });
};
