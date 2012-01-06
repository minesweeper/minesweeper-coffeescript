(function() {

  window.Field = (function() {

    function Field(opts) {
      this.opts = opts;
    }

    Field.prototype.render = function() {
      return this.renderBorder("light lightest light") + this.renderTitleBar() + this.renderSeparator('t') + this.renderControlPanel() + this.renderSeparator('m') + this.renderField() + this.renderSeparator('b') + this.renderBorder("light dark darkest");
    };

    Field.prototype.renderTemplate = function(template, view) {
      var partials;
      partials = {
        leader: "<td class=\"light stripe\" />\n<td class=\"lightest stripe\" />\n<td class=\"light stripe\" />",
        trailer: "<td class=\"light stripe\" />\n<td class=\"dark stripe\" />\n<td class=\"darkest stripe\" />"
      };
      return Mustache.to_html(template, view, partials);
    };

    Field.prototype.renderBorder = function(classes) {
      var template, width;
      template = "<table>\n{{#classes}}\n<tr class=\"border\">\n<td class=\"{{.}}\" width=\"{{width}}\"></td>\n</tr>\n{{/classes}}\n</table>";
      width = (this.opts.cols * 16) + 30;
      return Mustache.to_html(template, {
        width: width,
        twidth: width + 6,
        classes: classes.split(' ')
      });
    };

    Field.prototype.renderTitleBar = function() {
      var gap, template;
      template = "<table>\n<tr class=\"title_bar\">\n{{>leader}}\n<td class=\"title\" />\n<td class=\"gap\" width=\"{{width}}\" />\n<td class=\"buttons\" />\n{{>trailer}}\n</tr>\n</table>";
      gap = this.opts.cols * 16 + 24;
      gap -= 94;
      gap -= 52;
      return this.renderTemplate(template, {
        width: gap
      });
    };

    Field.prototype.renderSeparator = function(position) {
      var template;
      template = "<table>\n<tr class=\"separator\">\n{{>leader}}\n<td class=\"edge ml\"></td>\n<td class=\"separator\" width=\"{{width}}\"></td>\n<td class=\"edge mr\"\"></td>\n{{>trailer}}\n</tr>\n</table>";
      return this.renderTemplate(template, {
        position: position,
        width: this.opts.cols * 16
      });
    };

    Field.prototype.renderLcd = function(id) {
      var template;
      template = "<td class=\"lcd n0\" id=\"{{id}}100s\" />\n<td class=\"lcd n0\" id=\"{{id}}10s\" />\n<td class=\"lcd n0\" id=\"{{id}}1s\" />";
      return Mustache.to_html(template, {
        id: id
      });
    };

    Field.prototype.renderControlPanel = function() {
      var gap, template;
      template = "<table>\n<tr class=\"control_panel\">\n{{>leader}}\n<td class=\"field_side\" />\n{{{lcdMinesRemaining}}}\n<td class=\"gap\" width=\"{{width}}\" />\n<td id=\"indicator\" class=\"statusAlive\" />\n<td class=\"gap\" width=\"{{width}}\" />\n{{{lcdTimer}}}\n<td class=\"field_side\" />\n{{>trailer}}\n</tr>\n</table>";
      gap = this.opts.cols * 8;
      gap -= 3 * 14;
      gap -= 17;
      return this.renderTemplate(template, {
        lcdMinesRemaining: this.renderLcd('minesRemaining'),
        lcdTimer: this.renderLcd('timer'),
        width: gap
      });
    };

    Field.prototype.renderField = function() {
      var col, row, template;
      template = "<table>\n{{#rows}}\n<tr class=\"field\">\n{{>leader}}\n<td class=\"field_side\" />\n{{#cells}}\n<td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>\n{{/cells}}\n<td class=\"field_side\" />\n{{>trailer}}\n</tr>\n{{/rows}}\n</table>";
      return this.renderTemplate(template, {
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
