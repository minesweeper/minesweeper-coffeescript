window.Timer =
  new: (name) ->
    count = null
    timer = null
    lcd = Lcd.new name

    tick = (increment=1) ->
      count += increment
      lcd.display count

    increment_timer = ->
      tick 1
      timer = setTimeout increment_timer, 1000

    stop = ->
      clearTimeout timer if timer
      timer = null
      count = 0

    start: ->
      timer = setTimeout increment_timer, 1000 unless timer
    stop: stop