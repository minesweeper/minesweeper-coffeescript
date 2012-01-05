describe 'minesweeper', ->
  beforeEach ->
    Minesweeper.create '#jasmine_content', height: 1,  width: 1, mines: []

  it 'should mark a cell on right click', ->
    $('#r1c1').trigger type: 'mouseup', which: 2
    expect($('#r1c1').attr 'class').toEqual 'marked'

  it 'should reveal a cell on left click', ->
    $('#r1c1').trigger type: 'mouseup', which: 1
    expect($('#r1c1').attr 'class').toEqual 'clicked'
