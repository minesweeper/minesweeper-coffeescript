(function() {

  window.Field = {
    "new": function(opts) {
      var adjacentCount, hasMine, neighbours;
      this.opts = opts;
      if (!opts.rows) opts.rows = 1;
      if (!(opts.rows > 0)) opts.rows = 1;
      if (!opts.cols) opts.cols = 2;
      if (!(opts.cols > 1)) opts.cols = 2;
      if (!opts.mineCount) opts.mineCount = 1;
      if (!(opts.mineCount > 0)) opts.mineCount = 1;
      if (opts.mineCount >= opts.rows * opts.cols) {
        opts.mineCount = opts.rows * opts.cols - 1;
      }
      adjacentCount = function(row, col) {
        var field, iterator;
        field = this;
        iterator = function(memo, neighbour) {
          if (field.hasMine(neighbour[0], neighbour[1])) memo += 1;
          return memo;
        };
        return _.reduce(this.neighbours(row, col), iterator, 0);
      };
      neighbours = function(row, col) {
        var append, c, cols, r, result, rows, _ref, _ref2, _ref3, _ref4;
        result = [];
        rows = opts.rows;
        cols = opts.cols;
        append = function(r, c) {
          if (!((r === row && c === col) || r < 0 || c < 0 || r >= rows || c >= cols)) {
            return result.push([r, c]);
          }
        };
        for (r = _ref = row - 1, _ref2 = row + 1; _ref <= _ref2 ? r <= _ref2 : r >= _ref2; _ref <= _ref2 ? r++ : r--) {
          for (c = _ref3 = col - 1, _ref4 = col + 1; _ref3 <= _ref4 ? c <= _ref4 : c >= _ref4; _ref3 <= _ref4 ? c++ : c--) {
            append(r, c);
          }
        }
        return result;
      };
      hasMine = function(row, col) {
        var addMine, randomCol, randomRow;
        if (!opts.mines) {
          opts.mines = [];
          randomRow = function() {
            return Math.floor(Math.random() * opts.rows);
          };
          randomCol = function() {
            return Math.floor(Math.random() * opts.cols);
          };
          addMine = function() {
            var c, r, _ref;
            _ref = [randomRow(), randomCol()], r = _ref[0], c = _ref[1];
            if (!((row === r && col === c) || hasMine(r, c))) {
              return opts.mines.push([r, c]);
            }
          };
          while (opts.mines.length !== opts.mineCount) {
            addMine();
          }
        }
        return _.any(opts.mines, function(mine) {
          return mine[0] === row && mine[1] === col;
        });
      };
      return {
        opts: opts,
        adjacentCount: adjacentCount,
        neighbours: neighbours,
        hasMine: hasMine
      };
    }
  };

}).call(this);
