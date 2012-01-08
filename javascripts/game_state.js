(function() {

  window.GameState = (function() {

    function GameState(field) {
      this.field = field;
      this.remaining_mines = this.field.opts.mineCount;
      this.lost = false;
    }

    GameState.prototype.lose = function() {
      return this.lost = true;
    };

    return GameState;

  })();

}).call(this);
