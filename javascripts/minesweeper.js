(function() {
  var current;

  current = null;

  window.Minesweeper = {
    create: function(locator, opts) {
      current = new Field(opts);
      $(locator).html(current.render());
      $('.unclicked').bind('contextmenu', function() {
        return false;
      });
      return $('.unclicked').mouseup(function(event) {
        if (event.which === 1) {
          return $(this).attr('class', 'clicked');
        } else {
          return $(this).attr('class', 'marked');
        }
      });
    }
  };

}).call(this);
