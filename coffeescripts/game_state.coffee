window.GameState =
  new: (field) ->
    mines_remaining = field.opts.mineCount
    cells_remaining = field.opts.rows * field.opts.cols - field.opts.mineCount
    have_lost = false
    have_won = false

    reveal_cell = ->
      cells_remaining -= 1
      have_won = true if cells_remaining < 1

    increment_remaining_mines = (increment) ->
      mines_remaining += increment

    lose = -> have_lost = true
    finished = -> have_won or have_lost
    remaining_mines = -> mines_remaining
    remaining_cells = -> cells_remaining
    won = -> have_won
    lost = -> have_lost

    lose: lose
    reveal_cell: reveal_cell
    finished: finished
    won: won
    lost: lost
    remaining_mines: remaining_mines
    remaining_cells: remaining_cells
    increment_remaining_mines: increment_remaining_mines