(function() {

  describe('minesweeper', function() {
    var cell_state, left_click, right_click;
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
    cell_state = function(row, col) {
      return $("#r" + row + "c" + col).attr('class');
    };
    describe('without any mines', function() {
      beforeEach(function() {
        return Minesweeper.create('#jasmine_content', {
          height: 1,
          width: 1,
          mines: []
        });
      });
      it('should mark a cell on right click', function() {
        right_click(0, 0);
        return expect(cell_state(0, 0)).toEqual('marked');
      });
      return it('should reveal a cell on left click', function() {
        left_click(0, 0);
        return expect(cell_state(0, 0)).toEqual('clicked');
      });
    });
    return describe('with a mine', function() {
      beforeEach(function() {
        return Minesweeper.create('#jasmine_content', {
          height: 1,
          width: 1,
          mines: [[0, 0]]
        });
      });
      return it('should end the game when a cell containing mine is left clicked', function() {});
    });
  });

}).call(this);
