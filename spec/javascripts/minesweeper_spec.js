(function() {

  describe('minesweeper', function() {
    beforeEach(function() {
      return Minesweeper.create('#jasmine_content', {
        height: 1,
        width: 1,
        mines: []
      });
    });
    it('should mark a cell on right click', function() {
      $('#r1c1').trigger({
        type: 'mouseup',
        which: 2
      });
      return expect($('#r1c1').attr('class')).toEqual('marked');
    });
    return it('should reveal a cell on left click', function() {
      $('#r1c1').trigger({
        type: 'mouseup',
        which: 1
      });
      return expect($('#r1c1').attr('class')).toEqual('clicked');
    });
  });

}).call(this);
