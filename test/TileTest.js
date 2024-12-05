function tileTest () {
    const assert = require('assert');

    const Tile = require("../js/tile");

    describe('Tests for Tile.updatePosition()', () => {
        initialPosition = { "x": 0, "y": 0 };
        initialValue = 16;
        const testTile = new Tile(initialPosition, initialValue);

        const position_test_1 = { "x": 0, "y": 1 };
        const position_test_2 = { "x": 0, "y": 2 };
        const position_test_3 = { "x": 0, "y": 3 };
        const position_test_4 = { "x": 1, "y": 0 };
        const position_test_5 = { "x": 1, "y": 1 };
        const position_test_6 = { "x": 1, "y": 2 };
        const position_test_7 = { "x": 1, "y": 3 };
        const position_test_8 = { "x": 2, "y": 0 };
        const position_test_9 = { "x": 2, "y": 1 };
        const position_test_10 = { "x": 2, "y": 2 };
        const position_test_11 = { "x": 2, "y": 3 };
        const position_test_12 = { "x": 3, "y": 0 };
        const position_test_13 = { "x": 3, "y": 1 };
        const position_test_14 = { "x": 3, "y": 2 };
        const position_test_15 = { "x": 3, "y": 3 };

        it("Tile.updatePosition - test case 1 - (0,1) ", function () {
            testTile.updatePosition(position_test_1);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_1, updatedPosition);
        });
        it("Tile.updatePosition - test case 2 - (0,2) ", function () {
            testTile.updatePosition(position_test_2);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_2, updatedPosition);
        });
        it("Tile.updatePosition - test case 3 - (0,3) ", function () {
            testTile.updatePosition(position_test_3);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_3, updatedPosition);
        });

        it("Tile.updatePosition - test case 4 - (1,0) ", function () {
            testTile.updatePosition(position_test_4);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_4, updatedPosition);
        });
        it("Tile.updatePosition - test case 5 - (1,1) ", function () {
            testTile.updatePosition(position_test_5);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_5, updatedPosition);
        });
        it("Tile.updatePosition - test case 6 - (1,2) ", function () {
            testTile.updatePosition(position_test_6);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_6, updatedPosition);
        });
        it("Tile.updatePosition - test case 7 - (1,3) ", function () {
            testTile.updatePosition(position_test_7);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_7, updatedPosition);
        });

        it("Tile.updatePosition - test case 8 - (2,0) ", function () {
            testTile.updatePosition(position_test_8);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_8, updatedPosition);
        });
        it("Tile.updatePosition - test case 9 - (2,1) ", function () {
            testTile.updatePosition(position_test_9);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_9, updatedPosition);
        });
        it("Tile.updatePosition - test case 10 - (2,2) ", function () {
            testTile.updatePosition(position_test_10);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_10, updatedPosition);
        });
        it("Tile.updatePosition - test case 11 - (2,3) ", function () {
            testTile.updatePosition(position_test_11);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_11, updatedPosition);
        });

        it("Tile.updatePosition - test case 12 - (3,0) ", function () {
            testTile.updatePosition(position_test_12);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_12, updatedPosition);
        });
        it("Tile.updatePosition - test case 13 - (3,1) ", function () {
            testTile.updatePosition(position_test_13);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_13, updatedPosition);
        });
        it("Tile.updatePosition - test case 14 - (3,2) ", function () {
            testTile.updatePosition(position_test_14);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_14, updatedPosition);
        });
        it("Tile.updatePosition - test case 15 - (3,3) ", function () {
            testTile.updatePosition(position_test_15);
            updatedPosition = { "x": testTile.x, "y": testTile.y };
            assert.deepEqual(position_test_15, updatedPosition);
        });

    });

}

module.exports = {
    tileTest:tileTest
}