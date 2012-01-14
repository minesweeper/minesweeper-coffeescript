describe 'GameState', ->
  game_state = null
  field = Field.new mineCount: 1, rows: 1, cols: 3

  beforeEach -> 
    game_state = new GameState field

  it 'should initialise lost to false', ->
    expect(game_state.lost).toEqual false

  it 'should initialise won to false', ->
    expect(game_state.won).toEqual false

  it 'should initialise remaining_mines to mine_count', ->
    expect(game_state.remaining_mines).toEqual 1

  it 'should initialise remaining_mines to mine_count', ->
    expect(game_state.remaining_cells).toEqual 2

  it 'should set lost to true after call to lose', ->
    game_state.lose()
    expect(game_state.lost).toEqual true

  it 'should set won to true after all cells are revealed', ->
    game_state.reveal_cell()
    expect(game_state.won).toEqual false
    game_state.reveal_cell()
    expect(game_state.won).toEqual true