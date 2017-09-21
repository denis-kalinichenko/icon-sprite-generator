const expect = require("chai").expect;

const cleaner = require("./../src/components/cleaner");

describe('Icon Sprite Generator', function() {
    describe("Cleaner", function () {
        it("returns a string", function () {
            expect(cleaner("<svg></svg>")).to.be.a("string");
        });

        it("removes any 'style', 'class', 'id' and 'fill' attributes", function () {
            var svg = '<svg><g style="fill: red;"></g></svg>';
            var expectedSVG = "<svg><g/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);

            svg = '<svg><path fill="red"></path></svg>';
            expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);

            svg = '<svg><circle class="cl0s"></circle></svg>';
            expectedSVG = "<svg><circle/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);

            svg = '<svg><path id="Warswa_1"></path></svg>';
            expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);

            svg = '<svg><path style="fill: red;" fill="red" id="Warswa_1" class="cl0s"></path></svg>';
            expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);
        });

        it("removes any <style/> tags", function () {
            var svg = '<svg><style>.cl03 { fill: red; }</style><path></path></svg>';
            var expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);

            svg = '<svg><style>.cl03 { fill: red; }</style><path><style>.cl03 { fill: red; }</style></path></svg>';
            expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);
        });
    });
});