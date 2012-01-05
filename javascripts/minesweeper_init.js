(function() {

  $(function() {
    var locator;
    locator = '#minesweeper';
    $('#beginner').click(function() {
      return Minesweeper.create(locator, {
        height: 9,
        width: 9,
        mineCount: 10
      });
    });
    $('#intermediate').click(function() {
      return Minesweeper.create(locator, {
        height: 16,
        width: 16,
        mineCount: 40
      });
    });
    return $('#expert').click(function() {
      return Minesweeper.create(locator, {
        height: 16,
        width: 30,
        mineCount: 99
      });
    });
  });

}).call(this);
