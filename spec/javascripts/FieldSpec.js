(function() {

  describe('Field', function() {
    it('should render content', function() {
      var f;
      f = new Field({
        width: 1,
        height: 1
      });
      return expect(f.render()).toEqual("<table>\n  <tr>\n      <td class=\"unclicked\" id=\"r1c1\"></td>\n  </tr>\n</table>");
    });
    describe('neighbours', function() {
      var field;
      field = new Field({
        width: 3,
        height: 3
      });
      it('should determine neighbours for middle', function() {
        return expect(field.neighbours(1, 1)).toEqual([[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]);
      });
      it('should determine neighbours for top left', function() {
        return expect(field.neighbours(0, 0)).toEqual([[0, 1], [1, 0], [1, 1]]);
      });
      return it('should determine neighbours for bottom right', function() {
        return expect(field.neighbours(2, 2)).toEqual([[1, 1], [1, 2], [2, 1]]);
      });
    });
    it('should determine adjacent mine count for single mine', function() {
      var f;
      f = new Field({
        width: 2,
        height: 2,
        mines: [[0, 0]]
      });
      expect(f.adjacentCount(1, 1)).toEqual(1);
      expect(f.adjacentCount(0, 1)).toEqual(1);
      return expect(f.adjacentCount(1, 0)).toEqual(1);
    });
    return it('should determine adjacent mine count for 2 mines', function() {
      var f;
      f = new Field({
        width: 2,
        height: 2,
        mines: [[0, 0], [1, 0]]
      });
      expect(f.adjacentCount(1, 1)).toEqual(2);
      return expect(f.adjacentCount(0, 1)).toEqual(2);
    });
  });

}).call(this);
