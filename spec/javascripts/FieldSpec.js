(function() {

  describe('Field', function() {
    return it('should render content', function() {
      var f;
      f = new Field({
        width: 1,
        height: 1
      });
      return expect(f.render()).toEqual("<table>\n  <tr>\n      <td class=\"unclicked\" id=\"r1c1\"></td>\n  </tr>\n</table>");
    });
  });

}).call(this);
