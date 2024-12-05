function localStorageManagerTest () {
  const assert = require('assert');

  require('jsdom-global')();
  window = global.window;

  fakeStorage = {
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

  const LocalStorageManager = require("../js/local_storage_manager");

  describe('Tests for Local_storage_manager.setBestScore()', () => {
      const test_score_1 = 4;
      const test_score_2 = 16;
      const test_score_3 = 160;
      const test_score_4 = 2048;
      const test_score_5 = -1;
      const testLSM = Object.create(LocalStorageManager.prototype);

      testLSM.bestScoreKey = "bestScore";
      testLSM.gameStateKey = "gameState";
      testLSM.storage = fakeStorage;

      it("Tile.updatePosition - test case 1 - 4 ", function () {
          testLSM.setBestScore(test_score_1);
          assert.equal(test_score_1, testLSM.getBestScore());
      });
      it("Tile.updatePosition - test case 2 - 16 ", function () {
          testLSM.setBestScore(test_score_2);
          assert.equal(test_score_2, testLSM.getBestScore());
      });
      it("Tile.updatePosition - test case 3 - 160 ", function () {
          testLSM.setBestScore(test_score_3);
          assert.equal(test_score_3, testLSM.getBestScore());
      });
      it("Tile.updatePosition - test case 4 - 2048 ", function () {
          testLSM.setBestScore(test_score_4);
          assert.equal(test_score_4, testLSM.getBestScore());
      });
      it("Tile.updatePosition - test case 5 - -1 ", function () {
          testLSM.setBestScore(test_score_5);
          assert.equal(test_score_5, testLSM.getBestScore());
      });
  });

}

module.exports = {
  localStorageManagerTest:localStorageManagerTest
}
