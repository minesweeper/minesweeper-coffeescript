describe 'minesweeper', ->
  right_click = (row, col) ->
    $("#r#{row}c#{col}").trigger type: 'mouseup', which: 2

  left_click = (row, col) ->
    $("#r#{row}c#{col}").trigger type: 'mouseup', which: 1    

  cell_state = (row, col) ->
    $("#r#{row}c#{col}").attr 'class'

  describe 'without any mines', ->
    beforeEach ->
      Minesweeper.create '#jasmine_content', height: 1,  width: 1, mines: []

    it 'should cycle through marked to uncertain to unclicked on right click', ->
      expect(cell_state(0 ,0)).toEqual 'unclicked'
      right_click 0, 0
      expect(cell_state(0 ,0)).toEqual 'marked'
      right_click 0, 0
      expect(cell_state(0 ,0)).toEqual 'uncertain'
      right_click 0, 0
      expect(cell_state(0 ,0)).toEqual 'unclicked'

    it 'should reveal a cell on left click', ->
      left_click 0, 0
      expect(cell_state(0 ,0)).toEqual 'mines0'

  describe 'with a mine', ->
    beforeEach ->
      Minesweeper.create '#jasmine_content', height: 1,  width: 1, mines: [[0,0]]

    xit 'should end the game when a cell containing mine is left clicked', ->
      left_click 0, 0
      expect(cell_state(0 ,0)).toEqual 'mine'