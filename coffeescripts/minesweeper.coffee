current = null

window.Minesweeper =
  create: (locator, opts) ->
    current = new Field opts
    $(locator).html current.render()
    $('.unclicked').bind 'contextmenu', ->
      false
    $('.unclicked').mouseup (event) ->
      if event.which == 1
        $(this).attr 'class', 'clicked'
      else
        $(this).attr 'class', 'marked'
