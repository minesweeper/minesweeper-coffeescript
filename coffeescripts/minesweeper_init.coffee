$ ->
  locator = '#minesweeper'
  $('#beginner').click ->
    Minesweeper.create locator, height: 9,  width: 9,  mineCount: 10
  $('#intermediate').click ->
    Minesweeper.create locator, height: 16, width: 16, mineCount: 40
  $('#expert').click ->
    Minesweeper.create locator, height: 16, width: 30, mineCount: 99
