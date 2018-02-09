const {expect} = chai = require("chai");
const spies = require("chai-spies");
const chaiAsPromised = require("chai-as-promised");
const rewire = require("rewire");
const Vinyl = require("vinyl");

chai.use(chaiAsPromised);
chai.use(spies);

const {spy} = chai;

const generator = rewire("./../src/generator");
const matchFiles = rewire("./../src/components/matchFiles");
const processFiles = require("./../src/components/processFiles");
const cleaner = require("./../src/components/cleaner");
const compileSprite = require("./../src/components/spriterCompiler");

const globMock = require("./mock/globMock");

describe("Icon Sprite Generator", function () {
    it("returns a SVG sprite as string", done => {
        const filesMock = [
            "/Users/g2a/PhpstormProjects/icon-sprite-generator/node_modules/@uix/icons/src/action/cart_check.svg",
            "/Users/g2a/PhpstormProjects/icon-sprite-generator/node_modules/@uix/icons/src/action/cart.svg",
            "/Users/g2a/PhpstormProjects/icon-sprite-generator/node_modules/@uix/icons/src/action/contact.svg",
        ];

        const matchFilesMock = () => {
            return new Promise(resolve => {
                resolve(filesMock);
            });
        };

        const processFilesMock = () => {
            return new Promise(resolve => {
                resolve(filesMock);
            });
        };

        const compileSpriteMock = () => {
            return new Promise(resolve => {
                resolve("<svg></svg>");
            });
        };

        const matchFilesSpy = spy(matchFilesMock);
        const processFilesSpy = spy(processFilesMock);
        const compileSpriteSpy = spy(compileSpriteMock);
        const spriterAddSpy = spy();

        const spriterMock = () => {
            return {
                add: spriterAddSpy,
            };
        };

        const revertMatchFiles = generator.__set__("matchFiles", matchFilesSpy);
        const revertProcessFiles = generator.__set__("processFiles", processFilesSpy);
        const revertCompileSprite = generator.__set__("compileSprite", compileSpriteSpy);
        const revertSpriter = generator.__set__("SVGSpriter", spriterMock);

        generator("path/to/**.svg").then(result => {
            expect(matchFilesSpy).to.have.been.called.once.with.exactly("path/to/**.svg");
            expect(processFilesSpy).to.have.been.called.once.with.exactly(filesMock);
            expect(spriterAddSpy).to.have.been.called(3);
            expect(compileSpriteSpy).to.have.been.called(1);
            expect(result).to.equal("<svg></svg>");

            done();
        }).catch(error => {
            done(error);
        }).then(() => {
            // rewire resets
            revertMatchFiles();
            revertProcessFiles();
            revertSpriter();
            revertCompileSprite();
        });
    });

    describe("matchFiles", () => {
        it("returns array of matched .svg files", done => {
            const revertGlobby = matchFiles.__set__("globby", globMock);
            matchFiles().then(data => {
                expect(data).to.deep.equal([
                    "path/to/api.svg",
                    "path/to/arrow_box.svg",
                    "path/to/bin.svg",
                    "path/to/calendar.svg",
                    "path/to/cart_check.svg",
                ]);
                done();
            }).catch(error => {
                done(error);
            }).then(() => {
                revertGlobby();
            })
        });
    });

    describe("processFiles", () => {
        const filesMock = [
            __dirname + "/icons/action_bin.svg",
            __dirname + "/icons/action_cart.svg",
            __dirname + "/icons/action_login.svg",
        ];

        it("rejects promise if no files provided", done => {
            processFiles().catch((error) => {
                expect(error).to.be.an("error", "No files provided.");
                done();
            });
        });

        it("returns array of processed files as Vinyl objects", done => {
            processFiles(filesMock).then(result => {
                expect(result).to.have.length(3);
                expect(Vinyl.isVinyl(result[0])).to.be.equal(true);
                expect(Vinyl.isVinyl(result[1])).to.be.equal(true);
                expect(Vinyl.isVinyl(result[2])).to.be.equal(true);

                expect(result[0].isBuffer()).to.be.equal(true);
                expect(result[1].isBuffer()).to.be.equal(true);
                expect(result[2].isBuffer()).to.be.equal(true);

                expect(result[0].path).to.be.equal(__dirname + "/icons/action_bin.svg");
                expect(result[1].path).to.be.equal(__dirname + "/icons/action_cart.svg");
                expect(result[2].path).to.be.equal(__dirname + "/icons/action_login.svg");
                done();
            }).catch(error => {
                done(error);
            });
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

    describe("spriterCompiler", () => {
        it("returns svg sprite content as string", done => {
            const spriterMock = {
                compile: callback => {
                    const result = {symbol: {sprite: {contents: 1,},},};
                    callback(null, result);
                },
            };

            compileSprite(spriterMock).then(result => {
                expect(result).to.equal("1");
                done();
            }).catch(error => {
                done(error);
            });
        });
    });
});