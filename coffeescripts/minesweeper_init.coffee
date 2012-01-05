$ ->
  locator = '#minesweeper'
  $('#beginner').click ->
    Minesweeper.create locator, height: 9,  width: 9,  mines: 10
  $('#intermediate').click ->
    Minesweeper.create locator, height: 16, width: 16, mines: 40
  $('#expert').click ->
    Minesweeper.create locator, height: 16, width: 30, mines: 99
