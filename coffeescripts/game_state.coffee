class window.GameState
  constructor: (@field) ->
    this.remaining_mines = this.field.opts.mineCount
    this.lost = false

  lose: ->
    this.lost = true