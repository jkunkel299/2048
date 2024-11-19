function GameManager(size, InputManager, Actuator, StorageManager) {
  this.size           = size; // Size of the grid
  this.inputManager   = new InputManager;
  this.storageManager = new StorageManager;
  this.actuator       = new Actuator;
  
  this.startTiles     = 2;

  this.inputManager.on("move", this.move.bind(this));//calls this.move when KeyboardInputManager emits "move"
  this.inputManager.on("restart", this.restart.bind(this));
  this.inputManager.on("keepPlaying", this.keepPlaying.bind(this));

  this.setup(); // constructing A new GameManager (takes place in application.js) calls its setup() function, starts at line 35
}

// Restart the game
GameManager.prototype.restart = function () {
  console.log("Jess in GameManager.restart");
  this.storageManager.clearGameState(); // clearGameState() comes from LocalStorageManager
  this.actuator.continueGame(); // Clear the game won/lost message; continueGame() comes from HTMLActuator
  this.setup();
};

// Keep playing after winning (allows going over 2048)
GameManager.prototype.keepPlaying = function () {
  console.log("Jess in GameManager.keepPlaying");
  this.keepPlaying = true;
  this.actuator.continueGame(); // Clear the game won/lost message
};

// Return true if the game is lost, or has won and the user hasn't kept playing
GameManager.prototype.isGameTerminated = function () {
  console.log("Jess in GameManager.isGameTerminated");
  return this.over || (this.won && !this.keepPlaying);
};

// Set up the game
GameManager.prototype.setup = function () {
  console.log("Jess in GameManager.setup()");
  var previousState = this.storageManager.getGameState();
  
  // Reload the game from a previous game if present
  if (previousState) {
    this.grid        = new Grid(previousState.grid.size,
                                previousState.grid.cells); // Reload grid
    this.score       = previousState.score; // comes from HTMLActuator, metadata
    this.over        = previousState.over;
    this.won         = previousState.won;
    this.keepPlaying = previousState.keepPlaying;
  } else {
    this.grid        = new Grid(this.size);
    this.score       = 0;
    this.over        = false;
    this.won         = false;
    this.keepPlaying = false;

    // Add the initial tiles
    this.addStartTiles();
  }

    // Update the actuator
  this.actuate();
};

// Set up the initial tiles to start the game with; adds 2 tiles to starting board
GameManager.prototype.addStartTiles = function () {
  console.log("Jess in GameManager.addStartTiles");
  for (var i = 0; i < this.startTiles; i++) { // this.startTiles = 2
    this.addRandomTile();
  }
};

// Adds a tile in a random position
GameManager.prototype.addRandomTile = function () { // cellsAvailable(), randomAvailableCell(), insertTile() functions come from Grid
  console.log("Jess in GameManager.addRandomTile");
  if (this.grid.cellsAvailable()) { 
    var value = Math.random() < 0.9 ? 2 : 4; // if Math.random() returns a value less than 0.9, value = 2, else value = 4
    var tile = new Tile(this.grid.randomAvailableCell(), value);

    this.grid.insertTile(tile);
  }
};

// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  console.log("Jess in GameManager.actuate");
  if (this.storageManager.getBestScore() < this.score) {
    this.storageManager.setBestScore(this.score);
  }

  // Clear the state when the game is over (game over only, not win); clearGameState() and setGameState() from LocalStorageManager
  if (this.over) {
    this.storageManager.clearGameState();
  } else {
    this.storageManager.setGameState(this.serialize());
  }

  this.actuator.actuate(this.grid, {// HTMLActuator actuate() function
    score:      this.score,
    over:       this.over,
    won:        this.won,
    bestScore:  this.storageManager.getBestScore(),
    terminated: this.isGameTerminated()
  });

};

// Represent the current game as an object
GameManager.prototype.serialize = function () {
  console.log("Jess in GameManager.serialize");
  return {
    grid:        this.grid.serialize(),
    score:       this.score,
    over:        this.over,
    won:         this.won,
    keepPlaying: this.keepPlaying
  };
};

// Save all tile positions and remove merger info
GameManager.prototype.prepareTiles = function () {
  console.log("Jess in GameManager.prepareTiles");
  this.grid.eachCell(function (x, y, tile) {
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  });
};

// Move a tile and its representation
GameManager.prototype.moveTile = function (tile, cell) {
  /* console.log("Jess in GameManager.moveTile");
  console.log("beginning of GameManager.moveTile, cell = ");
  console.log(cell);
  console.log("beginning of GameManager.moveTile, tile = "); */

  console.log(tile);
  this.grid.cells[tile.x][tile.y] = null;
  this.grid.cells[cell.x][cell.y] = tile;
  tile.updatePosition(cell);

  /* console.log("end of GameManager.moveTile, cell = ");
  console.log(cell);
  console.log("end of GameManager.moveTile, tile = ");
  console.log(tile); */
};

