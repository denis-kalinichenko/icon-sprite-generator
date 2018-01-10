const {expect} = require("chai");
const rewire = require("rewire");

const generator = rewire("./../src/generator");
const matchFiles = rewire("./../src/components/matchFiles");
const cleaner = require("./../src/components/cleaner");

const globMock = require("./mock/globMock");

describe('Icon Sprite Generator', function () {
    it("returns a promise", () => {
        expect(generator()).to.be.a("promise");
    });

    it("returns an array of icons paths", () => {
        return generator(__dirname + "/icons").then(data => {
            expect(data).to.deep.equal([
                __dirname + '/icons/action_bin.svg',
                __dirname + '/icons/action_cart.svg',
                __dirname + '/icons/action_login.svg',
            ]);
        });
    });

    describe("matchFiles", () => {
        it("returns a promise", () => {
            const revert = matchFiles.__set__("globby", globMock);
            expect(matchFiles()).to.be.a("promise");
            revert();
        });

        it("returns array of matched .svg files", () => {
            const revert = matchFiles.__set__("globby", globMock);
            matchFiles().then(data => {
                expect(data).to.deep.equal([
                    "path/to/api.svg",
                    "path/to/arrow_box.svg",
                    "path/to/bin.svg",
                    "path/to/calendar.svg",
                    "path/to/cart_check.svg",
                ]);
            });
            revert();
        });
    });

    describe("Cleaner", () => {
        it("returns a string", () => {
            expect(cleaner("<svg></svg>")).to.be.a("string");
        });

        it("removes any 'style', 'class', 'id' and 'fill' attributes", () => {
            let svg = '<svg><g style="fill: red;"></g></svg>';
            let expectedSVG = "<svg><g/></svg>";
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

        it("removes any <style/> tags", () => {
            let svg = '<svg><style>.cl03 { fill: red; }</style><path></path></svg>';
            let expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);

            svg = '<svg><style>.cl03 { fill: red; }</style><path><style>.cl03 { fill: red; }</style></path></svg>';
            expectedSVG = "<svg><path/></svg>";
            expect(cleaner(svg)).to.equal(expectedSVG);
        });

        it("doesn't remove necessary attributes", () => {
            const svg = '<svg><symbol viewBox="0 0 24 24"/><path d="point"/></svg>';
            expect(cleaner(svg)).to.equal(svg);
        });
    });
});