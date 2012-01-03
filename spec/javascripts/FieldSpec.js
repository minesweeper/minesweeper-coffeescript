(function() {

  describe('Field', function() {
    var field;
    field = new Field(8, 15, 10);
    it('should expose width', function() {
      return expect(field.width).toEqual(8);
    });
    return it('should expose height', function() {
      return expect(field.height).toEqual(15);
    });
  });

}).call(this);
