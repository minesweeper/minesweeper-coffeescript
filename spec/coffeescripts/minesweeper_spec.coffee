describe 'minesweeper', ->
  right_click = (row, col) ->
    $("#r#{row}c#{col}").trigger type: 'mouseup', which: 2

  left_click = (row, col) ->
    $("#r#{row}c#{col}").trigger type: 'mouseup', which: 1    

  cell_state = (row, col) ->
    $("#r#{row}c#{col}").attr 'class'

  givenField = (s) ->
    mines = []
    lines = s.split "\n"
    lastrow = null
    _.each lines, (line, row) ->
      lastrow = line.split " "
      _.each lastrow, (char, col) ->
        mines.push [row, col] if char=='*'
    Minesweeper.create '#jasmine_content', width: lastrow.length, height: lines.length, mines: mines

  it 'should cycle through marked to uncertain to unclicked on right click', ->
    givenField """
    .
    """
    expect(cell_state(0 ,0)).toEqual 'unclicked'
    right_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'marked'
    right_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'uncertain'
    right_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'unclicked'

  it 'should end the game when a cell containing mine is left clicked', ->
    givenField """
    *
    """
    left_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'mine'

  it 'should reveal cell with no adjacent mines', ->
    givenField """
    .
    """
    left_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'mines0'

  it 'should reveal cell with one adjacent mine', ->
    givenField """
    . *
    """
    left_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'mines1'

  it 'should reveal cell with two adjacent mines', ->
    givenField """
    . *
    * .
    """
    left_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'mines2'

  it 'should reveal cell with three adjacent mines', ->
    givenField """
    . *
    * *
    """
    left_click 0, 0
    expect(cell_state(0 ,0)).toEqual 'mines3'

  it 'should reveal cell with four adjacent mines', ->
    givenField """
    * . *
    . * *
    """
    left_click 0, 1
    expect(cell_state(0 ,1)).toEqual 'mines4'

  it 'should reveal cell with five adjacent mines', ->
    givenField """
    * . *
    * * *
    """
    left_click 0, 1
    expect(cell_state(0 ,1)).toEqual 'mines5'

  it 'should reveal cell with six adjacent mines', ->
    givenField """
    * . .
    * . *
    * * *
    """
    left_click 1, 1
    expect(cell_state(1 ,1)).toEqual 'mines6'

  it 'should reveal cell with six adjacent mines', ->
    givenField """
    * * .
    * . *
    * * *
    """
    left_click 1, 1
    expect(cell_state(1 ,1)).toEqual 'mines7'

  it 'should reveal cell with six adjacent mines', ->
    givenField """
    * * *
    * . *
    * * *
    """
    left_click 1, 1
    expect(cell_state(1 ,1)).toEqual 'mines8'

  it 'should reveal adjacent cells when there are no adjacent mines', ->
    givenField """
    . .
    . .
    * .
    """
    left_click 0, 0
    expect(cell_state(0, 0)).toEqual 'mines0'
    expect(cell_state(0, 1)).toEqual 'mines0'
    expect(cell_state(1, 0)).toEqual 'mines1'
    expect(cell_state(1, 1)).toEqual 'mines1'
