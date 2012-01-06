describe 'minesweeper', ->
  right_click = (row, col) ->
    $("#r#{row}c#{col}").trigger type: 'mouseup', which: 2

  left_click = (row, col) ->
    $("#r#{row}c#{col}").trigger type: 'mouseup', which: 1    

  click_status = ->
    $("#status").trigger type: 'mouseup'

  cell_state = (row, col) -> $("#r#{row}c#{col}").attr 'class'

  remaining_mines = ->
    lcd_digit = (exponent) ->
      match = /lcd(\d)/.exec $("#minesRemaining#{exponent}s").attr 'class'
      match[1]
    parseInt "#{lcd_digit 100}#{lcd_digit 10}#{lcd_digit 1}"

  givenField = (s) ->
    mines = []
    lines = s.split "\n"
    lastrow = null
    _.each lines, (line, row) ->
      lastrow = line.split " "
      _.each lastrow, (char, col) ->
        mines.push [row, col] if char=='*'
    Minesweeper.create '#jasmine_content', cols: lastrow.length, rows: lines.length, mines: mines, mineCount: mines.length

  it 'should cycle through marked to uncertain to unclicked on right click', ->
    givenField """
    *
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
    expect(cell_state(2, 1)).toEqual 'unclicked'

  it 'should reset game when status button is clicked', ->
    givenField """
    .
    """
    expect(cell_state(0, 0)).toEqual 'unclicked'
    left_click 0, 0
    expect(cell_state(0, 0)).toEqual 'mines0'
    click_status()
    expect(cell_state(0, 0)).toEqual 'unclicked'

  it 'should display initial mine count', ->
    givenField """
    *
    """
    expect(remaining_mines()).toEqual 1
  
  it 'should decrement mine count when a mine is marked', ->
    givenField """
    *
    """
    right_click 0, 0
    expect(remaining_mines()).toEqual 0

  it 'should reincrement mine count when a mine is marked and then unmarked', ->
    givenField """
    *
    """
    right_click 0, 0
    right_click 0, 0
    expect(remaining_mines()).toEqual 1

  it 'should ignore attempts to mark a mine when the full number of mines have been marked', ->
    givenField """
    * .
    """
    right_click 0, 0
    right_click 0, 1
    expect(remaining_mines()).toEqual 0