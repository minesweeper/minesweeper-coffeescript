(function() {

  window.Field = (function() {

    function Field(opts) {
      this.opts = opts;
    }

    Field.prototype.render = function() {
      var col, row, template;
      template = "<table>\n{{#rows}}\n  <tr>\n  {{#cells}}\n    <td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>\n  {{/cells}}\n  </tr>\n{{/rows}}\n</table>";
      return Mustache.to_html(template, {
        rows: (function() {
          var _ref, _results;
          _results = [];
          for (col = 0, _ref = this.opts.height - 1; 0 <= _ref ? col <= _ref : col >= _ref; 0 <= _ref ? col++ : col--) {
            _results.push({
              cells: (function() {
                var _ref2, _results2;
                _results2 = [];
                for (row = 0, _ref2 = this.opts.width - 1; 0 <= _ref2 ? row <= _ref2 : row >= _ref2; 0 <= _ref2 ? row++ : row--) {
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
      var append, c, height, r, result, width, _ref, _ref2, _ref3, _ref4;
      result = [];
      height = this.opts.height;
      width = this.opts.width;
      append = function(r, c) {
        if (!((r === row && c === col) || r < 0 || c < 0 || r >= height || c >= width)) {
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
      var addMine, field, randomIndex;
      if (!this.opts.mines) {
        field = this;
        this.opts.mines = [];
        randomIndex = function(max) {
          return Math.floor(Math.random() * max);
        };
        addMine = function() {
          var c, r;
          r = randomIndex(field.opts.height);
          c = randomIndex(field.opts.width);
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
