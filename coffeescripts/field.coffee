class window.Field
  constructor: (@opts) ->

  render: -> this.renderControlPanel() + this.renderField()

  renderControlPanel: ->
    """
    <table>
      <tr class="control_panel">
        <td class="dstripe" />
        <td class="lstripe" />
        <td class="dstripe" />
        <td class="lcd0" id="minesRemaining100s" />
        <td class="lcd0" id="minesRemaining10s" />
        <td class="lcd0" id="minesRemaining1s" />
        <td id="indicator" class="statusAlive" />
        <td class="lcd0" id="timer100s" />
        <td class="lcd0" id="timer10s" />
        <td class="lcd0" id="timer1s" />
        <td class="dstripe" />
        <td class="lstripe" />
        <td class="dstripe" />
      </tr>
    </table>
    """

  renderField: ->
    template = """
    <table>
    {{#rows}}
      <tr class="field">
        <td class="dstripe" />
        <td class="lstripe" />
        <td class="dstripe" />
      {{#cells}}
        <td class="{{state}}" id="r{{row}}c{{col}}"></td>
      {{/cells}}
        <td class="dstripe" />
        <td class="lstripe" />
        <td class="dstripe" />
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
      randomRow = -> Math.floor Math.random()*field.opts.rows
      randomCol = -> Math.floor Math.random()*field.opts.cols
      addMine = ->
        [r,c] = [randomRow(), randomCol()]
        field.opts.mines.push [r,c] unless (row == r and col == c) or field.hasMine r, c
      addMine() until field.opts.mines.length == field.opts.mineCount
    _.any @opts.mines, (mine) -> mine[0] == row and mine[1] == col