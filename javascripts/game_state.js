(function() {

  window.GameState = (function() {

    function GameState(field) {
      this.field = field;
      this.remaining_mines = field.opts.mineCount;
      this.remaining_cells = field.opts.rows * field.opts.cols - field.opts.mineCount;
      this.lost = false;
      this.won = false;
    }

    GameState.prototype.lose = function() {
      return this.lost = true;
    };

    GameState.prototype.reveal_cell = function() {
      this.remaining_cells -= 1;
      if (this.remaining_cells < 1) return this.won = true;
    };

    GameState.prototype.finished = function() {
      return this.won || this.lost;
    };

    return GameState;

  })();

}).call(this);
