function HTMLActuatorTest () {
    const assert = require('assert');

    require('jsdom-global')();
    window = global.window;

    const sinon = require('sinon');

    const HTMLActuator = require("../js/html_actuator");
    const Tile = require("../js/tile");

    const testHTMLA = Object.create(HTMLActuator.prototype);
    testHTMLA.tileContainer = document.querySelector(".tile-container");
    testHTMLA.scoreContainer = document.querySelector(".score-container");
    testHTMLA.bestContainer = document.querySelector(".best-container");
    testHTMLA.messageContainer = document.querySelector(".game-message");
    testHTMLA.score = 0;
    testHTMLA.scoreContainer = { content: "Score" };

    describe('Tests for HTMLActuator.normalizePosition()', () => {
        const position_1 = { "x": 0, "y": 0 };
        const position_2 = { "x": 1, "y": 1 };
        const position_3 = { "x": 2, "y": 2 };
        const position_4 = { "x": 3, "y": 3 };
        const position_5 = { "x": 4, "y": 4 };

        it("HTMLActuator.normalizePosition - test case 1 - (0,0) ", function () {
            // Taking advantage of the fact the positions become the next in the list
            updatedPosition = testHTMLA.normalizePosition(position_1);
            assert.deepEqual(position_2, updatedPosition);
        });
        it("HTMLActuator.normalizePosition - test case 2 - (1,1) ", function () {
            // Taking advantage of the fact the positions become the next in the list
            updatedPosition = testHTMLA.normalizePosition(position_2);
            assert.deepEqual(position_3, updatedPosition);
        });
        it("HTMLActuator.normalizePosition - test case 3 - (2,2) ", function () {
            // Taking advantage of the fact the positions become the next in the list
            updatedPosition = testHTMLA.normalizePosition(position_3);
            assert.deepEqual(position_4, updatedPosition);
        });
        it("HTMLActuator.normalizePosition - test case 4 - (3,3) ", function () {
            // Taking advantage of the fact the positions become the next in the list
            updatedPosition = testHTMLA.normalizePosition(position_4);
            assert.deepEqual(position_5, updatedPosition);
        });

    });

    describe('Tests for HTMLActuator.updateScore()', () => {

        const test_score_1 = 0;
        const test_score_2 = 16;
        const test_score_3 = 160;
        const test_score_4 = 2048;
        const test_score_5 = -1;

        testHTMLA.scoreContainer = {
            appendChild: sinon.stub()
        };
        testHTMLA.scoreContainer.score = -999;
        it("HTMLActuator.updateScore - test case 1 - 0", function () {
            testHTMLA.updateScore(test_score_1);
            assert.equal(test_score_1, testHTMLA.score);
        });
        it("HTMLActuator.updateScore - test case 2 - 16", function () {
            testHTMLA.updateScore(test_score_2);
            assert.equal(test_score_2, testHTMLA.score);
        });
        it("HTMLActuator.updateScore - test case 3 - 160", function () {
            testHTMLA.updateScore(test_score_3);
            assert.equal(test_score_3, testHTMLA.score);
        });
        it("HTMLActuator.updateScore - test case 4 - 2048", function () {
            testHTMLA.updateScore(test_score_4);
            assert.equal(test_score_4, testHTMLA.score);
        });
        it("HTMLActuator.updateScore - test case 5 - (-1)", function () {
            testHTMLA.updateScore(test_score_5);
            assert.equal(test_score_5, testHTMLA.score);
        });

    });

}

module.exports = {
    HTMLActuatorTest:HTMLActuatorTest
}