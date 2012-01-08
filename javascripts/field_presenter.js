(function() {
  var minesweeper_count;

  minesweeper_count = 0;

  window.FieldPresenter = {
    append: function(minesweepers_locator, opts) {
      var minesweeper_id;
      minesweeper_count += 1;
      minesweeper_id = "minesweeper" + minesweeper_count;
      $(minesweepers_locator).append("<div id=\"" + minesweeper_id + "\" class=\"minesweeper\"></div>");
      return FieldPresenter.render("#" + minesweeper_id, opts);
    },
    render: function(minesweeper_locator, opts) {
      var adjust_remaining, change_class_to, change_indicator_status_to, click_cell, current, end_game, game_state, indicator_pressed, left_clicked, marked_mouseup, remaining_mines_lcd, renderField, renderParent, reset_game, reveal_unclicked_cell, set_game, set_marked_to_uncertain, set_uncertain_to_unclicked, set_unclicked_to_marked, uncertain_mouseup, unclicked_mouseup;
      current = new Field(opts);
      remaining_mines_lcd = new Lcd('minesRemaining');
      game_state = null;
      left_clicked = function(event) {
        return event.which === 1;
      };
      change_class_to = function(id, cls) {
        return $("#" + id).attr('class', cls);
      };
      change_indicator_status_to = function(status) {
        return change_class_to('indicator', "status" + status);
      };
      click_cell = function(cell) {
        var c, r;
        r = cell[0], c = cell[1];
        return $("#r" + r + "c" + c).trigger({
          type: 'mouseup',
          which: 1
        });
      };
      end_game = function(status) {
        Timer.stop();
        return change_indicator_status_to(status);
      };
      reveal_unclicked_cell = function(element) {
        var adjacentCount, col, match, row, _ref;
        match = /r(\d+)c(\d+)/.exec(element.attr('id'));
        _ref = [parseInt(match[1]), parseInt(match[2])], row = _ref[0], col = _ref[1];
        if (current.hasMine(row, col)) {
          _.each(current.opts.mines, function(cell) {
            return click_cell(cell);
          });
          end_game('Dead');
          game_state.lose();
          return element.attr('class', 'mine');
        } else {
          if (game_state.finished) return;
          adjacentCount = current.adjacentCount(row, col);
          element.attr('class', "mines" + adjacentCount);
          game_state.reveal_cell();
          if (game_state.won) end_game('Won');
          if (adjacentCount === 0) {
            return _.each(current.neighbours(row, col), function(cell) {
              return click_cell(cell);
            });
          }
        }
      };
      adjust_remaining = function(increment) {
        game_state.remaining_mines += increment;
        return remaining_mines_lcd.display(game_state.remaining_mines);
      };
      set_unclicked_to_marked = function(element) {
        if (game_state.finished) return;
        element.attr('class', 'marked');
        element.bind('mouseup', marked_mouseup);
        return adjust_remaining(-1);
      };
      set_marked_to_uncertain = function(element) {
        if (game_state.finished) return;
        element.attr('class', 'uncertain');
        element.bind('mouseup', uncertain_mouseup);
        return adjust_remaining(1);
      };
      set_uncertain_to_unclicked = function(element) {
        if (game_state.finished) return;
        element.attr('class', 'unclicked');
        return element.bind('mouseup', unclicked_mouseup);
      };
      marked_mouseup = function(event) {
        if (!left_clicked(event)) {
          $(this).unbind(event);
          return set_marked_to_uncertain($(this));
        }
      };
      uncertain_mouseup = function(event) {
        if (!left_clicked(event)) {
          $(this).unbind(event);
          return set_uncertain_to_unclicked($(this));
        }
      };
      unclicked_mouseup = function(event) {
        if (left_clicked(event)) {
          $(this).unbind(event);
          return reveal_unclicked_cell($(this));
        } else {
          if (game_state.remaining_mines !== 0) {
            $(this).unbind(event);
            return set_unclicked_to_marked($(this));
          }
        }
      };
      indicator_pressed = function() {
        return $(this).attr('class', 'statusAlivePressed');
      };
      reset_game = function() {
        current.opts.mines = null;
        return set_game();
      };
      set_game = function() {
        $(minesweeper_locator).width((current.opts.cols * 16) + 20);
        $(minesweeper_locator).html(renderParent({
          field: renderField(current)
        }));
        $(minesweeper_locator).draggable();
        remaining_mines_lcd.display(current.opts.mineCount);
        $('.unclicked').bind('contextmenu', function() {
          return false;
        });
        $('.unclicked').bind('mouseup', unclicked_mouseup);
        $('#indicator').bind('mouseup', reset_game);
        $('#indicator').bind('mousedown', indicator_pressed);
        game_state = new GameState(current);
        return Timer.start();
      };
      renderParent = function(view) {
        var template;
        template = "<div id=\"title\">\n  <span id=\"title_left\"></span>\n  <span id=\"title_right\"></span>        \n</div>\n<div id=\"outer\">\n  <div id=\"top\">\n    <div id=\"minesRemaining\">\n      <div id=\"minesRemaining100s\" class=\"lcd n0\"></div>\n      <div id=\"minesRemaining10s\" class=\"lcd n0\"></div>\n      <div id=\"minesRemaining1s\" class=\"lcd n0\"></div>\n    </div>\n    <span id=\"indicator\" class=\"statusAlive\"></span>\n    <div id=\"timer\">\n      <div id=\"timer100s\" class=\"lcd n0\"></div>\n      <div id=\"timer10s\" class=\"lcd n0\"></div>\n      <div id=\"timer1s\" class=\"lcd n0\"></div>            \n    </div>\n  </div>\n  <div id=\"bottom\">\n  {{{field}}\n  </div>\n</div>";
        return Mustache.to_html(template, view);
      };
      renderField = function(field) {
        var col, row, template;
        template = "<table>\n{{#rows}}\n<tr class=\"field\">\n{{#cells}}\n<td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>\n{{/cells}}\n</tr>\n{{/rows}}\n</table>";
        return Mustache.to_html(template, {
          rows: (function() {
            var _ref, _results;
            _results = [];
            for (row = 0, _ref = field.opts.rows - 1; 0 <= _ref ? row <= _ref : row >= _ref; 0 <= _ref ? row++ : row--) {
              _results.push({
                cells: (function() {
                  var _ref2, _results2;
                  _results2 = [];
                  for (col = 0, _ref2 = field.opts.cols - 1; 0 <= _ref2 ? col <= _ref2 : col >= _ref2; 0 <= _ref2 ? col++ : col--) {
                    _results2.push({
                      state: 'unclicked',
                      row: row,
                      col: col
                    });
                  }
                  return _results2;
                })()
              });
            }
            return _results;
          })()
        });
      };
      return set_game();
    }
  };

}).call(this);
