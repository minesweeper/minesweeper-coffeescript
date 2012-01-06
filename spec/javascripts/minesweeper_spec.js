(function() {

  describe('minesweeper', function() {
    var cell_state, cls, givenField, indicator_class, indicator_click, indicator_press, left_click, remaining_mines, right_click;
    right_click = function(row, col) {
      return $("#r" + row + "c" + col).trigger({
        type: 'mouseup',
        which: 2
      });
    };
    left_click = function(row, col) {
      return $("#r" + row + "c" + col).trigger({
        type: 'mouseup',
        which: 1
      });
    };
    indicator_press = function() {
      return $("#indicator").trigger({
        type: 'mousedown'
      });
    };
    cls = function(id) {
      return $("#" + id).attr('class');
    };
    indicator_click = function() {
      return $("#indicator").trigger({
        type: 'mouseup'
      });
    };
    indicator_class = function() {
      return cls('indicator');
    };
    cell_state = function(row, col) {
      return cls("r" + row + "c" + col);
    };
    remaining_mines = function() {
      var lcd_digit;
      lcd_digit = function(exponent) {
        var match;
        match = /lcd(\d)/.exec(cls("minesRemaining" + exponent + "s"));
        return match[1];
      };
      return parseInt("" + (lcd_digit(100)) + (lcd_digit(10)) + (lcd_digit(1)));
    };
    givenField = function(s) {
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
      return Minesweeper.create('#jasmine_content', {
        cols: lastrow.length,
        rows: lines.length,
        mines: mines,
        mineCount: mines.length
      });
    };
    it('should cycle through marked to uncertain to unclicked on right click', function() {
      givenField("*");
      expect(cell_state(0, 0)).toEqual('unclicked');
      right_click(0, 0);
      expect(cell_state(0, 0)).toEqual('marked');
      right_click(0, 0);
      expect(cell_state(0, 0)).toEqual('uncertain');
      right_click(0, 0);
      return expect(cell_state(0, 0)).toEqual('unclicked');
    });
    it('should end the game when a cell containing mine is left clicked', function() {
      givenField("*");
      left_click(0, 0);
      return expect(cell_state(0, 0)).toEqual('mine');
    });
    it('should reveal cell with no adjacent mines', function() {
      givenField(".");
      left_click(0, 0);
      return expect(cell_state(0, 0)).toEqual('mines0');
    });
    it('should reveal cell with one adjacent mine', function() {
      givenField(". *");
      left_click(0, 0);
      return expect(cell_state(0, 0)).toEqual('mines1');
    });
    it('should reveal cell with two adjacent mines', function() {
      givenField(". *\n* .");
      left_click(0, 0);
      return expect(cell_state(0, 0)).toEqual('mines2');
    });
    it('should reveal cell with three adjacent mines', function() {
      givenField(". *\n* *");
      left_click(0, 0);
      return expect(cell_state(0, 0)).toEqual('mines3');
    });
    it('should reveal cell with four adjacent mines', function() {
      givenField("* . *\n. * *");
      left_click(0, 1);
      return expect(cell_state(0, 1)).toEqual('mines4');
    });
    it('should reveal cell with five adjacent mines', function() {
      givenField("* . *\n* * *");
      left_click(0, 1);
      return expect(cell_state(0, 1)).toEqual('mines5');
    });
    it('should reveal cell with six adjacent mines', function() {
      givenField("* . .\n* . *\n* * *");
      left_click(1, 1);
      return expect(cell_state(1, 1)).toEqual('mines6');
    });
    it('should reveal cell with six adjacent mines', function() {
      givenField("* * .\n* . *\n* * *");
      left_click(1, 1);
      return expect(cell_state(1, 1)).toEqual('mines7');
    });
    it('should reveal cell with six adjacent mines', function() {
      givenField("* * *\n* . *\n* * *");
      left_click(1, 1);
      return expect(cell_state(1, 1)).toEqual('mines8');
    });
    it('should reveal adjacent cells when there are no adjacent mines', function() {
      givenField(". .\n. .\n* .");
      left_click(0, 0);
      expect(cell_state(0, 0)).toEqual('mines0');
      expect(cell_state(0, 1)).toEqual('mines0');
      expect(cell_state(1, 0)).toEqual('mines1');
      expect(cell_state(1, 1)).toEqual('mines1');
      return expect(cell_state(2, 1)).toEqual('unclicked');
    });
    it('should display depressed button when indicator button is clicked', function() {
      givenField(".");
      indicator_press();
      return expect(indicator_class()).toEqual('statusAlivePressed');
    });
    it('should reset game when indicator button is clicked', function() {
      givenField(".");
      expect(cell_state(0, 0)).toEqual('unclicked');
      left_click(0, 0);
      expect(cell_state(0, 0)).toEqual('mines0');
      indicator_click();
      return expect(cell_state(0, 0)).toEqual('unclicked');
    });
    it('should display initial mine count', function() {
      givenField("*");
      return expect(remaining_mines()).toEqual(1);
    });
    it('should decrement mine count when a mine is marked', function() {
      givenField("*");
      right_click(0, 0);
      return expect(remaining_mines()).toEqual(0);
    });
    it('should reincrement mine count when a mine is marked and then unmarked', function() {
      givenField("*");
      right_click(0, 0);
      right_click(0, 0);
      return expect(remaining_mines()).toEqual(1);
    });
    it('should ignore attempts to mark a mine when the full number of mines have been marked', function() {
      givenField("* .");
      right_click(0, 0);
      right_click(0, 1);
      return expect(remaining_mines()).toEqual(0);
    });
    it('should change game indicator to dead when a mine is clicked', function() {
      givenField("* .");
      left_click(0, 0);
      return expect(indicator_class()).toEqual('statusDead');
    });
    return it('should reveal all mines when a mine is clicked', function() {
      givenField("* * .");
      left_click(0, 0);
      return expect(cell_state(0, 1)).toEqual('mine');
    });
  });

}).call(this);
