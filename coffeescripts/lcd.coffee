class window.Lcd
  constructor: (@id) ->

  display: (number) ->
    s = "000#{number}"
    $('#timer1s').attr 'class', "#{@id}#{s[s.length-1]}"
    $('#timer10s').attr 'class', "#{@id}#{s[s.length-2]}"
    $('#timer100s').attr 'class', "#{@id}#{s[s.length-3]}" 