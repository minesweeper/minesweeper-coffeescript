$ ->
  create = (opts) ->
    Minesweeper.create '#minesweeper', opts

  presets =
    beginner:     rows: 9,  cols: 9,  mineCount: 10
    intermediate: rows: 16, cols: 16, mineCount: 40
    expert:       rows: 16, cols: 30, mineCount: 99

  if $.QueryString("preset")
    create presets[$.QueryString("preset")]
  else
    create presets['expert']