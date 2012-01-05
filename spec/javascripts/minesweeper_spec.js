(function() {

  describe('minesweeper', function() {
    return it('should add some content', function() {
      var field;
      field = new Field({
        height: 9,
        width: 9,
        mines: 10
      });
      $('#jasmine_content').html(field.render());
      return Minesweeper.say_hi();
    });
  });

}).call(this);
