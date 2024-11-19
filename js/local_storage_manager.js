window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
  console.log("Jess in LocalStorageManager");
  console.log(window.localStorage);
}

LocalStorageManager.prototype.localStorageSupported = function () {
  console.log("Jess in LocalStorageManager.localStorageSupported");
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  console.log("Jess in LocalStorageManager.getBestScore");
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  console.log("Jess in LocalStorageManager.setBestScore");
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  console.log("Jess in LocalStorageManager.getGameState");
  var stateJSON = this.storage.getItem(this.gameStateKey);
  console.log(stateJSON);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  console.log("Jess in LocalStorageManager.setGameState");
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  console.log("Jess in LocalStorageManager.clearGameState");
  this.storage.removeItem(this.gameStateKey);
};

/* if (process.env.NODE_ENV === 'test') {
  module.exports = LocalStorageManager;
} */