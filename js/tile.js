function Tile(position, value) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
  //console.log("Jess in Tile");
}

Tile.prototype.savePosition = function () {
  console.log("Jess in Tile.savePosition");
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  console.log("Jess in Tile.updatePosition");
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.serialize = function () {
  console.log("Jess in Tile.serialize");
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};

module.exports = Tile;
/* 
if (process.env.NODE_ENV === 'test') {
  module.exports = Tile;
} */