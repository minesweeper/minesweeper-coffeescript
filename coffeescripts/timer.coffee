count = 0
timer = null

display = ->
  s = "000#{count}"
  $('#timer1s').attr 'class', "lcd#{s[s.length-1]}"
  $('#timer10s').attr 'class', "lcd#{s[s.length-2]}"
  $('#timer100s').attr 'class', "lcd#{s[s.length-3]}" 

tick = (increment=1) ->
  count += increment
  display()

increment_timer = ->
  tick 1
  timer = setTimeout increment_timer, 1000

stop = -> 
  clearTimeout timer if timer
  count = 0
  display()

window.Timer =
  start: ->
    stop()
    timer = setTimeout increment_timer, 1000

  stop: stop

  tick: tick