window.Lcd =
  new: (id) ->
    display: (number) ->
      s = "00#{number}"
      $("##{id}1s").attr 'class', "lcd n#{s.charAt(s.length-1)}"
      $("##{id}10s").attr 'class', "lcd n#{s.charAt(s.length-2)}"
      $("##{id}100s").attr 'class', "lcd n#{s.charAt(s.length-3)}"