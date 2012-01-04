(function() {

  $(function() {
    var renderField;
    renderField = function(opts) {
      $('#minesweeper').html((new Field(opts)).render());
      return $('.unclicked').mouseup(function(event) {
        if (event.which === 1) {
          return $(this).attr('class', 'clicked');
        } else {
          return $(this).attr('class', 'marked');
        }
      });
    };
    $('#beginner').click(function() {
      return renderField({
        height: 9,
        width: 9,
        mines: 10
      });
    });
    $('#intermediate').click(function() {
      return renderField({
        height: 16,
        width: 16,
        mines: 40
      });
    });
    return $('#expert').click(function() {
      return renderField({
        height: 16,
        width: 30,
        mines: 99
      });
    });
  });

}).call(this);
