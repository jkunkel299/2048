const gameManagerTests = require("./gameManagerTest.js");
const gridTests = require("./gridTest.js");
const moveTest = require("./moveTest.js");
const tileTest = require("./TileTest.js");
const HTMLActuatorTest = require("./HTMLActuatorTest.js");
const localStorageTest = require("./LSMTest.js");

describe("Run tests", function(){
    // gameManagerTests.gameManagerTest();
    // gridTests.gridTest();
    // moveTest.moveTest();
    // tileTest.tileTest();
    HTMLActuatorTest.HTMLActuatorTest();
    // localStorageTest.localStorageManagerTest();
});