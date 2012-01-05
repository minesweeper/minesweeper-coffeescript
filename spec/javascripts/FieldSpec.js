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
    return it('should determine adjacent mine count for single mine', function() {
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
  });

}).call(this);
