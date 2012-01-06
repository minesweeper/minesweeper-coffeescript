class window.Lcd
  constructor: (@id) ->

  display: (number) ->
    s = "000#{number}"
    $("##{@id}1s").attr 'class', "lcd#{s[s.length-1]}"
    $("##{@id}10s").attr 'class', "lcd#{s[s.length-2]}"
    $("##{@id}100s").attr 'class', "lcd#{s[s.length-3]}" 