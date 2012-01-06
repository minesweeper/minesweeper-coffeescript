current = null
minesweeper_locator = null

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

set_unclicked_to_marked = (element) ->
  element.attr 'class', 'marked'
  element.bind 'mouseup', marked_mouseup

set_marked_to_uncertain = (element) ->
  element.attr 'class', 'uncertain'
  element.bind 'mouseup', uncertain_mouseup

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
  $(this).unbind event
  if left_clicked event
    reveal_unclicked_cell $(this)
  else
    set_unclicked_to_marked $(this)

reset_game = ->
  set_game()
  current.opts.mines = null

set_game = ->
  $(minesweeper_locator).html current.render()
  $('.unclicked').bind 'contextmenu', -> false
  $('.unclicked').bind 'mouseup', unclicked_mouseup
  $('#status').bind 'mouseup', reset_game

window.Minesweeper =
  create: (locator, opts) ->
    minesweeper_locator = locator
    current = new Field opts
    set_game()