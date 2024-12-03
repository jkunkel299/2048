const gameManagerTests = require("./gameManagerTest.js");
const gridTests = require("./gridTest.js");
const moveTest = require('./moveTest.js');

describe("Run tests", function(){
    gameManagerTests.gameManagerTest();
    gridTests.gridTest();
    moveTest.moveTest();
});