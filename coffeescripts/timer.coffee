window.Timer =
  create: (name) ->
    count = 0
    timer = null
    lcd = new Lcd name

    tick = (increment=1) ->
      count += increment
      lcd.display count

    increment_timer = ->
      tick 1
      timer = setTimeout increment_timer, 1000

    stop = -> 
      clearTimeout timer if timer
      count = 0

    start: ->
      stop()
      timer = setTimeout increment_timer, 1000
    stop: stop