$ ->
  create = (opts) ->
    FieldPresenter.append '#minesweepers', opts

  presets =
    beginner:     rows: 9,  cols: 9,  mineCount: 10
    intermediate: rows: 16, cols: 16, mineCount: 40
    expert:       rows: 16, cols: 30, mineCount: 99

  with_parameter = (key, action) ->
    action $.QueryString key if $.QueryString key

  with_numeric_parameter = (key, action) ->
    with_parameter key, (number) ->
      action parseInt number 

  opts = presets['expert']
  with_parameter 'preset', (preset) ->
    opts = presets[preset]
  with_numeric_parameter 'rows', (number) ->
    opts.rows = number
  with_numeric_parameter 'cols', (number) ->
    opts.cols = number
  with_numeric_parameter 'mines', (number) ->
    opts.mineCount = number

  create opts