(function() {

  describe('GameState', function() {
    var field;
    field = new Field({
      opts: {
        mineCount: 0
      }
    });
    it('should initially not be lost', function() {
      var game_state;
      game_state = new GameState(field);
      return expect(game_state.lost).toEqual(false);
    });
    return it('should set lost to true after call to lose', function() {
      var game_state;
      game_state = new GameState(field);
      game_state.lose();
      return expect(game_state.lost).toEqual(true);
    });
  });

}).call(this);
