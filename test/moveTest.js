function moveTest () {
    const sinon = require('sinon');
    const chai = require('chai');
    const expect = chai.expect;
    
    // importing modules
    const GameManager = require("../js/game_manager");
    const Grid = require("../js/grid");
    const Tile = require("../js/tile");
    
    // initializing the Tile constructor MockTile such that the Tile constructor does not need to be called directly in GameManager
    let MockTile;

    // Factory Function for Grid instance
    const createGrid = (size, cells) => {
        var gridInst = Object.create(Grid.prototype);
        gridInst.size = size;
        gridInst.cells = cells;
        return gridInst;
    }

    // Factory Function for GameManager instance
    const createGameManager = (size, grid) => {
        var gameManagerInst = Object.create(GameManager.prototype);
        gameManagerInst.size = size;
        // set gameManagerInstance to use default grid
        gameManagerInst.grid = grid;
        return gameManagerInst;
    }

    // initializing grid size
    const size = 4;

    // directions:
    //     0: Up
    //     1: Right
    //     2: Down
    //     3: Left

    describe("GameManager.move() unit tests - calls functions appropriately", () => { 
        /* 
            UNIT TEST: Testing that each function in the parent move function is called the appropriate number of times
            Using a grid with multiple tiles moving and merging, moving tiles to the RIGHT 
        */
        // Initialize variables
        let cellsTestsUnit;
        let gridInstTestsUnit;
        let gameManagerInstanceUnit;

        // initialize stubs for unit testing
        let isGameTerminatedStub;
        let getVectorStub;
        let buildTraversalsStub;
        let prepareTilesStub;
        let cellContentStub;
        let findFarthestPositionStub;
        let updatePositionStub;
        let addRandomStub;
        let actuateStub;
        let insertTileStub;
        let removeTileStub;
        let moveTileStub;
        let positionsEqualStub;
        let movesAvailableStub;

        // initialize variables for use in setting parameters and returns for cellContent and findFarthestPosition
        let cellContentExpectedParameters;
        let cellContentExpectedReturns;
        let cellContentTileArray;
        let findFarthestPositionParameters;
        let findFarthestPositionReturns;
        let vector;
        
        beforeEach(() => {
            // mocking the Tile constructor such that the constructor does not need to be called directly in GameManager
            MockTile = sinon.stub();
            MockTile.prototype.constructor = function(position, value) {
            this.x = position.x;
            this.y = position.y;
            this.value = value || 2;
            this.previousPosition = null;
            this.mergedFrom = null;
            };
            
            // Ensure the prototype is correctly set up for `new Tile()` to create instances
            MockTile.prototype = {
                constructor: MockTile,
            };
            
            // Set global Tile object
            global.Tile = MockTile;

            // set cell configuration for unit testing
            cellsTestsUnit =    [[null,null,null,null],
                                [new Tile({"x":1,"y":0},4),new Tile({"x":1,"y":1},64),null,null],
                                [new Tile({"x":2,"y":0},2),null,new Tile({"x":2,"y":2},2),new Tile({"x":2,"y":3},32)],
                                [new Tile({"x":3,"y":0},2),new Tile({"x":3,"y":1},4),new Tile({"x":3,"y":2},16),new Tile({"x":3,"y":3},32)]]

            // use factory function to assign Grid instance attributes
            gridInstTestsUnit = createGrid(size, cellsTestsUnit);
            // use factory function to assign GameManager instance attributes
            gameManagerInstanceUnit = createGameManager(size, gridInstTestsUnit); 

            // mock isGameTerminated from gameManagerInstanceUnit
            isGameTerminatedStub = sinon.stub(gameManagerInstanceUnit, 'isGameTerminated');

            // mock getVector from gameManagerInstanceUnit
            getVectorStub = sinon.stub(gameManagerInstanceUnit, 'getVector');
            // set return values for getVector
            getVectorStub.returns({ "x": 1, "y": 0 });

            // mock buildTraversals from gameManagerInstanceUnit
            buildTraversalsStub = sinon.stub(gameManagerInstanceUnit, 'buildTraversals');
            // set return values for buildTraversals
            buildTraversalsStub.returns({x: [ 3, 2, 1, 0 ], y: [0, 1, 2, 3]});

            // mock prepareTiles from gameManagerInstanceUnit
            prepareTilesStub = sinon.stub(gameManagerInstanceUnit, 'prepareTiles');
                   
            // mock grid.cellContent() to be able to set parameters and outputs
            cellContentStub = sinon.stub(gridInstTestsUnit, 'cellContent');
            
            // mock findFarthestPosition() to be able to set parameters and outputs
            findFarthestPositionStub = sinon.stub(gameManagerInstanceUnit, 'findFarthestPosition');

            // mock updatePosition from a Tile prototype
            updatePositionStub = sinon.stub(Tile.prototype, 'updatePosition');

            // mock addRandomTile from gameManagerInstanceUnit
            addRandomStub = sinon.stub(gameManagerInstanceUnit, 'addRandomTile');

            // mock actuate from gameManagerInstanceUnit
            actuateStub = sinon.stub(gameManagerInstanceUnit, 'actuate');

            // mock insertTile from grid instance in use
            insertTileStub = sinon.stub(gridInstTestsUnit, 'insertTile');

            // mock removeTile from grid instance in use
            removeTileStub = sinon.stub(gridInstTestsUnit, 'removeTile');

            // mock moveTile from gameManagerInstanceUnit
            moveTileStub = sinon.stub(gameManagerInstanceUnit, 'moveTile');

            // mock positionsEqual from gameManagerInstanceUnit
            positionsEqualStub = sinon.stub(gameManagerInstanceUnit, 'positionsEqual');

            // mock movesAvailable from gameManagerInstanceUnit
            movesAvailableStub = sinon.stub(gameManagerInstanceUnit, 'movesAvailable');

            // Cell Content Expected
            cellContentExpectedParameters = [
                {
                    "x": 3,
                    "y": 0
                },
                {
                    "x": 4,
                    "y": 0
                },
                {
                    "x": 3,
                    "y": 1
                },
                {
                    "x": 4,
                    "y": 1
                },
                {
                    "x": 3,
                    "y": 2
                },
                {
                    "x": 4,
                    "y": 2
                },
                {
                    "x": 3,
                    "y": 3
                },
                {
                    "x": 4,
                    "y": 3
                },
                {
                    "x": 2,
                    "y": 0
                },
                {
                    "x": 3,
                    "y": 0
                },
                {
                    "x": 2,
                    "y": 1
                },
                {
                    "x": 2,
                    "y": 2
                },
                {
                    "x": 3,
                    "y": 2
                },
                {
                    "x": 2,
                    "y": 3
                },
                {
                    "x": 3,
                    "y": 3
                },
                {
                    "x": 1,
                    "y": 0
                },
                {
                    "x": 3,
                    "y": 0
                },
                {
                    "x": 1,
                    "y": 1
                },
                {
                    "x": 3,
                    "y": 1
                },
                {
                    "x": 1,
                    "y": 2
                },
                {
                    "x": 1,
                    "y": 3
                },
                {
                    "x": 0,
                    "y": 0
                },
                {
                    "x": 0,
                    "y": 1
                },
                {
                    "x": 0,
                    "y": 2
                },
                {
                    "x": 0,
                    "y": 3
                }
            ];
            
            cellContentExpectedReturns = [
                {
                    "x": 3,
                    "y": 0,
                    "value": 2,
                    "previousPosition": {
                        "x": 3,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                null,
                {
                    "x": 3,
                    "y": 1,
                    "value": 8,
                    "previousPosition": {
                        "x": 3,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                null,
                {
                    "x": 3,
                    "y": 2,
                    "value": 16,
                    "previousPosition": {
                        "x": 3,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                null,
                {
                    "x": 3,
                    "y": 3,
                    "value": 32,
                    "previousPosition": {
                        "x": 3,
                        "y": 3
                    },
                    "mergedFrom": null
                },
                null,
                {
                    "x": 3,
                    "y": 0,
                    "value": 2,
                    "previousPosition": {
                        "x": 2,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 0,
                    "value": 2,
                    "previousPosition": {
                        "x": 3,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                null,
                {
                    "x": 2,
                    "y": 2,
                    "value": 2,
                    "previousPosition": {
                        "x": 2,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 2,
                    "value": 16,
                    "previousPosition": {
                        "x": 3,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 3,
                    "value": 32,
                    "previousPosition": {
                        "x": 2,
                        "y": 3
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 3,
                    "value": 32,
                    "previousPosition": {
                        "x": 3,
                        "y": 3
                    },
                    "mergedFrom": null
                },
                {
                    "x": 2,
                    "y": 0,
                    "value": 4,
                    "previousPosition": {
                        "x": 1,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 0,
                    "value": 4,
                    "previousPosition": null,
                    "mergedFrom": [
                        {
                            "x": 3,
                            "y": 0,
                            "value": 2,
                            "previousPosition": {
                                "x": 2,
                                "y": 0
                            },
                            "mergedFrom": null
                        },
                        {
                            "x": 3,
                            "y": 0,
                            "value": 2,
                            "previousPosition": {
                                "x": 3,
                                "y": 0
                            },
                            "mergedFrom": null
                        }
                    ]
                },
                {
                    "x": 2,
                    "y": 1,
                    "value": 64,
                    "previousPosition": {
                        "x": 1,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 1,
                    "value": 8,
                    "previousPosition": {
                        "x": 3,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                null,
                null,
                null,
                null,
                null,
                null                
            ];
            
            // making an array of Tile objects from cellContentExpectedReturns
            cellContentTileArray = [];
            for (var i = 0; i < cellContentExpectedReturns.length; i++){
                let tilePlaceholder = Object.create(Tile.prototype)
                if(cellContentExpectedReturns[i] != null){
                    tilePlaceholder.x = cellContentExpectedReturns[i].x;
                    tilePlaceholder.y = cellContentExpectedReturns[i].y;
                    tilePlaceholder.value = cellContentExpectedReturns[i].value;
                    tilePlaceholder.previousPosition = cellContentExpectedReturns[i].previousPosition;
                    tilePlaceholder.mergedFrom = cellContentExpectedReturns[i].mergedFrom;
                    cellContentTileArray.push(tilePlaceholder);                    
                } else {
                    cellContentTileArray.push(null);
                }
            }

            vector = {"x": 1, "y": 0};
            // findFarthestPosition() passed parameters
            findFarthestPositionParameters = [
                [{
                    "x": 3,
                    "y": 0
                }, vector],
                [{
                    "x": 3,
                    "y": 1
                }, vector],
                [{
                    "x": 3,
                    "y": 2
                }, vector],
                [{
                    "x": 3,
                    "y": 3
                }, vector],
                [{
                    "x": 2,
                    "y": 0
                }, vector],
                [{
                    "x": 2,
                    "y": 2
                }, vector],
                [{
                    "x": 2,
                    "y": 3
                }, vector],
                [{
                    "x": 1,
                    "y": 0
                }, vector],
                [{
                    "x": 1,
                    "y": 1
                }, vector]
            ];

            // findFarthestPosition() expected returns
            findFarthestPositionReturns = [
                {
                    "farthest": {
                        "x": 3,
                        "y": 0
                    },
                    "next": {
                        "x": 4,
                        "y": 0
                    }
                },
                {
                    "farthest": {
                        "x": 3,
                        "y": 1
                    },
                    "next": {
                        "x": 4,
                        "y": 1
                    }
                },
                {
                    "farthest": {
                        "x": 3,
                        "y": 2
                    },
                    "next": {
                        "x": 4,
                        "y": 2
                    }
                },
                {
                    "farthest": {
                        "x": 3,
                        "y": 3
                    },
                    "next": {
                        "x": 4,
                        "y": 3
                    }
                },
                {
                    "farthest": {
                        "x": 2,
                        "y": 0
                    },
                    "next": {
                        "x": 3,
                        "y": 0
                    }
                },
                {
                    "farthest": {
                        "x": 2,
                        "y": 2
                    },
                    "next": {
                        "x": 3,
                        "y": 2
                    }
                },
                {
                    "farthest": {
                        "x": 2,
                        "y": 3
                    },
                    "next": {
                        "x": 3,
                        "y": 3
                    }
                },
                {
                    "farthest": {
                        "x": 2,
                        "y": 0
                    },
                    "next": {
                        "x": 3,
                        "y": 0
                    }
                },
                {
                    "farthest": {
                        "x": 2,
                        "y": 1
                    },
                    "next": {
                        "x": 3,
                        "y": 1
                    }
                }
            ];

            // Set iterated returns for cellContent()
            for(var i = 0; i < cellContentExpectedReturns.length; i++) {
               cellContentStub.onCall(i).returns(cellContentTileArray[i]);
            }

            // Set iterated returns for findFarthestPosition()
            for(var i = 0; i < findFarthestPositionReturns.length; i++) {
               findFarthestPositionStub.onCall(i).returns(findFarthestPositionReturns[i]);
            }
        });

        afterEach(() => {
            sinon.restore();
            sinon.resetBehavior();
            // reset calls on MockTile (the Tile constructor)
            MockTile.resetHistory();
            sinon.resetHistory();
        });

        it('should set cell content and farthest position parameters and returns', () => {
            // Call function to test
            gameManagerInstanceUnit.move(1);
            
            // Check function parameters for cellContent()
            expect(cellContentStub).to.have.been.called;
            for(var i = 0; i < cellContentExpectedParameters.length; i++) {
                expect(cellContentStub.getCall(i).args[0]).to.deep.equal(cellContentExpectedParameters[i]);
            }

            // Check function parameters for findFarthestPositions()
            expect(findFarthestPositionStub).to.have.been.called;
            for (var i = 0; i < findFarthestPositionParameters.length; i++){
                expect(findFarthestPositionStub.getCall(i).args[0]).to.deep.equal(findFarthestPositionParameters[i][0]);
                expect(findFarthestPositionStub.getCall(i).args[1]).to.deep.equal(findFarthestPositionParameters[i][1]);
            }
        });

        it('should call GameManager.isGameTerminated once', () => {
            gameManagerInstanceUnit.move(1);
            expect(isGameTerminatedStub.callCount).to.equal(1);
        });

        it('should call GameManager.buildTraversals once', () => {
            gameManagerInstanceUnit.move(1);
            expect(buildTraversalsStub.callCount).to.equal(1);
        });

        it('should call GameManager.prepareTiles once', () => {
            gameManagerInstanceUnit.move(1);
            expect(prepareTilesStub.callCount).to.equal(1);
        });

        it('should call GameManager.getVector once', () => {
            gameManagerInstanceUnit.move(1);
            expect(getVectorStub.callCount).to.equal(1);
        });

        it('should call Grid.cellContent 25 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(cellContentStub.callCount).to.equal(25);
        });

        it('should call GameManager.findFarthestPosition 9 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(findFarthestPositionStub.callCount).to.equal(9);
        });

        it('should call Grid.insertTile 2 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(insertTileStub.callCount).to.equal(2);
        });

        it('should call Grid.removeTile 2 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(removeTileStub.callCount).to.equal(2);
        });
    
        it('should call Grid.updatePosition 2 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(updatePositionStub.callCount).to.equal(2);// actual is 22???
        });

        it('should call GameManager.moveTile 7 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(moveTileStub.callCount).to.equal(7);
        });

        it('should call GameManager.positionsEqual 9 times in parent GameManager.move() function', () => {
            gameManagerInstanceUnit.move(1);
            expect(positionsEqualStub.callCount).to.equal(9);
        });

        it('should call GameManager.addRandomCell once', () => {
            gameManagerInstanceUnit.move(1);
            expect(addRandomStub.callCount).to.equal(1);
        });

        it('should call GameManager.movesAvailable once', () => {
            gameManagerInstanceUnit.move(1);
            expect(movesAvailableStub.callCount).to.equal(1);
        });

        it('should call GameManager.actuate once', () => {
            gameManagerInstanceUnit.move(1);
            expect(actuateStub.callCount).to.equal(1);
        });  
    });

    describe("GameManager.move() Path Test 1 - full grid, game lost", () => {
        /* 
            INTEGRATION TEST 1: Testing the lost condition, and that the move() function stops when the game is lost
            Using a full grid to terminate game, any direction keypress 
        */
       
        // set starting cells configuration 
        const cellsTests1 = [[new Tile({"x":0,"y":0},2),new Tile({"x":0,"y":1},4),new Tile({"x":0,"y":2},128),new Tile({"x":0,"y":3},4)],
                            [new Tile({"x":1,"y":0},4),new Tile({"x":1,"y":1},8),new Tile({"x":1,"y":2},16),new Tile({"x":1,"y":3},8)],
                            [new Tile({"x":2,"y":0},8),new Tile({"x":2,"y":1},4),new Tile({"x":2,"y":2},8),new Tile({"x":2,"y":3},4)],
                            [new Tile({"x":3,"y":0},4),new Tile({"x":3,"y":1},2),new Tile({"x":3,"y":2},16),new Tile({"x":3,"y":3},2)]]

        // use factory function to assign Grid instance attributes
        const gridInstTests1 = createGrid(size, cellsTests1);

        // use factory function to assign GameManager instance attributes
        const gameManagerInstance1 = createGameManager(size, gridInstTests1);

        // set loss condition to TRUE
        gameManagerInstance1.over = true;

        it('should test game loss', () => {
            // create a spy for isGameTerminated
            const gameTerminatedSpy = sinon.spy(gameManagerInstance1, 'isGameTerminated');
            // call move() in gameManagerInstance1 
            gameManagerInstance1.move(0);
            // assert that isGameTerminated() is called one time
            expect(gameTerminatedSpy.callCount).to.equal(1);
        });
        
        it('should test that the move() function does not continue after game loss', () => {
            // create a spy for getVector
            const getVectorSpy = sinon.spy(gameManagerInstance1, 'getVector');
            // assert that the next function that would be called in move(), getVector, was not called
            expect(getVectorSpy).to.not.have.been.called;
        });
    });

    describe("GameManager.move() Path Test 2 - the coveted 2048", () => {
        /* 
            INTEGRATION TEST 2: Testing the game winning condition: the 2048 tile
            Using a grid that has two 1024 tiles and no other merging tiles, moving tiles DOWN 
        */
        let cellsTests2;
        let gameManagerInstance2;
        let gridInstTests2;
        let actuateSpy;
        
        beforeEach(()=>{
            // set starting cells configuration 
            cellsTests2 =   [[new Tile({"x":0,"y":0},256),new Tile({"x":0,"y":1},512),new Tile({"x":0,"y":2},1024),new Tile({"x":0,"y":3},1024)],
                            [new Tile({"x":1,"y":0},256),new Tile({"x":1,"y":1},128),new Tile({"x":1,"y":2},64),null],
                            [new Tile({"x":2,"y":0},8),new Tile({"x":2,"y":1},32),new Tile({"x":2,"y":2},16),null],
                            [new Tile({"x":3,"y":0},4),null,null,new Tile({"x":3,"y":3},2)]]
            
            // use factory function to assign Grid instance attributes
            gridInstTests2 = createGrid(size, cellsTests2);
            // use factory function to assign GameManager instance attributes
            gameManagerInstance2 = createGameManager(size, gridInstTests2)

            /*  
                A note on why GameManager.actuate() is stubbed for use in testing, rather than spied upon...

                The GameManager.actuate() function does not affect the grid values, it only affects metadata in the browser.
                The actuate() function and the functions it calls utilizes local storage in the window and DOM elements, 
                which are not testable in the testing framework. 
            */
            // assign actuateSpy variable to a spy
            actuateSpy = sinon.spy();
            // mock actuate from gameManagerInstance
            sinon.stub(gameManagerInstance2, 'actuate').callsFake(actuateSpy);

            MockTile.prototype.constructor.onFirstCall().returns(mergeTile1);
            MockTile.prototype.constructor.onSecondCall().returns(newRandomTile);
        });

        afterEach(() => {
            sinon.restore();
            sinon.resetBehavior();
            // reset calls on MockTile (the Tile constructor)
            MockTile.resetHistory();
            sinon.resetHistory();
        });

        // set expected cells configuration after moving DOWN
        const cellsFinal2 = [
            [
                {
                    "x": 0,
                    "y": 0,
                    "value": 2,
                    "previousPosition": null,
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 1,
                    "value": 256,
                    "previousPosition": {
                        "x": 0,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 2,
                    "value": 512,
                    "previousPosition": {
                        "x": 0,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 3,
                    "value": 2048,
                    "previousPosition": null,
                    "mergedFrom": [
                        {
                            "x": 0,
                            "y": 3,
                            "value": 1024,
                            "previousPosition": {
                                "x": 0,
                                "y": 2
                            },
                            "mergedFrom": null
                        },
                        {
                            "x": 0,
                            "y": 3,
                            "value": 1024,
                            "previousPosition": {
                                "x": 0,
                                "y": 3
                            },
                            "mergedFrom": null
                        }
                    ]
                }
            ],
            [
                null,
                {
                    "x": 1,
                    "y": 1,
                    "value": 256,
                    "previousPosition": {
                        "x": 1,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 2,
                    "value": 128,
                    "previousPosition": {
                        "x": 1,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 3,
                    "value": 64,
                    "previousPosition": {
                        "x": 1,
                        "y": 2
                    },
                    "mergedFrom": null
                }
            ],
            [
                null,
                {
                    "x": 2,
                    "y": 1,
                    "value": 8,
                    "previousPosition": {
                        "x": 2,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 2,
                    "y": 2,
                    "value": 32,
                    "previousPosition": {
                        "x": 2,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 2,
                    "y": 3,
                    "value": 16,
                    "previousPosition": {
                        "x": 2,
                        "y": 2
                    },
                    "mergedFrom": null
                }
            ],
            [
                null,
                null,
                {
                    "x": 3,
                    "y": 2,
                    "value": 4,
                    "previousPosition": {
                        "x": 3,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 3,
                    "value": 2,
                    "previousPosition": {
                        "x": 3,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ]
        ]

        // making an array of Tile objects from cellsFinal2
        let cellsFinal2TileArray = [];
        for (var i = 0; i < 4; i++){
            cellsFinal2TileArray[i] = [];
            for (var j = 0; j < 4; j++ ){
                let tilePlaceholder = Object.create(Tile.prototype)
                if(cellsFinal2[i][j] != null){
                    tilePlaceholder.x = cellsFinal2[i][j].x;
                    tilePlaceholder.y = cellsFinal2[i][j].y;
                    tilePlaceholder.value = cellsFinal2[i][j].value;
                    tilePlaceholder.previousPosition = cellsFinal2[i][j].previousPosition;
                    tilePlaceholder.mergedFrom = cellsFinal2[i][j].mergedFrom;
                    cellsFinal2TileArray[i][j] = tilePlaceholder;                    
                } else {
                    cellsFinal2TileArray[i][j] = null;
                }
            }
        }

        let mergeTile1 = new Tile({x:0,y:3},2048);
            mergeTile1.previousPosition = null;
            mergeTile1.mergedFrom = [
                {
                    "x": 0,
                    "y": 3,
                    "value": 1024,
                    "previousPosition": {
                        "x": 0,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 3,
                    "value": 1024,
                    "previousPosition": {
                        "x": 0,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ];

            let newRandomTile = new Tile({x:0,y:0},2);
            newRandomTile.previousPosition = null;
            newRandomTile.mergedFrom = null;

        it('should test 2048 tile', () => {
            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);
            
            gameManagerInstance2.move(2);
            
            expect(JSON.stringify(gameManagerInstance2.grid.cells)).to.equal(JSON.stringify(cellsFinal2TileArray))

            expect(actuateSpy.callCount).to.equal(1);

            expect(gameManagerInstance2.won).to.equal(true)
        });

        it('should call GameManager.isGameTerminated once', () => {
            // create a spy for isGameTerminated
            const isGameTerminatedSpy = sinon.spy(gameManagerInstance2, 'isGameTerminated');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);
            
            expect(isGameTerminatedSpy.callCount).to.equal(1);
        });

        it('should call GameManager.getVector once', () => {
            // create a spy for getVector
            const getVectorSpy = sinon.spy(gameManagerInstance2, 'getVector');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);
            
            expect(getVectorSpy.callCount).to.equal(1);
        });

        it('should call GameManager.buildTraversals once', () => {
            // create a spy for buildTraversals
            const buildTraversalsSpy = sinon.spy(gameManagerInstance2, 'buildTraversals');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(buildTraversalsSpy.callCount).to.equal(1);
        });

        it('should call GameManager.prepareTiles once', () => {
            // create a spy for prepareTiles
            const prepareTilesSpy = sinon.spy(gameManagerInstance2, 'prepareTiles');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);
            
            expect(prepareTilesSpy.callCount).to.equal(1);
        });

        it('should call Grid.cellContent 46 times total', () => {
            // create a spy for cellContent
            const cellContentSpy = sinon.spy(gridInstTests2, 'cellContent');   

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(cellContentSpy.callCount).to.equal(46);
        });

        it('should call GameManager.findFarthestPosition 12 times in parent GameManager.move() function', () => {
            // create a spy for findFarthestPosition
            const findFarthestPositionSpy = sinon.spy(gameManagerInstance2, 'findFarthestPosition');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(findFarthestPositionSpy.callCount).to.equal(12);
        });

        it('should call Grid.insertTile 2 times in parent GameManager.move() function', () => {
            // create a spy for insertTile
            const insertTileSpy = sinon.spy(gridInstTests2, 'insertTile');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(insertTileSpy.callCount).to.equal(2);
        });

        it('should call Grid.removeTile once in parent GameManager.move() function', () => {
            // create a spy for removeTile
            const removeTileSpy = sinon.spy(gridInstTests2, 'removeTile');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(removeTileSpy.callCount).to.equal(1);
        });

        it('should call Grid.updatePosition 12 times in parent GameManager.move() function', () => {
            // create a spy for updatePosition
            const updatePositionSpy = sinon.spy(Tile.prototype, 'updatePosition');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(updatePositionSpy.callCount).to.equal(12);
        });

        it('should call GameManager.moveTile 11 times in parent GameManager.move() function', () => {
            // create a spy for moveTile
            const moveTileSpy = sinon.spy(gameManagerInstance2, 'moveTile');
            
            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(moveTileSpy.callCount).to.equal(11);
        });

        it('should call GameManager.positionsEqual 12 times in parent GameManager.move() function', () => {
            // create a spy for positionsEqual
            const positionsEqualSpy = sinon.spy(gameManagerInstance2, 'positionsEqual');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(positionsEqualSpy.callCount).to.equal(12);
        });

        it('should call GameManager.addRandomCell once', () => {
            // create a spy for addRandomTile
            const addRandomSpy = sinon.spy(gameManagerInstance2, 'addRandomTile');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(addRandomSpy.callCount).to.equal(1);
        });

        it('should call GameManager.movesAvailable once', () => {
            // create a spy for movesAvailable
            const movesAvailableSpy = sinon.spy(gameManagerInstance2, 'movesAvailable');

            expect(gameManagerInstance2.grid).to.deep.equal(gridInstTests2);

            gameManagerInstance2.move(2);

            expect(movesAvailableSpy.callCount).to.equal(1);
        });
    });

    describe("GameManager.move() Path Test 3 - normal progression through movement loops", () => {
        /* 
            INTEGRATION TEST 3: Testing that the game moves normally through loops to check and move tiles
            Using a partially full grid with multiple tiles that move and multiple tiles that merge, moving tiles to the LEFT 
        */
        let cellsTests3;
        let gameManagerInstance3;
        let gridInstTests3;
        let actuateSpy;
        
        beforeEach(()=>{
            // set starting cells configuration 
            cellsTests3 =   [[new Tile({"x":0,"y":0},2),new Tile({"x":0,"y":1},8),new Tile({"x":0,"y":2},16),new Tile({"x":0,"y":3},128)],
                            [null,new Tile({"x":1,"y":1},4),new Tile({"x":1,"y":2},16),new Tile({"x":1,"y":3},8)],
                            [new Tile({"x":2,"y":0},2),null,new Tile({"x":2,"y":2},2),null],
                            [new Tile({"x":3,"y":0},2),null,null,null]]
            
            // use factory function to assign Grid instance attributes
            gridInstTests3 = createGrid(size, cellsTests3);
            // use factory function to assign GameManager instance attributes
            gameManagerInstance3 = createGameManager(size, gridInstTests3)

            /*  
                A note on why GameManager.actuate() is stubbed for use in testing, rather than spied upon...

                The GameManager.actuate() function does not affect the grid values, it only affects metadata in the browser.
                The actuate() function and the functions it calls utilizes local storage in the window and DOM elements, 
                which are not testable in the testing framework. 
            */
            // assign actuateSpy variable to a spy
            actuateSpy = sinon.spy();
            // mock actuate from gameManagerInstance
            sinon.stub(gameManagerInstance3, 'actuate').callsFake(actuateSpy);

            MockTile.prototype.constructor.onFirstCall().returns(path3Merge1);
            MockTile.prototype.constructor.onSecondCall().returns(path3Merge2);
            MockTile.prototype.constructor.onThirdCall().returns(path3RandomTile);
        });

        afterEach(() => {
            sinon.restore();
            sinon.resetBehavior();
            // reset calls on MockTile (the Tile constructor)
            MockTile.resetHistory();
            sinon.resetHistory();
        });

        // set expected cells configuration after moving DOWN
        const cellsFinal3 = [
            [
                {
                    "x": 0,
                    "y": 0,
                    "value": 4,
                    "previousPosition": null,
                    "mergedFrom": [
                        {
                            "x": 0,
                            "y": 0,
                            "value": 2,
                            "previousPosition": {
                                "x": 2,
                                "y": 0
                            },
                            "mergedFrom": null
                        },
                        {
                            "x": 0,
                            "y": 0,
                            "value": 2,
                            "previousPosition": {
                                "x": 0,
                                "y": 0
                            },
                            "mergedFrom": null
                        }
                    ]
                },
                {
                    "x": 0,
                    "y": 1,
                    "value": 8,
                    "previousPosition": {
                        "x": 0,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 2,
                    "value": 32,
                    "previousPosition": null,
                    "mergedFrom": [
                        {
                            "x": 0,
                            "y": 2,
                            "value": 16,
                            "previousPosition": {
                                "x": 1,
                                "y": 2
                            },
                            "mergedFrom": null
                        },
                        {
                            "x": 0,
                            "y": 2,
                            "value": 16,
                            "previousPosition": {
                                "x": 0,
                                "y": 2
                            },
                            "mergedFrom": null
                        }
                    ]
                },
                {
                    "x": 0,
                    "y": 3,
                    "value": 128,
                    "previousPosition": {
                        "x": 0,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ],
            [
                {
                    "x": 1,
                    "y": 0,
                    "value": 2,
                    "previousPosition": {
                        "x": 3,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 1,
                    "value": 4,
                    "previousPosition": {
                        "x": 1,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 2,
                    "value": 2,
                    "previousPosition": {
                        "x": 2,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 3,
                    "value": 8,
                    "previousPosition": {
                        "x": 1,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ],
            [
                null,
                null,
                null,
                null
            ],
            [
                {
                    "x": 3,
                    "y": 0,
                    "value": 2,
                    "previousPosition": null,
                    "mergedFrom": null
                },
                null,
                null,
                null
            ]
        ]

        // making an array of Tile objects from cellsFinal3
        let cellsFinal3TileArray = [];
        for (var i = 0; i < 4; i++){
            cellsFinal3TileArray[i] = [];
            for (var j = 0; j < 4; j++ ){
                let tilePlaceholder = Object.create(Tile.prototype)
                if(cellsFinal3[i][j] != null){
                    tilePlaceholder.x = cellsFinal3[i][j].x;
                    tilePlaceholder.y = cellsFinal3[i][j].y;
                    tilePlaceholder.value = cellsFinal3[i][j].value;
                    tilePlaceholder.previousPosition = cellsFinal3[i][j].previousPosition;
                    tilePlaceholder.mergedFrom = cellsFinal3[i][j].mergedFrom;
                    cellsFinal3TileArray[i][j] = tilePlaceholder;                    
                } else {
                    cellsFinal3TileArray[i][j] = null;
                }
            }
        }

        let path3Merge1 = new Tile({x:0,y:2},32);
        path3Merge1.previousPosition = null;
        path3Merge1.mergedFrom = [
            {
                "x": 0,
                "y": 2,
                "value": 16,
                "previousPosition": {
                    "x": 1,
                    "y": 2
                },
                "mergedFrom": null
            },
            {
                "x": 0,
                "y": 2,
                "value": 16,
                "previousPosition": {
                    "x": 0,
                    "y": 2
                },
                "mergedFrom": null
            }
        ];

        let path3Merge2 = new Tile({x:0,y:0},4);
        path3Merge2.previousPosition = null;
        path3Merge2.mergedFrom = [
            {
                "x": 0,
                "y": 0,
                "value": 2,
                "previousPosition": {
                    "x": 2,
                    "y": 0
                },
                "mergedFrom": null
            },
            {
                "x": 0,
                "y": 0,
                "value": 2,
                "previousPosition": {
                    "x": 0,
                    "y": 0
                },
                "mergedFrom": null
            }];

        let path3RandomTile = new Tile({x: 3, y: 0}, 2);
        path3RandomTile.previousPosition = null;
        path3RandomTile.mergedFrom = null;
          
        it('should test merging and moving tiles', () => {
            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);
            //console.log('CALLCOUNT',MockTile.callCount)
        
            gameManagerInstance3.move(3);
            // console.log('CALLCOUNT',MockTile.callCount)
            expect(JSON.stringify(gameManagerInstance3.grid.cells)).to.equal(JSON.stringify(cellsFinal3TileArray))

            expect(actuateSpy.callCount).to.equal(1);
        });

        it('should call GameManager.isGameTerminated once', () => {
            // create a spy for isGameTerminated
            const isGameTerminatedSpy = sinon.spy(gameManagerInstance3, 'isGameTerminated');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);
            
            expect(isGameTerminatedSpy.callCount).to.equal(1);
        });

        it('should call GameManager.getVector once', () => {
            // create a spy for getVector
            const getVectorSpy = sinon.spy(gameManagerInstance3, 'getVector');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);
            
            expect(getVectorSpy.callCount).to.equal(1);
        });

        it('should call GameManager.buildTraversals once', () => {
            // create a spy for buildTraversals
            const buildTraversalsSpy = sinon.spy(gameManagerInstance3, 'buildTraversals');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(buildTraversalsSpy.callCount).to.equal(1);
        });

        it('should call GameManager.prepareTiles once', () => {
            // create a spy for prepareTiles
            const prepareTilesSpy = sinon.spy(gameManagerInstance3, 'prepareTiles');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);
            
            expect(prepareTilesSpy.callCount).to.equal(1);
        });

        it('should call Grid.cellContent 36 times total', () => {
            // create a spy for cellContent
            const cellContentSpy = sinon.spy(gridInstTests3, 'cellContent');   

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(cellContentSpy.callCount).to.equal(36);
        });

        it('should call GameManager.findFarthestPosition 10 times in parent GameManager.move() function', () => {
            // create a spy for findFarthestPosition
            const findFarthestPositionSpy = sinon.spy(gameManagerInstance3, 'findFarthestPosition');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(findFarthestPositionSpy.callCount).to.equal(10);
        });

        it('should call Grid.insertTile 3 times in parent GameManager.move() function', () => {
            // create a spy for insertTile
            const insertTileSpy = sinon.spy(gridInstTests3, 'insertTile');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(insertTileSpy.callCount).to.equal(3);
        });

        it('should call Grid.removeTile 2 times in parent GameManager.move() function', () => {
            // create a spy for removeTile
            const removeTileSpy = sinon.spy(gridInstTests3, 'removeTile');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(removeTileSpy.callCount).to.equal(2);
        });

        it('should call Grid.updatePosition 10 times in parent GameManager.move() function', () => {
            // create a spy for updatePosition
            const updatePositionSpy = sinon.spy(Tile.prototype, 'updatePosition');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(updatePositionSpy.callCount).to.equal(10);
        });

        it('should call GameManager.moveTile 8 times in parent GameManager.move() function', () => {
            // create a spy for moveTile
            const moveTileSpy = sinon.spy(gameManagerInstance3, 'moveTile');
            
            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(moveTileSpy.callCount).to.equal(8);
        });

        it('should call GameManager.positionsEqual 10 times in parent GameManager.move() function', () => {
            // create a spy for positionsEqual
            const positionsEqualSpy = sinon.spy(gameManagerInstance3, 'positionsEqual');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(positionsEqualSpy.callCount).to.equal(10);
        });

        it('should call GameManager.addRandomCell once', () => {
            // create a spy for addRandomTile
            const addRandomSpy = sinon.spy(gameManagerInstance3, 'addRandomTile');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(addRandomSpy.callCount).to.equal(1);
        });

        it('should call GameManager.movesAvailable once', () => {
            // create a spy for movesAvailable
            const movesAvailableSpy = sinon.spy(gameManagerInstance3, 'movesAvailable');

            expect(gameManagerInstance3.grid).to.deep.equal(gridInstTests3);

            gameManagerInstance3.move(3);

            expect(movesAvailableSpy.callCount).to.equal(1);
        });
    });

    describe("GameManager.move() Path Test 4 - full grid, game not lost yet", () => {
        /* 
            INTEGRATION TEST 4: Testing the game winning condition: the 2048 tile as well as a full tile grid, with potential moves after winning.
            Using a full grid for which there are still moves available, which has two 1024 tiles and no other merging tiles, moving tiles UP 
        */
        let cellsTests4;
        let gameManagerInstance4;
        let gridInstTests4;
        let actuateSpy;
        
        beforeEach(()=>{
            // set starting cells configuration 
            cellsTests4 =   [[new Tile({"x":0,"y":0},1024),new Tile({"x":0,"y":1},1024),new Tile({"x":0,"y":2},512),new Tile({"x":0,"y":3},256)],
                            [new Tile({"x":1,"y":0},32),new Tile({"x":1,"y":1},64),new Tile({"x":1,"y":2},128),new Tile({"x":1,"y":3},256)],
                            [new Tile({"x":2,"y":0},32),new Tile({"x":2,"y":1},16),new Tile({"x":2,"y":2},8),new Tile({"x":2,"y":3},4)],
                            [new Tile({"x":3,"y":0},16),new Tile({"x":3,"y":1},8),new Tile({"x":3,"y":2},4),new Tile({"x":3,"y":3},2)]]
            
            // use factory function to assign Grid instance attributes
            gridInstTests4 = createGrid(size, cellsTests4);
            // use factory function to assign GameManager instance attributes
            gameManagerInstance4 = createGameManager(size, gridInstTests4)

            /*  
                A note on why GameManager.actuate() is stubbed for use in testing, rather than spied upon...

                The GameManager.actuate() function does not affect the grid values, it only affects metadata in the browser.
                The actuate() function and the functions it calls utilizes local storage in the window and DOM elements, 
                which are not testable in the testing framework. 
            */
            // assign actuateSpy variable to a spy
            actuateSpy = sinon.spy();
            // mock actuate from gameManagerInstance
            sinon.stub(gameManagerInstance4, 'actuate').callsFake(actuateSpy);

            MockTile.prototype.constructor.onFirstCall().returns(mergeTile1);
            MockTile.prototype.constructor.onSecondCall().returns(newRandomTile);
        });

        afterEach(() => {
            sinon.restore();
            sinon.resetBehavior();
            // reset calls on MockTile (the Tile constructor)
            MockTile.resetHistory();
            sinon.resetHistory();
        });

        // set expected cells configuration after moving DOWN
        const cellsFinal4 = [
            [
                {
                    "x": 0,
                    "y": 0,
                    "value": 2048,
                    "previousPosition": null,
                    "mergedFrom": [
                        {
                            "x": 0,
                            "y": 0,
                            "value": 1024,
                            "previousPosition": {
                                "x": 0,
                                "y": 1
                            },
                            "mergedFrom": null
                        },
                        {
                            "x": 0,
                            "y": 0,
                            "value": 1024,
                            "previousPosition": {
                                "x": 0,
                                "y": 0
                            },
                            "mergedFrom": null
                        }
                    ]
                },
                {
                    "x": 0,
                    "y": 1,
                    "value": 512,
                    "previousPosition": {
                        "x": 0,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 2,
                    "value": 256,
                    "previousPosition": {
                        "x": 0,
                        "y": 3
                    },
                    "mergedFrom": null
                },
                {
                    "x": 0,
                    "y": 3,
                    "value": 2,
                    "previousPosition": null,
                    "mergedFrom": null
                }
            ],
            [
                {
                    "x": 1,
                    "y": 0,
                    "value": 32,
                    "previousPosition": {
                        "x": 1,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 1,
                    "value": 64,
                    "previousPosition": {
                        "x": 1,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 2,
                    "value": 128,
                    "previousPosition": {
                        "x": 1,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 1,
                    "y": 3,
                    "value": 256,
                    "previousPosition": {
                        "x": 1,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ],
            [
                {
                    "x": 2,
                    "y": 0,
                    "value": 32,
                    "previousPosition": {
                        "x": 2,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 2,
                    "y": 1,
                    "value": 16,
                    "previousPosition": {
                        "x": 2,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 2,
                    "y": 2,
                    "value": 8,
                    "previousPosition": {
                        "x": 2,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 2,
                    "y": 3,
                    "value": 4,
                    "previousPosition": {
                        "x": 2,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ],
            [
                {
                    "x": 3,
                    "y": 0,
                    "value": 16,
                    "previousPosition": {
                        "x": 3,
                        "y": 0
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 1,
                    "value": 8,
                    "previousPosition": {
                        "x": 3,
                        "y": 1
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 2,
                    "value": 4,
                    "previousPosition": {
                        "x": 3,
                        "y": 2
                    },
                    "mergedFrom": null
                },
                {
                    "x": 3,
                    "y": 3,
                    "value": 2,
                    "previousPosition": {
                        "x": 3,
                        "y": 3
                    },
                    "mergedFrom": null
                }
            ]
        ];

        // making an array of Tile objects from cellsFinal4
        let cellsFinal4TileArray = [];
        for (var i = 0; i < 4; i++){
            cellsFinal4TileArray[i] = [];
            for (var j = 0; j < 4; j++ ){
                let tilePlaceholder = Object.create(Tile.prototype)
                if(cellsFinal4[i][j] != null){
                    tilePlaceholder.x = cellsFinal4[i][j].x;
                    tilePlaceholder.y = cellsFinal4[i][j].y;
                    tilePlaceholder.value = cellsFinal4[i][j].value;
                    tilePlaceholder.previousPosition = cellsFinal4[i][j].previousPosition;
                    tilePlaceholder.mergedFrom = cellsFinal4[i][j].mergedFrom;
                    cellsFinal4TileArray[i][j] = tilePlaceholder;                    
                } else {
                    cellsFinal4TileArray[i][j] = null;
                }
            }
        }

        let mergeTile1 = new Tile({x:0,y:0},2048);
        mergeTile1.previousPosition = null;
        mergeTile1.mergedFrom = [
            {
                "x": 0,
                "y": 0,
                "value": 1024,
                "previousPosition": {
                    "x": 0,
                    "y": 1
                },
                "mergedFrom": null
            },
            {
                "x": 0,
                "y": 0,
                "value": 1024,
                "previousPosition": {
                    "x": 0,
                    "y": 0
                },
                "mergedFrom": null
            }
        ];

        let newRandomTile = new Tile({x:0,y:3},2);
        newRandomTile.previousPosition = null;
        newRandomTile.mergedFrom = null;      
        
        it('should test merging and moving tiles', () => {
            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);
            //console.log('CALLCOUNT',MockTile.callCount)
        
            gameManagerInstance4.move(0);
            // console.log('CALLCOUNT',MockTile.callCount)
            expect(JSON.stringify(gameManagerInstance4.grid.cells)).to.equal(JSON.stringify(cellsFinal4TileArray))

            expect(actuateSpy.callCount).to.equal(1);

            expect(gameManagerInstance4.won).to.equal(true)
        });

        it('should call GameManager.isGameTerminated once', () => {
            // create a spy for isGameTerminated
            const isGameTerminatedSpy = sinon.spy(gameManagerInstance4, 'isGameTerminated');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);
            
            expect(isGameTerminatedSpy.callCount).to.equal(1);
        });

        it('should call GameManager.getVector 19 times', () => {
            // create a spy for getVector
            const getVectorSpy = sinon.spy(gameManagerInstance4, 'getVector');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);
            
            expect(getVectorSpy.callCount).to.equal(19);
        });

        it('should call GameManager.buildTraversals once', () => {
            // create a spy for buildTraversals
            const buildTraversalsSpy = sinon.spy(gameManagerInstance4, 'buildTraversals');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(buildTraversalsSpy.callCount).to.equal(1);
        });

        it('should call GameManager.prepareTiles once', () => {
            // create a spy for prepareTiles
            const prepareTilesSpy = sinon.spy(gameManagerInstance4, 'prepareTiles');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);
            
            expect(prepareTilesSpy.callCount).to.equal(1);
        });

        it('should call Grid.cellContent 69 times total', () => {
            // create a spy for cellContent
            const cellContentSpy = sinon.spy(gridInstTests4, 'cellContent');   

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(cellContentSpy.callCount).to.equal(69);
        });

        it('should call GameManager.findFarthestPosition 16 times in parent GameManager.move() function', () => {
            // create a spy for findFarthestPosition
            const findFarthestPositionSpy = sinon.spy(gameManagerInstance4, 'findFarthestPosition');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(findFarthestPositionSpy.callCount).to.equal(16);
        });

        it('should call Grid.insertTile 2 times in parent GameManager.move() function', () => {
            // create a spy for insertTile
            const insertTileSpy = sinon.spy(gridInstTests4, 'insertTile');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(insertTileSpy.callCount).to.equal(2);
        });

        it('should call Grid.removeTile once in parent GameManager.move() function', () => {
            // create a spy for removeTile
            const removeTileSpy = sinon.spy(gridInstTests4, 'removeTile');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(removeTileSpy.callCount).to.equal(1);
        });

        it('should call Grid.updatePosition 16 times in parent GameManager.move() function', () => {
            // create a spy for updatePosition
            const updatePositionSpy = sinon.spy(Tile.prototype, 'updatePosition');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(updatePositionSpy.callCount).to.equal(16);
        });

        it('should call GameManager.moveTile 15 times in parent GameManager.move() function', () => {
            // create a spy for moveTile
            const moveTileSpy = sinon.spy(gameManagerInstance4, 'moveTile');
            
            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(moveTileSpy.callCount).to.equal(15);
        });

        it('should call GameManager.positionsEqual 16 times in parent GameManager.move() function', () => {
            // create a spy for positionsEqual
            const positionsEqualSpy = sinon.spy(gameManagerInstance4, 'positionsEqual');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(positionsEqualSpy.callCount).to.equal(16);
        });

        it('should call GameManager.addRandomCell once', () => {
            // create a spy for addRandomTile
            const addRandomSpy = sinon.spy(gameManagerInstance4, 'addRandomTile');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(addRandomSpy.callCount).to.equal(1);
        });

        it('should call GameManager.movesAvailable once', () => {
            // create a spy for movesAvailable
            const movesAvailableSpy = sinon.spy(gameManagerInstance4, 'movesAvailable');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(movesAvailableSpy.callCount).to.equal(1);
        });

        it('should call GameManager.tileMatchesAvailable one time', () => {
            /* 
                tileMatchesAvailable is returned by movesAvailable because there are no open tiles.
                tileMatchesAvailable also contributes to the increased number of times getVector and cellContent 
                are called, because the 2048 game is determining which direction each tile could be moved in to 
                merge with another tile, if possible.
             */
            // create a spy for tileMatchesAvailable
            const tileMatchesAvailableSpy = sinon.spy(gameManagerInstance4, 'tileMatchesAvailable');

            expect(gameManagerInstance4.grid).to.deep.equal(gridInstTests4);

            gameManagerInstance4.move(0);

            expect(tileMatchesAvailableSpy.callCount).to.equal(1);
        })
    });
}

module.exports = {
    moveTest:moveTest
}

/* Added to local_storage_manager.js for testing:
    var stateJSON =   {"grid":{"size":4,
                    "cells":[[{"position":{"x":0,"y":0},"value":256},{"position":{"x":0,"y":1},"value":512},{"position":{"x":0,"y":2},"value":1024},{"position":{"x":0,"y":3},"value":1024}],
                            [{"position":{"x":1,"y":0},"value":256},{"position":{"x":1,"y":1},"value":128},{"position":{"x":1,"y":2},"value":64},null],
                            [{"position":{"x":2,"y":0},"value":8},{"position":{"x":2,"y":1},"value":32},{"position":{"x":2,"y":2},"value":16},null],
                            [{"position":{"x":3,"y":0},"value":4},null,null,{"position":{"x":3,"y":3},"value":2}]]},
                    "score":20088,
                    "over":false,
                    "won":false,
                    "keepPlaying":false};
    return stateJSON;
*/