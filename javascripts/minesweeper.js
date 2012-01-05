(function() {
  var current, marked_mouseup, unclicked_mouseup;

  current = null;

  marked_mouseup = function(event) {
    if (event.which !== 1) return $(this).attr('class', 'marked');
  };

  unclicked_mouseup = function(event) {
    $(this).unbind(event);
    if (event.which === 1) {
      return $(this).attr('class', 'empty');
    } else {
      $(this).attr('class', 'marked');
      return $(this).bind('mouseup', marked_mouseup);
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
