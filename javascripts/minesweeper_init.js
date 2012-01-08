(function() {

  $(function() {
    var locator;
    locator = '#minesweeper';
    $('#beginner').click(function() {
      return Minesweeper.create(locator, {
        rows: 9,
        cols: 9,
        mineCount: 10
      });
    });
    $('#intermediate').click(function() {
      return Minesweeper.create(locator, {
        rows: 16,
        cols: 16,
        mineCount: 40
      });
    });
    $('#expert').click(function() {
      return Minesweeper.create(locator, {
        rows: 16,
        cols: 30,
        mineCount: 99
      });
    });
    return $('#intermediate').trigger('click');
  });

}).call(this);
