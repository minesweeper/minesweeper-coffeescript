(function() {

  $(function() {
    var locator;
    locator = '#minesweeper';
    $('#beginner').click(function() {
      return Minesweeper.create(locator, {
        height: 9,
        width: 9,
        mines: 10
      });
    });
    $('#intermediate').click(function() {
      return Minesweeper.create(locator, {
        height: 16,
        width: 16,
        mines: 40
      });
    });
    return $('#expert').click(function() {
      return Minesweeper.create(locator, {
        height: 16,
        width: 30,
        mines: 99
      });
    });
  });

}).call(this);
