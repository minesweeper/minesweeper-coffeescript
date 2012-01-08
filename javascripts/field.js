(function() {

  window.Field = (function() {

    function Field(opts) {
      this.opts = opts;
    }

    Field.prototype.renderTo = function(locator) {
      $(locator).width((this.opts.cols * 16) + 20);
      $(locator).html(this.render());
      return $(locator).draggable();
    };

    Field.prototype.render = function() {
      return this.renderParent({
        field: this.renderField()
      });
    };

    Field.prototype.renderParent = function(view) {
      var template;
      template = "<div id=\"title\">\n  <span id=\"title_left\"></span>\n  <span id=\"title_right\"></span>        \n</div>\n<div id=\"outer\">\n  <div id=\"top\">\n    <div id=\"minesRemaining\">\n      <div id=\"minesRemaining100s\" class=\"lcd n0\"></div>\n      <div id=\"minesRemaining10s\" class=\"lcd n0\"></div>\n      <div id=\"minesRemaining1s\" class=\"lcd n0\"></div>\n    </div>\n    <span id=\"indicator\" class=\"statusAlive\"></span>\n    <div id=\"timer\">\n      <div id=\"timer100s\" class=\"lcd n0\"></div>\n      <div id=\"timer10s\" class=\"lcd n0\"></div>\n      <div id=\"timer1s\" class=\"lcd n0\"></div>            \n    </div>\n  </div>\n  <div id=\"bottom\">\n  {{{field}}\n  </div>\n</div>";
      return Mustache.to_html(template, view);
    };

    Field.prototype.renderField = function() {
      var col, row, template;
      template = "<table>\n{{#rows}}\n<tr class=\"field\">\n{{#cells}}\n<td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>\n{{/cells}}\n</tr>\n{{/rows}}\n</table>";
      return Mustache.to_html(template, {
        rows: (function() {
          var _ref, _results;
          _results = [];
          for (row = 0, _ref = this.opts.rows - 1; 0 <= _ref ? row <= _ref : row >= _ref; 0 <= _ref ? row++ : row--) {
            _results.push({
              cells: (function() {
                var _ref2, _results2;
                _results2 = [];
                for (col = 0, _ref2 = this.opts.cols - 1; 0 <= _ref2 ? col <= _ref2 : col >= _ref2; 0 <= _ref2 ? col++ : col--) {
                  _results2.push({
                    state: 'unclicked',
                    row: row,
                    col: col
                  });
                }
                return _results2;
              }).call(this)
            });
          }
          return _results;
        }).call(this)
      });
    };

    Field.prototype.adjacentCount = function(row, col) {
      var field, iterator;
      field = this;
      iterator = function(memo, neighbour) {
        if (field.hasMine(neighbour[0], neighbour[1])) memo += 1;
        return memo;
      };
      return _.reduce(this.neighbours(row, col), iterator, 0);
    };

    Field.prototype.neighbours = function(row, col) {
      var append, c, cols, r, result, rows, _ref, _ref2, _ref3, _ref4;
      result = [];
      rows = this.opts.rows;
      cols = this.opts.cols;
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

    Field.prototype.hasMine = function(row, col) {
      var addMine, field, randomCol, randomRow;
      if (!this.opts.mines) {
        field = this;
        this.opts.mines = [];
        randomRow = function() {
          return Math.floor(Math.random() * field.opts.rows);
        };
        randomCol = function() {
          return Math.floor(Math.random() * field.opts.cols);
        };
        addMine = function() {
          var c, r, _ref;
          _ref = [randomRow(), randomCol()], r = _ref[0], c = _ref[1];
          if (!((row === r && col === c) || field.hasMine(r, c))) {
            return field.opts.mines.push([r, c]);
          }
        };
        while (field.opts.mines.length !== field.opts.mineCount) {
          addMine();
        }
      }
      return _.any(this.opts.mines, function(mine) {
        return mine[0] === row && mine[1] === col;
      });
    };

    return Field;

  })();

}).call(this);
