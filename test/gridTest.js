function gridTest (){
    const assert = require('assert');

    const Grid = require("../js/grid");
    const Tile = require("../js/tile");

    const size = 4
    const cells =   [[null,null,{"position":{"x":0,"y":2},"value":4},{"position":{"x":0,"y":3},"value":8}],
                    [null,null,null,{"position":{"x":1,"y":3},"value":2}],
                    [null,null,null,{"position":{"x":2,"y":3},"value":2}],
                    [null,null,null,null]] 
                    
    const emptyCells = [[null,null,null,null],
                        [null,null,null,null],
                        [null,null,null,null],
                        [null,null,null,null]]

    const fullCells =   [[{"position":{"x":0,"y":0},"value":2},{"position":{"x":0,"y":1},"value":4},{"position":{"x":0,"y":2},"value":8},{"position":{"x":0,"y":3},"value":16}],
                        [{"position":{"x":1,"y":0},"value":16},{"position":{"x":1,"y":1},"value":2},{"position":{"x":1,"y":2},"value":4},{"position":{"x":1,"y":3},"value":8}],
                        [{"position":{"x":2,"y":0},"value":8},{"position":{"x":2,"y":1},"value":16},{"position":{"x":2,"y":2},"value":2},{"position":{"x":2,"y":3},"value":4}],
                        [{"position":{"x":3,"y":0},"value":4},{"position":{"x":3,"y":1},"value":8},{"position":{"x":3,"y":2},"value":16},{"position":{"x":3,"y":3},"value":2}]]
        
    const gridInst = Object.create(Grid.prototype);
    gridInst.size = size;
    gridInst.cells = cells;

    const cell_0_0 = {x: 0, y: 0};
    const cell_0_1 = {x: 0, y: 1};
    const cell_0_2 = {x: 0, y: 2};
    const cell_0_3 = {x: 0, y: 3};
    const cell_1_0 = {x: 1, y: 0};
    const cell_1_1 = {x: 1, y: 1};
    const cell_1_2 = {x: 1, y: 2};
    const cell_1_3 = {x: 1, y: 3};
    const cell_2_0 = {x: 2, y: 0};
    const cell_2_1 = {x: 2, y: 1};
    const cell_2_2 = {x: 2, y: 2};
    const cell_2_3 = {x: 2, y: 3};
    const cell_3_0 = {x: 3, y: 0};
    const cell_3_1 = {x: 3, y: 1};
    const cell_3_2 = {x: 3, y: 2};
    const cell_3_3 = {x: 3, y: 3};

    // tile declarations for Grid.insertTile() and Grid.removeTile() tests
    const tile_test_1 = new Tile(cell_0_0, 2);
    const tile_test_2 = new Tile(cell_0_1, 4);
    const tile_test_3 = new Tile(cell_0_1, 8);
    const tile_test_4 = new Tile(cell_0_2, 8);
    const tile_test_5 = new Tile(cell_0_3, 16);
    const tile_test_6 = new Tile(cell_1_0, 16);
    const tile_test_7 = new Tile(cell_1_1, 2);
    const tile_test_8 = new Tile(cell_1_2, 8);
    const tile_test_9 = new Tile(cell_1_3, 16);
    const tile_test_10 = new Tile(cell_2_0, 2);
    const tile_test_11 = new Tile(cell_2_1, 4);
    const tile_test_12 = new Tile(cell_2_2, 2);
    const tile_test_13 = new Tile(cell_2_3, 16);
    const tile_test_14 = new Tile(cell_3_0, 16);
    const tile_test_15 = new Tile(cell_3_1, 2);
    const tile_test_16 = new Tile(cell_3_2, 8);
    const tile_test_17 = new Tile(cell_3_3, 2);

    describe('Tests for Grid.cellContent()', () => {        
        it("Grid.cellContent - test case 1 - (0 , 0)", () => {
            assert.deepEqual(gridInst.cellContent(cell_0_0),null);
        });

        it("Grid.cellContent - test case 2 - (0 , 1)", () => {
            assert.deepEqual(gridInst.cellContent(cell_0_1),null);
        });

        it("Grid.cellContent - test case 3 - (0 , 2)", () => {
            assert.deepEqual(gridInst.cellContent(cell_0_2),{ position: { x: 0, y: 2 }, value: 4 });
        });

        it("Grid.cellContent - test case 4 - (0 , 3)", () => {
            assert.deepEqual(gridInst.cellContent(cell_0_3),{ position: { x: 0, y: 3 }, value: 8 });
        });

        it("Grid.cellContent - test case 5 - (1 , 0)", () => {
            assert.deepEqual(gridInst.cellContent(cell_1_0),null);
        });

        it("Grid.cellContent - test case 6 - (1 , 1)", () => {
            assert.deepEqual(gridInst.cellContent(cell_1_1),null);
        });

        it("Grid.cellContent - test case 7 - (1 , 2)", () => {
            assert.deepEqual(gridInst.cellContent(cell_1_2),null);
        });

        it("Grid.cellContent - test case 8 - (1 , 3)", () => {
            assert.deepEqual(gridInst.cellContent(cell_1_3),{ position: { x: 1, y: 3 }, value: 2 });
        });

        it("Grid.cellContent - test case 9 - (2 , 0)", () => {
            assert.deepEqual(gridInst.cellContent(cell_2_0),null);
        });

        it("Grid.cellContent - test case 10 - (2 , 1)", () => {
            assert.deepEqual(gridInst.cellContent(cell_2_1),null);
        });

        it("Grid.cellContent - test case 11 - (2 , 2)", () => {
            assert.deepEqual(gridInst.cellContent(cell_2_2),null);
        });

        it("Grid.cellContent - test case 12 - (2 , 3)", () => {
            assert.deepEqual(gridInst.cellContent(cell_2_3),{ position: { x: 2, y: 3 }, value: 2 });
        });

        it("Grid.cellContent - test case 13 - (3 , 0)", () => {
            assert.deepEqual(gridInst.cellContent(cell_3_0),null);
        });

        it("Grid.cellContent - test case 14 - (3 , 1)", () => {
            assert.deepEqual(gridInst.cellContent(cell_3_1),null);
        });

        it("Grid.cellContent - test case 15 - (3 , 2)", () => {
            assert.deepEqual(gridInst.cellContent(cell_3_2),null);
        });

        it("Grid.cellContent - test case 16 - (3 , 3)", () => {
            assert.deepEqual(gridInst.cellContent(cell_3_3),null);
        });
    });

    describe('Tests for Grid.insertTile()', () => {
        const emptyGrid = Object.create(Grid.prototype);
        emptyGrid.size = size;
        emptyGrid.cells = emptyCells;

        it("Grid.insertTile - test case 1 - (0,0) ", () =>  {
            emptyGrid.insertTile(tile_test_1);
            assert.equal(tile_test_1, emptyGrid.cells[cell_0_0.x][cell_0_0.y], "deeply equal");
        });

        it("Grid.insertTile - test case 2 - (0,1) ", () =>  {
            emptyGrid.insertTile(tile_test_2);
            assert.equal(tile_test_2, emptyGrid.cells[cell_0_1.x][cell_0_1.y], "deeply equal");
        });

        it("Grid.insertTile - test case 3 - (0,1) ", () =>  {
            emptyGrid.insertTile(tile_test_3);
            assert.equal(tile_test_3, emptyGrid.cells[cell_0_1.x][cell_0_1.y], "deeply equal");
        });

        it("Grid.insertTile - test case 4 - (0,2) ", () =>  {
            emptyGrid.insertTile(tile_test_4);
            assert.equal(tile_test_4, emptyGrid.cells[cell_0_2.x][cell_0_2.y], "deeply equal");
        });

        it("Grid.insertTile - test case 5 - (0,3) ", () =>  {
            emptyGrid.insertTile(tile_test_5);
            assert.equal(tile_test_5, emptyGrid.cells[cell_0_3.x][cell_0_3.y], "deeply equal");
        });

        it("Grid.insertTile - test case 6 - (1,0) ", () =>  {
            emptyGrid.insertTile(tile_test_6);
            assert.equal(tile_test_6, emptyGrid.cells[cell_1_0.x][cell_1_0.y], "deeply equal");
        });

        it("Grid.insertTile - test case 7 - (1,1) ", () =>  {
            emptyGrid.insertTile(tile_test_7);
            assert.equal(tile_test_7, emptyGrid.cells[cell_1_1.x][cell_1_1.y], "deeply equal");
        });

        it("Grid.insertTile - test case 8 - (1,2) ", () =>  {
            emptyGrid.insertTile(tile_test_8);
            assert.equal(tile_test_8, emptyGrid.cells[cell_1_2.x][cell_1_2.y], "deeply equal");
        });

        it("Grid.insertTile - test case 9 - (1,3) ", () =>  {
            emptyGrid.insertTile(tile_test_9);
            assert.equal(tile_test_9, emptyGrid.cells[cell_1_3.x][cell_1_3.y], "deeply equal");
        });

        it("Grid.insertTile - test case 10 - (2,0) ", () =>  {
            emptyGrid.insertTile(tile_test_10);
            assert.equal(tile_test_10, emptyGrid.cells[cell_2_0.x][cell_2_0.y], "deeply equal");
        });

        it("Grid.insertTile - test case 11 - (2,1) ", () =>  {
            emptyGrid.insertTile(tile_test_11);
            assert.equal(tile_test_11, emptyGrid.cells[cell_2_1.x][cell_2_1.y], "deeply equal");
        });

        it("Grid.insertTile - test case 12 - (2,2) ", () =>  {
            emptyGrid.insertTile(tile_test_12);
            assert.equal(tile_test_12, emptyGrid.cells[cell_2_2.x][cell_2_2.y], "deeply equal");
        });

        it("Grid.insertTile - test case 13 - (2,3) ", () =>  {
            emptyGrid.insertTile(tile_test_13);
            assert.equal(tile_test_13, emptyGrid.cells[cell_2_3.x][cell_2_3.y], "deeply equal");
        });

        it("Grid.insertTile - test case 14 - (3,0) ", () =>  {
            emptyGrid.insertTile(tile_test_14);
            assert.equal(tile_test_14, emptyGrid.cells[cell_3_0.x][cell_3_0.y], "deeply equal");
        });

        it("Grid.insertTile - test case 15 - (3,1) ", () =>  {
            emptyGrid.insertTile(tile_test_15);
            assert.equal(tile_test_15, emptyGrid.cells[cell_3_1.x][cell_3_1.y], "deeply equal");
        });

        it("Grid.insertTile - test case 16 - (3,2) ", () =>  {
            emptyGrid.insertTile(tile_test_16);
            assert.equal(tile_test_16, emptyGrid.cells[cell_3_2.x][cell_3_2.y], "deeply equal");
        });

        it("Grid.insertTile - test case 17 - (3,3) ", () =>  {
            emptyGrid.insertTile(tile_test_17);
            assert.equal(tile_test_17, emptyGrid.cells[cell_3_3.x][cell_3_3.y], "deeply equal");
        });

    });

    describe('Tests for Grid.removeTile()', () => {
        const fullGrid = Object.create(Grid.prototype);
        fullGrid.size = size;
        fullGrid.cells = fullCells;

        it("Grid.removeTile - test case 1 - (0,0) ", () =>  {
            fullGrid.removeTile(tile_test_1);
            assert.equal(fullGrid.cells[cell_0_0.x][cell_0_0.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 2 - (0,1) ", () =>  {
            fullGrid.removeTile(tile_test_2);
            assert.equal(fullGrid.cells[cell_0_1.x][cell_0_1.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 3 - (0,1) ", () =>  {
            fullGrid.removeTile(tile_test_3);
            assert.equal(fullGrid.cells[cell_0_1.x][cell_0_1.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 4 - (0,2) ", () =>  {
            fullGrid.removeTile(tile_test_4);
            assert.equal(fullGrid.cells[cell_0_2.x][cell_0_2.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 5 - (0,3) ", () =>  {
            fullGrid.removeTile(tile_test_5);
            assert.equal(fullGrid.cells[cell_0_3.x][cell_0_3.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 6 - (1,0) ", () =>  {
            fullGrid.removeTile(tile_test_6);
            assert.equal(fullGrid.cells[cell_1_0.x][cell_1_0.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 7 - (1,1) ", () =>  {
            fullGrid.removeTile(tile_test_7);
            assert.equal(fullGrid.cells[cell_1_1.x][cell_1_1.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 8 - (1,2) ", () =>  {
            fullGrid.removeTile(tile_test_8);
            assert.equal(fullGrid.cells[cell_1_2.x][cell_1_2.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 9 - (1,3) ", () =>  {
            fullGrid.removeTile(tile_test_9);
            assert.equal(fullGrid.cells[cell_1_3.x][cell_1_3.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 10 - (2,0) ", () =>  {
            fullGrid.removeTile(tile_test_10);
            assert.equal(fullGrid.cells[cell_2_0.x][cell_2_0.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 11 - (2,1) ", () =>  {
            fullGrid.removeTile(tile_test_11);
            assert.equal(fullGrid.cells[cell_2_1.x][cell_2_1.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 12 - (2,2) ", () =>  {
            fullGrid.removeTile(tile_test_12);
            assert.equal(fullGrid.cells[cell_2_2.x][cell_2_2.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 13 - (2,3) ", () =>  {
            fullGrid.removeTile(tile_test_13);
            assert.equal(fullGrid.cells[cell_2_3.x][cell_2_3.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 14 - (3,0) ", () =>  {
            fullGrid.removeTile(tile_test_14);
            assert.equal(fullGrid.cells[cell_3_0.x][cell_3_0.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 15 - (3,1) ", () =>  {
            fullGrid.removeTile(tile_test_15);
            assert.equal(fullGrid.cells[cell_3_1.x][cell_3_1.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 16 - (3,2) ", () =>  {
            fullGrid.removeTile(tile_test_16);
            assert.equal(fullGrid.cells[cell_3_2.x][cell_3_2.y], null, "deeply equal");
        });

        it("Grid.removeTile - test case 17 - (3,3) ", () =>  {
            fullGrid.removeTile(tile_test_17);
            assert.equal(fullGrid.cells[cell_3_3.x][cell_3_3.y], null, "deeply equal");
        });

    });

}

module.exports = {
    gridTest:gridTest
}