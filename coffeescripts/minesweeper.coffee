current = null

marked_mouseup = (event) ->
  unless event.which == 1
    $(this).attr 'class', 'marked'

unclicked_mouseup = (event) ->
  $(this).unbind(event);
  if event.which == 1
    $(this).attr 'class', 'empty'
  else
    $(this).attr 'class', 'marked'
    $(this).bind 'mouseup', marked_mouseup

window.Minesweeper =
  create: (locator, opts) ->
    current = new Field opts
    $(locator).html current.render()
    $('.unclicked').bind 'contextmenu', ->
      false
    $('.unclicked').bind 'mouseup', unclicked_mouseup
