(function() {
  var adjust_remaining, change_class_to, change_indicator_status_to, current, indicator_pressed, left_clicked, marked_mouseup, minesweeper_locator, remaining_mines, remaining_mines_lcd, reset_game, reveal_unclicked_cell, set_game, set_marked_to_uncertain, set_uncertain_to_unclicked, set_unclicked_to_marked, uncertain_mouseup, unclicked_mouseup;

  current = null;

  minesweeper_locator = null;

  remaining_mines_lcd = new Lcd('minesRemaining');

  remaining_mines = null;

  left_clicked = function(event) {
    return event.which === 1;
  };

  change_class_to = function(id, cls) {
    return $("#" + id).attr('class', cls);
  };

  change_indicator_status_to = function(status) {
    return change_class_to('indicator', "status" + status);
  };

  reveal_unclicked_cell = function(element) {
    var adjacentCount, col, match, row, _ref;
    match = /r(\d+)c(\d+)/.exec(element.attr('id'));
    _ref = [parseInt(match[1]), parseInt(match[2])], row = _ref[0], col = _ref[1];
    if (current.hasMine(row, col)) {
      change_indicator_status_to('Dead');
      Timer.stop();
      return element.attr('class', 'mine');
    } else {
      adjacentCount = current.adjacentCount(row, col);
      element.attr('class', "mines" + adjacentCount);
      if (adjacentCount === 0) {
        return _.each(current.neighbours(row, col), function(cell) {
          var c, r;
          r = cell[0], c = cell[1];
          return $("#r" + r + "c" + c).trigger({
            type: 'mouseup',
            which: 1
          });
        });
      }
    }
  };

  adjust_remaining = function(increment) {
    remaining_mines += increment;
    return remaining_mines_lcd.display(remaining_mines);
  };

  set_unclicked_to_marked = function(element) {
    element.attr('class', 'marked');
    element.bind('mouseup', marked_mouseup);
    return adjust_remaining(-1);
  };

  set_marked_to_uncertain = function(element) {
    element.attr('class', 'uncertain');
    element.bind('mouseup', uncertain_mouseup);
    return adjust_remaining(1);
  };

  set_uncertain_to_unclicked = function(element) {
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
      if (remaining_mines !== 0) {
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
    $(minesweeper_locator).html(current.render());
    remaining_mines_lcd.display(current.opts.mineCount);
    $('.unclicked').bind('contextmenu', function() {
      return false;
    });
    $('.unclicked').bind('mouseup', unclicked_mouseup);
    $('#indicator').bind('mouseup', reset_game);
    $('#indicator').bind('mousedown', indicator_pressed);
    remaining_mines = current.opts.mineCount;
    return Timer.start();
  };

  window.Minesweeper = {
    create: function(locator, opts) {
      minesweeper_locator = locator;
      current = new Field(opts);
      return set_game();
    }
  };

}).call(this);
