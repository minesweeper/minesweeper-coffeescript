class window.Field
  constructor: (@opts) ->

  render: ->
    template = """
    <table>
    {{#rows}}
      <tr>
      {{#cells}}
        <td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>
      {{/cells}}
      </tr>
    {{/rows}}
    </table>
    """
    Mustache.to_html template,
      rows: ({ cells: ({ state:'unclicked', row: row, col: col } for row in [0..@opts.width-1]) } for col in [0..@opts.height-1])

  adjacentCount: (row,col) ->
    field = this
    iterator = (memo, neighbour) ->
      memo += 1 if field.hasMine neighbour[0], neighbour[1]
      memo
    _.reduce this.neighbours(row,col), iterator, 0

  neighbours: (row, col) ->
    result = []
    height = @opts.height
    width = @opts.width
    append = (r, c) ->
      result.push [r, c] unless (r == row and c == col) or r < 0 or c < 0 or r >= height or c >= width
    ((append r,c for c in [col-1..col+1]) for r in [row-1..row+1])
    result

  hasMine: (row, col) ->
    unless @opts.mines
      field = this
      @opts.mines = []
      randomIndex = (max) ->
        Math.floor Math.random()*max
      addMine = ->
        r = randomIndex field.opts.height
        c = randomIndex field.opts.width
        field.opts.mines.push [r,c] unless (row == r and col == c) or field.hasMine r, c
      addMine() until field.opts.mines.length == field.opts.mineCount
    _.any @opts.mines, (mine) -> mine[0] == row and mine[1] == col