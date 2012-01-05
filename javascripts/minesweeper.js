(function() {
  var current, left_clicked, marked_mouseup, reveal_unclicked_cell, set_marked_to_uncertain, set_uncertain_to_unclicked, set_unclicked_to_marked, uncertain_mouseup, unclicked_mouseup;

  current = null;

  left_clicked = function(event) {
    return event.which === 1;
  };

  reveal_unclicked_cell = function(element) {
    return element.attr('class', 'mines0');
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

  window.Minesweeper = {
    create: function(locator, opts) {
      current = new Field(opts);
      $(locator).html(current.render());
      $('.unclicked').bind('contextmenu', function() {
        return false;
      });
      return $('.unclicked').bind('mouseup', unclicked_mouseup);
    }
  };

}).call(this);
