const SVGSpriter = require("svg-sprite");
const path = require("path");

module.exports = new SVGSpriter({
    dest: "",
    shape: {
        id: {
            generator: name => "icon-" + path.basename(name, '.svg'),
        },
        dimension: {
            attributes: false,
        },
    },
    mode: {
        symbol: {
            dest: '',
            sprite: __dirname + "/sprite",
            render: {
                html: {
                    template: __dirname + "/../template.html",
                    dest: __dirname + "/sprite",
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
