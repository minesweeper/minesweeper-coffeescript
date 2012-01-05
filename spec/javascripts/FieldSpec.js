(function() {

  describe('Field', function() {
    it('should render content', function() {
      var f;
      f = new Field({
        width: 1,
        height: 1
      });
      return expect(f.render()).toEqual("<table>\n  <tr>\n      <td class=\"unclicked\" id=\"r0c0\"></td>\n  </tr>\n</table>");
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
    describe('has mine', function() {
      var field;
      field = new Field({
        width: 3,
        height: 3,
        mines: [[1, 1]]
      });
      it('should find mine when there is one', function() {
        return expect(field.hasMine(1, 1)).toEqual(true);
      });
      return it('should not find a mine when there is not one', function() {
        return expect(field.hasMine(0, 0)).toEqual(false);
      });
    });
    describe('mine placement', function() {
      var field;
      field = new Field({
        width: 3,
        height: 3,
        mine_count: 1
      });
      return it('should place a mine after a call to hasMine', function() {
        expect(field.hasMine(0, 0)).toEqual(false);
        return expect(field.opts.mines.length).toEqual(1);
      });
    });
    return describe('adjacent mine count', function() {
      var expect_counts, field, given_field;
      field = null;
      given_field = function(s) {
        var lastrow, lines, mines;
        mines = [];
        lines = s.split("\n");
        lastrow = null;
        _.each(lines, function(line, row) {
          lastrow = line.split(" ");
          return _.each(lastrow, function(char, col) {
            if (char === '*') return mines.push([row, col]);
          });
        });
        return field = new Field({
          width: lastrow.length,
          height: lines.length,
          mines: mines
        });
      };
      expect_counts = function(s) {
        return _.each(s.split("\n"), function(line, row) {
          return _.each(line.split(' '), function(char, col) {
            if (char !== '-') {
              return expect(field.adjacentCount(row, col)).toEqual(parseInt(char));
            }
          });
        });
      };
      it('should determine adjacent mine count for 0 mines', function() {
        given_field(". .\n. .");
        return expect_counts("0 0\n0 0");
      });
      it('should determine adjacent mine count for 1 mines', function() {
        given_field("* .\n. .");
        return expect_counts("- 1\n1 1");
      });
      it('should determine adjacent mine count for 2 mines', function() {
        given_field("* *\n. .");
        return expect_counts("- -\n2 2");
      });
      it('should determine adjacent mine count for 3 mines', function() {
        given_field("* *\n* .");
        return expect_counts("- -\n- 3");
      });
      it('should determine adjacent mine count for 4 mines', function() {
        given_field("* * *\n* . .\n. . .");
        return expect_counts("- - -\n- 4 2\n1 1 0");
      });
      it('should determine adjacent mine count for 5 mines', function() {
        given_field("* * *\n* . .\n* . .");
        return expect_counts("- - -\n- 5 2\n- 2 0");
      });
      it('should determine adjacent mine count for 6 mines', function() {
        given_field("* * *\n* . *\n* . .");
        return expect_counts("- - -\n- 6 -\n- 3 1");
      });
      it('should determine adjacent mine count for 7 mines', function() {
        given_field("* * *\n* . *\n* . *");
        return expect_counts("- - -\n- 7 -\n- 4 -");
      });
      return it('should determine adjacent mine count for 8 mines', function() {
        given_field("* * *\n* . *\n* * *");
        return expect_counts("- - -\n- 8 -\n- - -");
      });
    });
  });

}).call(this);
