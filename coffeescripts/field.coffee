class window.Field
  constructor: (@opts) ->

  render: -> this.renderControlPanel() + this.renderField()

  renderControlPanel: ->
    """
    <table>
      <tr class="control_panel">
        <td class="lcd0" />
        <td class="lcd0" />
        <td class="lcd0" />
        <td class="statusAlive" />
        <td class="lcd0" />
        <td class="lcd0" />
        <td class="lcd0" />
      </tr>
    </table>
    """

  renderField: ->
    template = """
    <table>
    {{#rows}}
      <tr class="field">
      {{#cells}}
        <td class="{{state}}" id="r{{row}}c{{col}}"></td>
      {{/cells}}
      </tr>
    {{/rows}}
    </table>
    """
    Mustache.to_html template,
      rows: ({ cells: ({ state:'unclicked', row: row, col: col } for col in [0..@opts.cols-1]) } for row in [0..@opts.rows-1])

  adjacentCount: (row,col) ->
    field = this
    iterator = (memo, neighbour) ->
      memo += 1 if field.hasMine neighbour[0], neighbour[1]
      memo
    _.reduce this.neighbours(row,col), iterator, 0

  neighbours: (row, col) ->
    result = []
    rows = @opts.rows
    cols = @opts.cols
    append = (r, c) ->
      result.push [r, c] unless (r == row and c == col) or r < 0 or c < 0 or r >= rows or c >= cols
    ((append r,c for c in [col-1..col+1]) for r in [row-1..row+1])
    result

  hasMine: (row, col) ->
    unless @opts.mines
      field = this
      @opts.mines = []
      randomIndex = (max) ->
        Math.floor Math.random()*max
      addMine = ->
        r = randomIndex field.opts.rows
        c = randomIndex field.opts.cols
        field.opts.mines.push [r,c] unless (row == r and col == c) or field.hasMine r, c
      addMine() until field.opts.mines.length == field.opts.mineCount
    _.any @opts.mines, (mine) -> mine[0] == row and mine[1] == col