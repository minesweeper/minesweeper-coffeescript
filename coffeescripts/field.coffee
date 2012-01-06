class window.Field
  constructor: (@opts) ->

  render: ->
    this.renderTitleBar() + this.renderControlPanel() + this.renderField()

  renderTemplate: (template, view) ->
    partials =
      leader: """
      <td class="dstripe" />
      <td class="lstripe" />
      <td class="dstripe" />
      """
      trailer: """
      <td class="dstripe" />
      <td class="lstripe" />
      <td class="dstripe" />
      """
    Mustache.to_html template, view, partials

  renderTitleBar: ->
    template = """
    <table>
    <tr class="title_bar">
    {{>leader}}
    {{#classes}}
    <td class="{{.}}" />
    {{/classes}}
    {{>trailer}}
    </tr>
    </table>
    """
    this.renderTemplate template,
      classes: "title gap buttons".split(' ')

  renderLcd: (id) ->
    template = """
    <td class="lcd n0" id="{{id}}100s" />
    <td class="lcd n0" id="{{id}}10s" />
    <td class="lcd n0" id="{{id}}1s" />
    """
    Mustache.to_html template,
      id: id

  renderControlPanel: ->
    template = """
    <table>
    <tr class="control_panel">
    {{>leader}}
    {{{lcdMinesRemaining}}}
    <td id="indicator" class="statusAlive" />
    {{{lcdTimer}}}
    {{>trailer}}
    </tr>
    </table>
    """
    this.renderTemplate template,
      lcdMinesRemaining: this.renderLcd 'minesRemaining'
      lcdTimer: this.renderLcd 'timer'

  renderField: ->
    template = """
    <table>
    {{#rows}}
    <tr class="field">
    {{>leader}}
    {{#cells}}
    <td class="{{state}}" id="r{{row}}c{{col}}"></td>
    {{/cells}}
    {{>trailer}}
    </tr>
    {{/rows}}
    </table>
    """
    this.renderTemplate template,
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