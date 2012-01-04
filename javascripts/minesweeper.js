(function() {

  $(function() {
    var renderField;
    renderField = function(opts) {
      return (new Field(opts)).render('#minesweeper');
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
