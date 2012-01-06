(function() {
  var current, left_clicked, marked_mouseup, minesweeper_locator, reset_game, reveal_unclicked_cell, set_marked_to_uncertain, set_uncertain_to_unclicked, set_unclicked_to_marked, uncertain_mouseup, unclicked_mouseup;

  current = null;

  minesweeper_locator = null;

  left_clicked = function(event) {
    return event.which === 1;
  };

  reveal_unclicked_cell = function(element) {
    var adjacentCount, col, match, row, _ref;
    match = /r(\d+)c(\d+)/.exec(element.attr('id'));
    _ref = [parseInt(match[1]), parseInt(match[2])], row = _ref[0], col = _ref[1];
    if (current.hasMine(row, col)) {
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

  set_unclicked_to_marked = function(element) {
    element.attr('class', 'marked');
    return element.bind('mouseup', marked_mouseup);
  };

  set_marked_to_uncertain = function(element) {
    element.attr('class', 'uncertain');
    return element.bind('mouseup', uncertain_mouseup);
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
    $(this).unbind(event);
    if (left_clicked(event)) {
      return reveal_unclicked_cell($(this));
    } else {
      return set_unclicked_to_marked($(this));
    }
  };

  reset_game = function() {
    $(minesweeper_locator).html(current.render());
    current.opts.mines = null;
    $('.unclicked').bind('contextmenu', function() {
      return false;
    });
    $('.unclicked').bind('mouseup', unclicked_mouseup);
    return $('#status').bind('mouseup', reset_game);
  };

  window.Minesweeper = {
    create: function(locator, opts) {
      minesweeper_locator = locator;
      current = new Field(opts);
      return reset_game();
    }
  };

}).call(this);
