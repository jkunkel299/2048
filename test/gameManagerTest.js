function gameManagerTest () {
    const assert = require('assert');

    const GameManager = require("../js/game_manager");
    const Tile = require("../js/tile");
    const Grid = require("../js/grid");

    const size = 4
    const cells =   [[null,null,{"position":{"x":0,"y":2},"value":4},{"position":{"x":0,"y":3},"value":8}],
                    [null,null,null,{"position":{"x":1,"y":3},"value":2}],
                    [null,null,null,{"position":{"x":2,"y":3},"value":2}],
                    [null,null,null,null]]    
    
    const gridInst = Object.create(Grid.prototype);
    gridInst.size = size;
    gridInst.cells = cells;    
    
    const gameManagerInstance = Object.create(GameManager.prototype);
    gameManagerInstance.size = size;
    gameManagerInstance.grid = gridInst;

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

    describe('Tests for GameManager.getVector(direction)', () => {
            // directions:
            //     0: Up
            //     1: Right
            //     2: Down
            //     3: Left
            
        it("test case 1 - getVector - Up", function (){            
            assert.deepEqual(gameManagerInstance.getVector(0),{ x: 0,  y: -1 });
        });

        it("test case 2 - getVector - Left", function (){            
            assert.deepEqual(gameManagerInstance.getVector(1),{ x: 1,  y: 0 });
        });

        it("test case 3 - getVector - Down", function (){            
            assert.deepEqual(gameManagerInstance.getVector(2),{ x: 0,  y: 1 });
        });

        it("test case 4 - getVector - Right", function (){            
            assert.deepEqual(gameManagerInstance.getVector(3),{ x: -1,  y: 0 });
        });
        
    });

    describe('Tests for GameManager.moveTile(tile, cell)', () => {
        const moveTile_tile_1 = new Tile({x: 1, y: 2}, 2);
        moveTile_tile_1.previousPosition = {"x": 1, "y": 2};

        const moveTile_tile_2 = new Tile({x: 2, y: 1}, 8);
        moveTile_tile_2.previousPosition = {"x": 2, "y": 1};
        
        const moveTile_tile_3 = new Tile({x: 0, y: 0}, 16);
        moveTile_tile_3.previousPosition = {"x": 0, "y": 0};

        const moveTile_tile_4 = new Tile({x: 3, y: 1}, 4);
        moveTile_tile_4.previousPosition = {"x": 3, "y": 1};

        const moveTile_tile_5 = new Tile({x: 2, y: 3}, 4);
        moveTile_tile_5.previousPosition = {"x": 2, "y": 3};

        const moveTile_tile_6 = new Tile({x: 2, y: 2}, 16);
        moveTile_tile_6.previousPosition = {"x": 2, "y": 2};

        const moveTile_tile_7 = new Tile({x: 0, y: 2}, 8);
        moveTile_tile_7.previousPosition = {"x": 0, "y": 2};

        const moveTile_tile_8 = new Tile({x: 3, y: 2}, 4);
        moveTile_tile_8.previousPosition = {"x": 3, "y": 2};

        const moveTile_tile_9 = new Tile({x: 0, y: 3}, 4);
        moveTile_tile_9.previousPosition = {"x": 0, "y": 3};

        const moveTile_tile_10 = new Tile({x: 0, y: 1}, 2);
        moveTile_tile_10.previousPosition = {"x": 0, "y": 1};

        const moveTile_tile_11 = new Tile({x: 1, y: 1}, 16);
        moveTile_tile_11.previousPosition = {"x": 1, "y": 1};

        const moveTile_tile_12 = new Tile({x: 3, y: 3}, 8);
        moveTile_tile_12.previousPosition = {"x": 3, "y": 3};

        const moveTile_tile_13 = new Tile({x: 1, y: 0}, 2);
        moveTile_tile_13.previousPosition = {"x": 1, "y": 0};

        const moveTile_tile_14 = new Tile({x: 1, y: 3}, 16);
        moveTile_tile_14.previousPosition = {"x": 1, "y": 3};

        const moveTile_tile_15 = new Tile({x: 3, y: 0}, 16);
        moveTile_tile_15.previousPosition = {"x": 3, "y": 0};

        const moveTile_tile_16 = new Tile({x: 2, y: 0}, 4);
        moveTile_tile_16.previousPosition = {"x": 2, "y": 0};

        const moveTile_tile_17 = new Tile({x: 0, y: 3}, 16);
        moveTile_tile_17.previousPosition = {"x": 0, "y": 3};

        const moveTile_tile_18 = new Tile({x: 1, y: 0}, 8);
        moveTile_tile_18.previousPosition = {"x": 1, "y": 0};

        const moveTile_tile_19 = new Tile({x: 1, y: 0}, 8);
        moveTile_tile_19.previousPosition = {"x": 1, "y": 0};

        const moveTile_tile_20 = new Tile({x: 1, y: 1}, 4);
        moveTile_tile_20.previousPosition = {"x": 1, "y": 1};
        
        it("moveTile - test case 1", function (){          
            gameManagerInstance.moveTile(moveTile_tile_1, cell_1_2);
            const updatedMoveTile_cell_1 = gridInst.cells[cell_1_2.x][cell_1_2.y];
            assert.deepEqual(updatedMoveTile_cell_1, moveTile_tile_1);
        });

        it("moveTile - test case 2", function (){          
            gameManagerInstance.moveTile(moveTile_tile_2, cell_2_1);
            const updatedMoveTile_cell_2 = gridInst.cells[cell_2_1.x][cell_2_1.y];
            assert.deepEqual(updatedMoveTile_cell_2, moveTile_tile_2);
        });

        it("moveTile - test case 3", function (){          
            gameManagerInstance.moveTile(moveTile_tile_3, cell_1_0);
            const updatedMoveTile_cell_3 = gridInst.cells[cell_1_0.x][cell_1_0.y];
            assert.deepEqual(updatedMoveTile_cell_3, moveTile_tile_3);
        });

        it("moveTile - test case 4", function (){          
            gameManagerInstance.moveTile(moveTile_tile_4, cell_0_1);
            const updatedMoveTile_cell_4 = gridInst.cells[cell_0_1.x][cell_0_1.y];
            assert.deepEqual(updatedMoveTile_cell_4, moveTile_tile_4);
        });

        it("moveTile - test case 5", function (){          
            gameManagerInstance.moveTile(moveTile_tile_5, cell_3_3);
            const updatedMoveTile_cell_5 = gridInst.cells[cell_3_3.x][cell_3_3.y];
            assert.deepEqual(updatedMoveTile_cell_5, moveTile_tile_5);
        });

        it("moveTile - test case 6", function (){          
            gameManagerInstance.moveTile(moveTile_tile_6, cell_0_2);
            const updatedMoveTile_cell_6 = gridInst.cells[cell_0_2.x][cell_0_2.y];
            assert.deepEqual(updatedMoveTile_cell_6, moveTile_tile_6);
        });

        it("moveTile - test case 7", function (){          
            gameManagerInstance.moveTile(moveTile_tile_7, cell_3_2);
            const updatedMoveTile_cell_7 = gridInst.cells[cell_3_2.x][cell_3_2.y];
            assert.deepEqual(updatedMoveTile_cell_7, moveTile_tile_7);
        });
        
        it("moveTile - test case 8", function (){          
            gameManagerInstance.moveTile(moveTile_tile_8, cell_2_2);
            const updatedMoveTile_cell_8 = gridInst.cells[cell_2_2.x][cell_2_2.y];
            assert.deepEqual(updatedMoveTile_cell_8, moveTile_tile_8);
        });

        it("moveTile - test case 9", function (){          
            gameManagerInstance.moveTile(moveTile_tile_9, cell_2_3);
            const updatedMoveTile_cell_9 = gridInst.cells[cell_2_3.x][cell_2_3.y];
            assert.deepEqual(updatedMoveTile_cell_9, moveTile_tile_9);
        });

        it("moveTile - test case 10", function (){          
            gameManagerInstance.moveTile(moveTile_tile_10, cell_1_1);
            const updatedMoveTile_cell_10 = gridInst.cells[cell_1_1.x][cell_1_1.y];
            assert.deepEqual(updatedMoveTile_cell_10, moveTile_tile_10);
        });

        it("moveTile - test case 11", function (){          
            gameManagerInstance.moveTile(moveTile_tile_11, cell_3_1);
            const updatedMoveTile_cell_11 = gridInst.cells[cell_3_1.x][cell_3_1.y];
            assert.deepEqual(updatedMoveTile_cell_11, moveTile_tile_11);
        });

        it("moveTile - test case 12", function (){          
            gameManagerInstance.moveTile(moveTile_tile_12, cell_1_3);
            const updatedMoveTile_cell_12 = gridInst.cells[cell_1_3.x][cell_1_3.y];
            assert.deepEqual(updatedMoveTile_cell_12, moveTile_tile_12);
        });

        it("moveTile - test case 13", function (){          
            gameManagerInstance.moveTile(moveTile_tile_13, cell_2_0);
            const updatedMoveTile_cell_13 = gridInst.cells[cell_2_0.x][cell_2_0.y];
            assert.deepEqual(updatedMoveTile_cell_13, moveTile_tile_13);
        });

        it("moveTile - test case 14", function (){          
            gameManagerInstance.moveTile(moveTile_tile_14, cell_0_3);
            const updatedMoveTile_cell_14 = gridInst.cells[cell_0_3.x][cell_0_3.y];
            assert.deepEqual(updatedMoveTile_cell_14, moveTile_tile_14);
        });

        it("moveTile - test case 15", function (){          
            gameManagerInstance.moveTile(moveTile_tile_15, cell_0_0);
            const updatedMoveTile_cell_15 = gridInst.cells[cell_0_0.x][cell_0_0.y];
            assert.deepEqual(updatedMoveTile_cell_15, moveTile_tile_15);
        });

        it("moveTile - test case 16", function (){          
            gameManagerInstance.moveTile(moveTile_tile_16, cell_1_0);
            const updatedMoveTile_cell_16 = gridInst.cells[cell_1_0.x][cell_1_0.y];
            assert.deepEqual(updatedMoveTile_cell_16, moveTile_tile_16);
        });

        it("moveTile - test case 17", function (){          
            gameManagerInstance.moveTile(moveTile_tile_17, cell_2_3);
            const updatedMoveTile_cell_17 = gridInst.cells[cell_2_3.x][cell_2_3.y];
            assert.deepEqual(updatedMoveTile_cell_17, moveTile_tile_17);
        });

        it("moveTile - test case 18", function (){          
            gameManagerInstance.moveTile(moveTile_tile_18, cell_0_0);
            const updatedMoveTile_cell_18 = gridInst.cells[cell_0_0.x][cell_0_0.y];
            assert.deepEqual(updatedMoveTile_cell_18, moveTile_tile_18);
        });

        it("moveTile - test case 19", function (){          
            gameManagerInstance.moveTile(moveTile_tile_19, cell_0_3);
            const updatedMoveTile_cell_19 = gridInst.cells[cell_0_3.x][cell_0_3.y];
            assert.deepEqual(updatedMoveTile_cell_19, moveTile_tile_19);
        });

        it("moveTile - test case 20", function (){          
            gameManagerInstance.moveTile(moveTile_tile_20, cell_3_1);
            const updatedMoveTile_cell_20 = gridInst.cells[cell_3_1.x][cell_3_1.y];
            assert.deepEqual(updatedMoveTile_cell_20, moveTile_tile_20);
        });
    }); 
    
    const vectorUp = { x: 0,  y: -1 };
    const vectorRight = { x: 1,  y: 0 };
    const vectorDown = { x: 0,  y: 1 };
    const vectorLeft = { x: -1,  y: 0 };

    describe('Tests for GameManager.buildTraversals()', () => {       
        it("test case 1 - buildTraversals - Right", function (){            
            assert.deepEqual(gameManagerInstance.buildTraversals(vectorRight),{x: [ 3, 2, 1, 0 ], y: [0, 1, 2, 3]});
        });

        it("test case 2 - buildTraversals - Down", function (){            
            assert.deepEqual(gameManagerInstance.buildTraversals(vectorDown),{x: [0, 1, 2, 3], y: [ 3, 2, 1, 0 ]});
        });

        it("test case 3 - buildTraversals - Left", function (){   
            assert.deepEqual(gameManagerInstance.buildTraversals(vectorLeft),{x: [0, 1, 2, 3], y: [0, 1, 2, 3]});
        });

        it("test case 4 - buildTraversals - Up", function (){        
            assert.deepEqual(gameManagerInstance.buildTraversals(vectorUp),{x: [0, 1, 2, 3], y: [0, 1, 2, 3]});
        });
    });

    describe('Tests for GameManager.findFarthestPosition(cell, vector)', () => {
        it("test case 1 - find farthest position - (0, 1), up", function (){
            const farthest_1 = gameManagerInstance.findFarthestPosition(cell_0_1, vectorUp);
            const far_out_1 = { farthest: { x: 0, y: 1 }, next: { x: 0, y: 0 } };
            assert.deepEqual(farthest_1, far_out_1);
        });

        it("test case 2 - find farthest position - (1, 2), up", function (){
            const farthest_2 = gameManagerInstance.findFarthestPosition(cell_1_2, vectorUp);
            const far_out_2 = { farthest: { x: 1, y: 0 }, next: { x: 1, y: -1 } };
            assert.deepEqual(farthest_2, far_out_2);
        });

        it("test case 3 - find farthest position - (2, 3), up", function (){
            const farthest_3 = gameManagerInstance.findFarthestPosition(cell_2_3, vectorUp);
            const far_out_3 = { farthest: { x: 2, y: 3 }, next: { x: 2, y: 2 } };
            console.log("testing farthest position");
            console.log(farthest_3);
            assert.deepEqual(farthest_3, far_out_3);
        });

        it("test case 4 - find farthest position - (3, 0), up", function (){
            const farthest_4 = gameManagerInstance.findFarthestPosition(cell_3_0, vectorUp);
            const far_out_4 = { farthest: { x: 3, y: 0 }, next: { x: 3, y: -1 } };
            assert.deepEqual(farthest_4, far_out_4);
        });

        it("test case 5 - find farthest position - (0, 0), right", function (){
            const farthest_5 = gameManagerInstance.findFarthestPosition(cell_0_0, vectorRight);
            const far_out_5 = { farthest: { x: 3, y: 0 }, next: { x: 4, y: 0 } };
            assert.deepEqual(farthest_5, far_out_5);
        });

        it("test case 6 - find farthest position - (1, 2), right", function (){
            const farthest_6 = gameManagerInstance.findFarthestPosition(cell_1_2, vectorRight);
            const far_out_6 = { farthest: { x: 1, y: 2 }, next: { x: 2, y: 2 } };
            assert.deepEqual(farthest_6, far_out_6);
        });

        it("test case 7 - find farthest position - (1, 1), right", function (){
            const farthest_7 = gameManagerInstance.findFarthestPosition(cell_1_1, vectorRight);
            const far_out_7 = { farthest: { x: 1, y: 1 }, next: { x: 2, y: 1 } };
            assert.deepEqual(farthest_7, far_out_7);
        });

        it("test case 8 - find farthest position - (2, 2), right", function (){
            const farthest_8 = gameManagerInstance.findFarthestPosition(cell_2_2, vectorRight);
            const far_out_8 = { farthest: { x: 3, y: 2 }, next: { x: 4, y: 2 } };
            assert.deepEqual(farthest_8, far_out_8);
        });

        it("test case 9 - find farthest position - (3, 3), right", function (){
            const farthest_9 = gameManagerInstance.findFarthestPosition(cell_3_3, vectorRight);
            const far_out_9 = { farthest: { x: 3, y: 3 }, next: { x: 4, y: 3 } };
            assert.deepEqual(farthest_9, far_out_9);
        });

        it("test case 10 - find farthest position - (0, 3), down", function (){
            const farthest_10 = gameManagerInstance.findFarthestPosition(cell_0_3, vectorDown);
            const far_out_10 = { farthest: { x: 0, y: 3 }, next: { x: 0, y: 4 } };
            assert.deepEqual(farthest_10, far_out_10);
        });

        it("test case 11 - find farthest position - (1, 0), down", function (){
            const farthest_11 = gameManagerInstance.findFarthestPosition(cell_1_0, vectorDown);
            const far_out_11 = { farthest: { x: 1, y: 1 }, next: { x: 1, y: 2 } };
            assert.deepEqual(farthest_11, far_out_11);
        });

        it("test case 12 - find farthest position - (2, 1), down", function (){
            const farthest_12 = gameManagerInstance.findFarthestPosition(cell_2_1, vectorDown);
            const far_out_12 = { farthest: { x: 2, y: 1 }, next: { x: 2, y: 2 } };
            assert.deepEqual(farthest_12, far_out_12);
        });

        it("test case 13 - find farthest position - (3, 2), down", function (){
            const farthest_13 = gameManagerInstance.findFarthestPosition(cell_3_2, vectorDown);
            const far_out_13 = { farthest: { x: 3, y: 3 }, next: { x: 3, y: 4 } };
            assert.deepEqual(farthest_13, far_out_13);
        });

        it("test case 14 - find farthest position - (0, 2), left", function (){
            const farthest_14 = gameManagerInstance.findFarthestPosition(cell_0_2, vectorLeft);
            const far_out_14 = { farthest: { x: 0, y: 2 }, next: { x: -1, y: 2 } };
            assert.deepEqual(farthest_14, far_out_14);
        });

        it("test case 15 - find farthest position - (1, 3), left", function (){
            const farthest_15 = gameManagerInstance.findFarthestPosition(cell_1_3, vectorLeft);
            const far_out_15 = { farthest: { x: 1, y: 3 }, next: { x: 0, y: 3 } };
            assert.deepEqual(farthest_15, far_out_15);
        });

        it("test case 16 - find farthest position - (2, 0), left", function (){
            const farthest_16 = gameManagerInstance.findFarthestPosition(cell_2_0, vectorLeft);
            const far_out_16 = { farthest: { x: 1, y: 0 }, next: { x: 0, y: 0 } };
            assert.deepEqual(farthest_16, far_out_16);
        });

        it("test case 17 - find farthest position - (3, 1), left", function (){
            const farthest_17 = gameManagerInstance.findFarthestPosition(cell_3_1, vectorLeft);
            const far_out_17 = { farthest: { x: 3, y: 1 }, next: { x: 2, y: 1 } };
            assert.deepEqual(farthest_17, far_out_17);
        });
    });

    describe('Tests for GameManager.positionsEqual()', () => {
        var tilePlain = new Tile({x: 0, y: 0}, 2);
        var testBool;

        it("test case 1 - positions equal - first: (1, 0), second: (3, 0)", () => {
            tilePlain.x = 3;
            tilePlain.y = 0;
            testBool = gameManagerInstance.positionsEqual(cell_1_0, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 2 - positions equal - first: (0, 1), second: (2, 1)", () => {
            tilePlain.x = 2;
            tilePlain.y = 1;
            testBool = gameManagerInstance.positionsEqual(cell_0_1, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 3 - positions equal - first: (3, 2), second: (0, 2)", () => {
            tilePlain.x = 0;
            tilePlain.y = 2;
            testBool = gameManagerInstance.positionsEqual(cell_3_2, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 4 - positions equal - first: (1, 1), second: (0, 1)", () => {
            tilePlain.x = 0;
            tilePlain.y = 1;
            testBool = gameManagerInstance.positionsEqual(cell_1_1, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 5 - positions equal - first: (1, 2), second: (2, 2)", () => {
            tilePlain.x = 2;
            tilePlain.y = 2;
            testBool = gameManagerInstance.positionsEqual(cell_1_2, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 6 - positions equal - first: (3, 3), second: (3, 3)", () => {
            tilePlain.x = 3;
            tilePlain.y = 3;
            testBool = gameManagerInstance.positionsEqual(cell_3_3, tilePlain);
            assert.equal(testBool, true);
        });

        it("test case 7 - positions equal - first: (0, 2), second: (1, 2)", () => {
            tilePlain.x = 1;
            tilePlain.y = 2;
            testBool = gameManagerInstance.positionsEqual(cell_0_2, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 8 - positions equal - first: (3, 0), second: (2, 0)", () => {
            tilePlain.x = 2;
            tilePlain.y = 0;
            testBool = gameManagerInstance.positionsEqual(cell_3_0, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 9 - positions equal - first: (0, 1), second: (3, 1)", () => {
            tilePlain.x = 3;
            tilePlain.y = 1;
            testBool = gameManagerInstance.positionsEqual(cell_0_1, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 10 - positions equal - first: (0, 3), second: (0, 3)", () => {
            tilePlain.x = 0;
            tilePlain.y = 3;
            testBool = gameManagerInstance.positionsEqual(cell_0_3, tilePlain);
            assert.equal(testBool, true);
        });

        it("test case 11 - positions equal - first: (1, 3), second: (1, 3)", () => {
            tilePlain.x = 1;
            tilePlain.y = 3;
            testBool = gameManagerInstance.positionsEqual(cell_1_3, tilePlain);
            assert.equal(testBool, true);
        });

        it("test case 12 - positions equal - first: (2, 2), second: (3, 2)", () => {
            tilePlain.x = 3;
            tilePlain.y = 2;
            testBool = gameManagerInstance.positionsEqual(cell_2_2, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 13 - positions equal - first: (3, 1), second: (1, 1)", () => {
            tilePlain.x = 1;
            tilePlain.y = 1;
            testBool = gameManagerInstance.positionsEqual(cell_0_1, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 14 - positions equal - first: (0, 0), second: (0, 0)", () => {
            tilePlain.x = 0;
            tilePlain.y = 0;
            testBool = gameManagerInstance.positionsEqual(cell_0_0, tilePlain);
            assert.equal(testBool, true);
        });

        it("test case 15 - positions equal - first: (2, 3), second: (2, 3)", () => {
            tilePlain.x = 2;
            tilePlain.y = 3;
            testBool = gameManagerInstance.positionsEqual(cell_2_3, tilePlain);
            assert.equal(testBool, true);
        });

        it("test case 16 - positions equal - first: (2, 0), second: (1, 0)", () => {
            tilePlain.x = 1;
            tilePlain.y = 0;
            testBool = gameManagerInstance.positionsEqual(cell_2_0, tilePlain);
            assert.equal(testBool, false);
        });

        it("test case 17 - positions equal - first: (2, 1), second: (0, 1)", () => {
            tilePlain.x = 0;
            tilePlain.y = 1;
            testBool = gameManagerInstance.positionsEqual(cell_2_1, tilePlain);
            assert.equal(testBool, false);
        });
    });
}

module.exports = {
    gameManagerTest:gameManagerTest
}