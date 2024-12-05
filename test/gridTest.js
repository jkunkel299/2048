function gridTest (){
    const assert = require('assert');

    const Grid = require("../js/grid");
    const Tile = require("../js/tile");

    const size = 4
    const cells =   [[null,null,{"position":{"x":0,"y":2},"value":4},{"position":{"x":0,"y":3},"value":8}],
                    [null,null,null,{"position":{"x":1,"y":3},"value":2}],
                    [null,null,null,{"position":{"x":2,"y":3},"value":2}],
                    [null,null,null,null]]    
        
    const gridInst = Object.create(Grid.prototype);
    gridInst.size = size;
    gridInst.cells = cells;

    describe('Tests for Grid.cellContent()', () => {
        const cell_test_1 = {x:0, y:0} //null
        const cell_test_2 = {x:0, y:1} //null
        const cell_test_3 = {x:0, y:2} //4
        const cell_test_4 = {x:0, y:3} //8
        const cell_test_5 = {x:1, y:0} //null
        const cell_test_6 = {x:1, y:1} //null
        const cell_test_7 = {x:1, y:2} //null
        const cell_test_8 = {x:1, y:3} //2
        const cell_test_9 = {x:2, y:0} //null
        const cell_test_10 = {x:2, y:1} //null
        const cell_test_11 = {x:2, y:2} //null
        const cell_test_12 = {x:2, y:3} //2
        const cell_test_13 = {x:3, y:0} //null
        const cell_test_14 = {x:3, y:1} //null
        const cell_test_15 = {x:3, y:2} //null
        const cell_test_16 = {x:3, y:3} //null
        
        it("Grid.cellContent - test case 1 - (0 , 0)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_1),null);
        });

        it("Grid.cellContent - test case 2 - (0 , 1)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_2),null);
        });

        it("Grid.cellContent - test case 3 - (0 , 2)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_3),{ position: { x: 0, y: 2 }, value: 4 });
        });

        it("Grid.cellContent - test case 4 - (0 , 3)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_4),{ position: { x: 0, y: 3 }, value: 8 });
        });

        it("Grid.cellContent - test case 5 - (1 , 0)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_5),null);
        });

        it("Grid.cellContent - test case 6 - (1 , 1)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_6),null);
        });

        it("Grid.cellContent - test case 7 - (1 , 2)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_7),null);
        });

        it("Grid.cellContent - test case 8 - (1 , 3)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_8),{ position: { x: 1, y: 3 }, value: 2 });
        });

        it("Grid.cellContent - test case 9 - (2 , 0)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_9),null);
        });

        it("Grid.cellContent - test case 10 - (2 , 1)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_10),null);
        });

        it("Grid.cellContent - test case 11 - (2 , 2)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_11),null);
        });

        it("Grid.cellContent - test case 12 - (2 , 3)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_12),{ position: { x: 2, y: 3 }, value: 2 });
        });

        it("Grid.cellContent - test case 13 - (3 , 0)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_13),null);
        });

        it("Grid.cellContent - test case 14 - (3 , 1)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_14),null);
        });

        it("Grid.cellContent - test case 15 - (3 , 2)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_15),null);
        });

        it("Grid.cellContent - test case 16 - (3 , 3)", function (){
            assert.deepEqual(gridInst.cellContent(cell_test_16),null);
        });
    });

    describe('Tests for Grid.insertTile()', () => {
        // const size = 4
        // const cells = [[null,null,{"position":{"x":0,"y":2},"value":4},{"position":{"x":0,"y":3},"value":8}],[null,null,null,{"position":{"x":1,"y":3},"value":2}],[null,null,null,{"position":{"x":2,"y":3},"value":2}],[null,null,null,null]]
        
        // const gridInst = Object.create(Grid.prototype);
        // gridInst.size = size;
        // gridInst.cells = cells;

        const position_1 = { "x": 0, "y": 0 };
        const value_1 = 2;
        const position_2 = { "x": 1, "y": 1 };
        const value_2 = 4;
        const position_3 = { "x": 2, "y": 2 };
        const value_3 = 8;
        const position_4 = { "x": 3, "y": 3 };
        const value_4 = 16;

        const tile_test_1 = new Tile(position_1, value_1);
        const tile_test_2 = new Tile(position_2, value_2);
        const tile_test_3 = new Tile(position_3, value_3);
        const tile_test_4 = new Tile(position_4, value_4);

        it("Grid.insertTile - test case 1 - (0,0) ", function () {
            gridInst.insertTile(tile_test_1);
            assert.equal(tile_test_1, gridInst.cells[position_1.x][position_1.y], "deeply equal");
        });
        it("Grid.insertTile - test case 2 - (1,1) ", function () {
            gridInst.insertTile(tile_test_2);
            assert.equal(tile_test_2, gridInst.cells[position_2.x][position_2.y], "deeply equal");
        });
        it("Grid.insertTile - test case 3 - (2,2) ", function () {
            gridInst.insertTile(tile_test_3);
            assert.equal(tile_test_3, gridInst.cells[position_3.x][position_3.y], "deeply equal");
        });
        it("Grid.insertTile - test case 4 - (3,3) ", function () {
            gridInst.insertTile(tile_test_4);
            assert.equal(tile_test_4, gridInst.cells[position_4.x][position_4.y], "deeply equal");
        });

    });

    describe('Tests for Grid.removeTile()', () => {
        // const size = 4
        // const cells = [[null, null, { "position": { "x": 0, "y": 2 }, "value": 4 }, { "position": { "x": 0, "y": 3 }, "value": 8 }], [null, null, null, { "position": { "x": 1, "y": 3 }, "value": 2 }], [null, null, null, { "position": { "x": 2, "y": 3 }, "value": 2 }], [null, null, null, null]]

        // const gridInst = Object.create(Grid.prototype);
        // gridInst.size = size;
        // gridInst.cells = cells;

        const position_1 = { "x": 0, "y": 2 };
        const value_1 = 0;
        const position_2 = { "x": 0, "y": 3 };
        const value_2 = 0;
        const position_3 = { "x": 1, "y": 3 };
        const value_3 = 0;
        const position_4 = { "x": 2, "y": 3 };
        const value_4 = 0;

        const tile_test_1 = new Tile(position_1, value_1);
        const tile_test_2 = new Tile(position_2, value_2);
        const tile_test_3 = new Tile(position_3, value_3);
        const tile_test_4 = new Tile(position_4, value_4);

        it("Grid.removeTile - test case 1 - (0,2) ", function () {
            gridInst.removeTile(tile_test_1);
            assert.equal(gridInst.cells[position_1.x][position_1.y], null, "deeply equal");
        });
        it("Grid.removeTile - test case 2 - (0,3) ", function () {
            gridInst.removeTile(tile_test_2);
            assert.equal(gridInst.cells[position_2.x][position_2.y], null, "deeply equal");
        });
        it("Grid.removeTile - test case 3 - (1,3) ", function () {
            gridInst.removeTile(tile_test_3);
            assert.equal(gridInst.cells[position_3.x][position_3.y], null, "deeply equal");
        });
        it("Grid.removeTile - test case 4 - (2,3) ", function () {
            gridInst.removeTile(tile_test_4);
            assert.equal(gridInst.cells[position_4.x][position_4.y], null, "deeply equal");
        });

    });
}

module.exports = {
    gridTest:gridTest
}