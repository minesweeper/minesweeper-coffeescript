(function() {

  $(function() {
    $('#beginner').click(function() {
      return (new Field({
        height: 9,
        width: 9,
        mines: 10
      })).render('#minesweeper');
    });
    $('#intermediate').click(function() {
      return (new Field({
        height: 16,
        width: 16,
        mines: 40
      })).render('#minesweeper');
    });
    return $('#expert').click(function() {
      return (new Field({
        height: 16,
        width: 30,
        mines: 99
      })).render('#minesweeper');
    });
  });

}).call(this);
