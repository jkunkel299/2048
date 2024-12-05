function HTMLActuatorTest () {
    const assert = require('assert');

    require('jsdom-global')();
    window = global.window;

    const sinon = require('sinon');

    const HTMLActuator = require("../js/html_actuator");

    const testHTMLA = Object.create(HTMLActuator.prototype);
    testHTMLA.tileContainer = document.querySelector(".tile-container");
    testHTMLA.scoreContainer = document.querySelector(".score-container");
    testHTMLA.bestContainer = document.querySelector(".best-container");
    testHTMLA.messageContainer = document.querySelector(".game-message");
    testHTMLA.score = 0;
    testHTMLA.scoreContainer = { content: "Score" };

    describe('Tests for HTMLActuator.normalizePosition()', () => {
        let updatedPosition; 

        // intitialize positions
        const position_test_1 = { "x": 0, "y": 0 };
        const position_test_2 = { "x": 0, "y": 1 };
        const position_test_3 = { "x": 0, "y": 2 };
        const position_test_4 = { "x": 0, "y": 3 };
        const position_test_5 = { "x": 1, "y": 0 };
        const position_test_6 = { "x": 1, "y": 1 };
        const position_test_7 = { "x": 1, "y": 2 };
        const position_test_8 = { "x": 1, "y": 3 };
        const position_test_9 = { "x": 2, "y": 0 };
        const position_test_10 = { "x": 2, "y": 1 };
        const position_test_11 = { "x": 2, "y": 2 };
        const position_test_12 = { "x": 2, "y": 3 };
        const position_test_13 = { "x": 3, "y": 0 };
        const position_test_14 = { "x": 3, "y": 1 };
        const position_test_15 = { "x": 3, "y": 2 };
        const position_test_16 = { "x": 3, "y": 3 };

        it("HTMLActuator.normalizePosition - test case 1 - (0,0) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_1);
            assert.deepEqual({ "x": 1, "y": 1 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 2 - (0,1) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_2);
            assert.deepEqual({ "x": 1, "y": 2 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 3 - (0,2) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_3);
            assert.deepEqual({ "x": 1, "y": 3 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 4 - (0,3) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_4);
            assert.deepEqual({ "x": 1, "y": 4 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 5 - (1,0) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_5);
            assert.deepEqual({ "x": 2, "y": 1 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 6 - (1,1) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_6);
            assert.deepEqual({ "x": 2, "y": 2 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 7 - (1,2) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_7);
            assert.deepEqual({ "x": 2, "y": 3 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 8 - (1,3) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_8);
            assert.deepEqual({ "x": 2, "y": 4 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 9 - (2,0) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_9);
            assert.deepEqual({ "x": 3, "y": 1 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 10 - (2,1) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_10);
            assert.deepEqual({ "x": 3, "y": 2 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 11 - (2,2) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_11);
            assert.deepEqual({ "x": 3, "y": 3 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 12 - (2,3) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_12);
            assert.deepEqual({ "x": 3, "y": 4 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 13 - (3,0) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_13);
            assert.deepEqual({ "x": 4, "y": 1 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 14 - (3,1) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_14);
            assert.deepEqual({ "x": 4, "y": 2 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 15 - (3,2) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_15);
            assert.deepEqual({ "x": 4, "y": 3 }, updatedPosition);
        });

        it("HTMLActuator.normalizePosition - test case 16 - (3,3) ", function () {
            updatedPosition = testHTMLA.normalizePosition(position_test_16);
            assert.deepEqual({ "x": 4, "y": 4 }, updatedPosition);
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