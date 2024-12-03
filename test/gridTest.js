function gridTest (){
    const assert = require('assert');

    const Grid = require("../js/grid");

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
}

module.exports = {
    gridTest:gridTest
}