describe 'GameState', ->
  field = new Field opts:
    mineCount: 0

  it 'should initially not be lost', ->
    game_state = new GameState field
    expect(game_state.lost).toEqual false

  it 'should set lost to true after call to lose', ->
    game_state = new GameState field
    game_state.lose()
    expect(game_state.lost).toEqual true
