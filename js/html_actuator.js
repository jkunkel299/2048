function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  console.log("Jess in HTMLActuator");
  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;
  console.log("Jess in HTMLActuator.actuate");
  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  console.log("Jess in HTMLActuator.continueGame");
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  console.log("Jess in HTMLActuator.clearContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;
  console.log("Jess in HTMLActuator..addTile");
  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
  console.log(tile.value);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  console.log("Jess in HTMLActuator.applyClasses");
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  console.log("Jess in HTMLActuator.normalizePosition");
  console.log(position);
  console.log({ x: position.x + 1, y: position.y + 1 });
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  console.log("Jess in HTMLActuator.positionClass");
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  console.log("Jess in HTMLActuator.updateScore");
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  console.log("Jess in HTMLActuator.updateBestScore");
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  console.log("Jess in HTMLActuator.message");
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
};

HTMLActuator.prototype.clearMessage = function () {
  console.log("Jess in HTMLActuator.clearMessage");
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};

/* if (process.env.NODE_ENV === 'test') {
  module.exports = HTMLActuator;
} */