// Move tiles on the grid in the specified direction
GameManager.prototype.move = function (direction) {
  console.log("Jess in GameManager.move");
  // 0: up, 1: right, 2: down, 3: left
  var self = this;

  if (this.isGameTerminated()) return; // Don't do anything if the game's over

  var cell, tile;

  var vector     = this.getVector(direction);
  var traversals = this.buildTraversals(vector);
  var moved      = false;

  // Save the current tile positions and remove merger information
  this.prepareTiles();

  // Traverse the grid in the right direction and move tiles
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      cell = { x: x, y: y };
      tile = self.grid.cellContent(cell);

      if (tile) {
        var positions = self.findFarthestPosition(cell, vector);
        var next      = self.grid.cellContent(positions.next);

        // Only one merger per row traversal?
        if (next && next.value === tile.value && !next.mergedFrom) {
          var merged = new Tile(positions.next, tile.value * 2);//this is where tile values are merged
          merged.mergedFrom = [tile, next];

          self.grid.insertTile(merged);
          self.grid.removeTile(tile);

          // Converge the two tiles' positions
          tile.updatePosition(positions.next);

          // Update the score
          self.score += merged.value;

          // The mighty 2048 tile
          if (merged.value === 2048) self.won = true;
        } else {
          self.moveTile(tile, positions.farthest);//moves a tile without merging
        }

        if (!self.positionsEqual(cell, tile)) {
          moved = true; // The tile moved from its original cell!
        }
      }
    });
  });

  if (moved) {
    this.addRandomTile();

    if (!this.movesAvailable()) {
      this.over = true; // Game over!
    }

    this.actuate();
  }
};

// Get the vector representing the chosen direction
GameManager.prototype.getVector = function (direction) {
  console.log("Jess in GameManager.getVector");
  console.log(direction);
  // Vectors representing tile movement
  var map = {
    0: { x: 0,  y: -1 }, // Up
    1: { x: 1,  y: 0 },  // Right
    2: { x: 0,  y: 1 },  // Down
    3: { x: -1, y: 0 }   // Left
  };

  return map[direction]; // used as vector
};

// Build a list of positions to traverse in the right order
GameManager.prototype.buildTraversals = function (vector) {
  console.log("Jess in GameManager.buildTraversals");
  var traversals = { x: [], y: [] };

  for (var pos = 0; pos < this.size; pos++) { //size = 4
    traversals.x.push(pos);
    traversals.y.push(pos);
  }

  // Always traverse from the farthest cell in the chosen direction
  if (vector.x === 1) traversals.x = traversals.x.reverse();
  if (vector.y === 1) traversals.y = traversals.y.reverse();
  console.log(traversals);
  return traversals;
};

GameManager.prototype.findFarthestPosition = function (cell, vector) {
  //console.log("Jess in GameManager.findFarthestPosition");
  var previous;

  // Progress towards the vector direction until an obstacle is found
  do {
    previous = cell;
    cell     = { x: previous.x + vector.x, y: previous.y + vector.y };
    //console.log("Previous: ", previous, "\ncell: ", cell);
  } while (this.grid.withinBounds(cell) &&
           this.grid.cellAvailable(cell));

  return {
    farthest: previous,
    next: cell // Used to check if a merge is required
  };
};

GameManager.prototype.movesAvailable = function () {
  console.log("Jess in GameManager.movesAvailable");
  return this.grid.cellsAvailable() || this.tileMatchesAvailable();
};

// Check for available matches between tiles (more expensive check)
GameManager.prototype.tileMatchesAvailable = function () {
  console.log("Jess in GameManager.tileMatchesAvailable");
  var self = this;

  var tile;

  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      tile = this.grid.cellContent({ x: x, y: y });

      if (tile) {
        for (var direction = 0; direction < 4; direction++) {
          var vector = self.getVector(direction);
          var cell   = { x: x + vector.x, y: y + vector.y };

          var other  = self.grid.cellContent(cell);

          if (other && other.value === tile.value) {
            return true; // These two tiles can be merged
          }
        }
      }
    }
  }

  return false;
};

GameManager.prototype.positionsEqual = function (first, second) {
  console.log("Jess in GameManager.positionsEqual");
  console.log(first.x === second.x && first.y === second.y);
  return first.x === second.x && first.y === second.y;
};

module.exports = GameManager;
