$ ->
  locator = '#minesweeper'
  $('#beginner').click ->
    Minesweeper.create locator, rows: 9,  cols: 9,  mineCount: 10
  $('#intermediate').click ->
    Minesweeper.create locator, rows: 16, cols: 16, mineCount: 40
  $('#expert').click ->
    Minesweeper.create locator, rows: 16, cols: 30, mineCount: 99
