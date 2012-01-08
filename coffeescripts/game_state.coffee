class window.GameState
  constructor: (@field) ->
    this.remaining_mines = field.opts.mineCount
    this.remaining_cells = field.opts.rows * field.opts.cols - field.opts.mineCount
    this.lost = false
    this.won = false

  lose: ->
    this.lost = true

  reveal_cell: ->
    this.remaining_cells -= 1
    this.won = true if this.remaining_cells < 1

  finished: ->
    this.won or this.lost