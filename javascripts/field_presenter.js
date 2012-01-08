(function() {
  var minesweeper_count;

  minesweeper_count = 0;

  window.FieldPresenter = {
    append: function(minesweepers_locator, opts) {
      var minesweeper_id;
      minesweeper_count += 1;
      minesweeper_id = "minesweeper" + minesweeper_count;
      $(minesweepers_locator).append("<div id=\"" + minesweeper_id + "\" class=\"minesweeper\"></div>");
      return FieldPresenter.render("#" + minesweeper_id, opts, minesweeper_count);
    },
    render: function(minesweeper_locator, opts, index) {
      var adjust_remaining, change_class_to, change_indicator_status_to, click_cell, current, end_game, game_state, id, indicator_pressed, left_clicked, marked_mouseup, remaining_mines_lcd, renderField, renderParent, reset_game, reveal_unclicked_cell, selector, set_game, set_marked_to_uncertain, set_uncertain_to_unclicked, set_unclicked_to_marked, timer, uncertain_mouseup, unclicked_mouseup;
      if (index == null) index = 1;
      id = function(name) {
        return "g" + index + name;
      };
      selector = function(name) {
        return "#" + (id(name));
      };
      current = new Field(opts);
      remaining_mines_lcd = new Lcd(id('minesRemaining'));
      game_state = null;
      timer = Timer.create(id('timer'));
      left_clicked = function(event) {
        return event.which === 1;
      };
      change_class_to = function(id, cls) {
        return $(selector(id)).attr('class', cls);
      };
      change_indicator_status_to = function(status) {
        return change_class_to('indicator', "status " + status);
      };
      click_cell = function(cell) {
        var c, r;
        r = cell[0], c = cell[1];
        return $(selector("r" + r + "c" + c)).trigger({
          type: 'mouseup',
          which: 1
        });
      };
      end_game = function(status) {
        timer.stop();
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
          end_game('dead');
          game_state.lose();
          return element.attr('class', 'mine');
        } else {
          if (game_state.finished()) return;
          adjacentCount = current.adjacentCount(row, col);
          element.attr('class', "mines" + adjacentCount);
          game_state.reveal_cell();
          if (game_state.won) end_game('won');
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
        if (game_state.finished()) return;
        element.attr('class', 'marked');
        element.bind('mouseup', marked_mouseup);
        return adjust_remaining(-1);
      };
      set_marked_to_uncertain = function(element) {
        if (game_state.finished()) return;
        element.attr('class', 'uncertain');
        element.bind('mouseup', uncertain_mouseup);
        return adjust_remaining(1);
      };
      set_uncertain_to_unclicked = function(element) {
        if (game_state.finished()) return;
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
          if (game_state.finished()) return;
          return reveal_unclicked_cell($(this));
        } else {
          if (game_state.remaining_mines !== 0) {
            $(this).unbind(event);
            return set_unclicked_to_marked($(this));
          }
        }
      };
      indicator_pressed = function() {
        return $(this).attr('class', 'status alivePressed');
      };
      reset_game = function() {
        current.opts.mines = null;
        return set_game();
      };
      set_game = function() {
        var count;
        count = current.opts.cols;
        if (count < 8) count = 8;
        $(minesweeper_locator).width((count * 16) + 20);
        $(minesweeper_locator).html(renderParent({
          field: renderField(current)
        }));
        $(minesweeper_locator).draggable();
        remaining_mines_lcd.display(current.opts.mineCount);
        $("#g" + index + " .unclicked").bind('contextmenu', function() {
          return false;
        });
        $("#g" + index + " .unclicked").bind('mouseup', unclicked_mouseup);
        $("#g" + index + "indicator").bind('mouseup', reset_game);
        $("#g" + index + "indicator").bind('mousedown', indicator_pressed);
        game_state = new GameState(current);
        return timer.start();
      };
      renderParent = function(view) {
        var template;
        template = "<div class=\"title\">\n  <span class=\"title_left\"></span>\n  <span class=\"title_right\"></span>        \n</div>\n<div class=\"outer\">\n  <div class=\"top\">\n    <div class=\"minesRemaining\">\n      <div id=\"g" + index + "minesRemaining100s\" class=\"lcd n0\"></div>\n      <div id=\"g" + index + "minesRemaining10s\" class=\"lcd n0\"></div>\n      <div id=\"g" + index + "minesRemaining1s\" class=\"lcd n0\"></div>\n    </div>\n    <span id=\"g" + index + "indicator{{index}}\" class=\"status alive\"></span>\n    <div class=\"timer\">\n      <div id=\"g" + index + "timer100s\" class=\"lcd n0\"></div>\n      <div id=\"g" + index + "timer10s\" class=\"lcd n0\"></div>\n      <div id=\"g" + index + "timer1s\" class=\"lcd n0\"></div>            \n    </div>\n  </div>\n  <div id=\"g" + index + "\" class=\"bottom\">\n  {{{field}}\n  </div>\n</div>";
        return Mustache.to_html(template, view);
      };
      renderField = function(field) {
        var col, row, template;
        template = "<table>\n{{#rows}}\n<tr class=\"field\">\n{{#cells}}\n<td class=\"{{state}}\" id=\"g" + index + "r{{row}}c{{col}}\"></td>\n{{/cells}}\n</tr>\n{{/rows}}\n</table>";
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
