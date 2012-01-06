count = 0
timer = null
lcd = new Lcd('timer')

tick = (increment=1) ->
  count += increment
  lcd.display count

increment_timer = ->
  tick 1
  timer = setTimeout increment_timer, 1000

stop = -> 
  clearTimeout timer if timer
  count = 0

window.Timer =
  start: ->
    stop()
    timer = setTimeout increment_timer, 1000

  stop: stop