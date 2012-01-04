(function() {

  describe('Field', function() {
    var field;
    field = new Field(8, 15, 10);
    it('should expose width', function() {
      return expect(field.width).toEqual(8);
    });
    it('should expose height', function() {
      return expect(field.height).toEqual(15);
    });
    return it('should produce game', function() {
      var game;
      game = field.generate;
      return expect(game.mines).toEqual(10);
    });
  });

}).call(this);
