current = null
minesweeper_locator = null
remaining_mines_lcd = new Lcd 'minesRemaining'
remaining_mines = null

left_clicked = (event) ->
  event.which == 1

reveal_unclicked_cell = (element) ->
  match = /r(\d+)c(\d+)/.exec element.attr 'id'
  [row,col] = [parseInt(match[1]),parseInt(match[2])]
  if current.hasMine(row, col)
    element.attr 'class', 'mine'
  else
    adjacentCount = current.adjacentCount row, col
    element.attr 'class', "mines#{adjacentCount}"
    if adjacentCount == 0
      _.each current.neighbours(row, col), (cell) ->
        [r,c] = cell
        $("#r#{r}c#{c}").trigger type: 'mouseup', which: 1    

adjust_remaining = (increment) ->
  remaining_mines += increment
  remaining_mines_lcd.display remaining_mines

set_unclicked_to_marked = (element) ->
  element.attr 'class', 'marked'
  element.bind 'mouseup', marked_mouseup
  adjust_remaining -1

set_marked_to_uncertain = (element) ->
  element.attr 'class', 'uncertain'
  element.bind 'mouseup', uncertain_mouseup
  adjust_remaining 1

set_uncertain_to_unclicked = (element) ->
  element.attr 'class', 'unclicked'
  element.bind 'mouseup', unclicked_mouseup

marked_mouseup = (event) ->
  unless left_clicked event
    $(this).unbind event
    set_marked_to_uncertain $(this)

uncertain_mouseup = (event) ->
  unless left_clicked event
    $(this).unbind event
    set_uncertain_to_unclicked $(this)

unclicked_mouseup = (event) ->
  if left_clicked event
    $(this).unbind event
    reveal_unclicked_cell $(this)
  else
    unless remaining_mines == 0
      $(this).unbind event
      set_unclicked_to_marked $(this)

reset_game = ->
  current.opts.mines = null
  set_game()

set_game = ->
  $(minesweeper_locator).html current.render()
  remaining_mines_lcd.display current.opts.mineCount
  $('.unclicked').bind 'contextmenu', -> false
  $('.unclicked').bind 'mouseup', unclicked_mouseup
  $('#status').bind 'mouseup', reset_game
  remaining_mines = current.opts.mineCount
  Timer.start()

window.Minesweeper =
  create: (locator, opts) ->
    minesweeper_locator = locator
    current = new Field opts
    set_game()