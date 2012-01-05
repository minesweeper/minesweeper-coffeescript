describe 'minesweeper', ->
  it 'should add some content', ->
    field = new Field height: 9,  width: 9,  mines: 10
    $('#jasmine_content').html field.render()
    Minesweeper.say_hi()