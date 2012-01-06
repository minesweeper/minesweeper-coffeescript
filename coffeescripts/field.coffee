class window.Field
  constructor: (@opts) ->

  render: ->
    this.renderBorder("light lightest light") +
    this.renderTitleBar() +
    this.renderSeparator('t') +
    this.renderControlPanel() +
    this.renderSeparator('m') +
    this.renderField() +
    this.renderSeparator('b') +
    this.renderBorder("light dark darkest")

  renderTemplate: (template, view) ->
    partials =
      leader: """
      <td class="light stripe" />
      <td class="lightest stripe" />
      <td class="light stripe" />
      """
      trailer: """
      <td class="light stripe" />
      <td class="dark stripe" />
      <td class="darkest stripe" />
      """
    Mustache.to_html template, view, partials

  renderBorder: (classes) ->
    template = """
    <table>
    {{#classes}}
    <tr class="border">
    <td class="{{.}}" width="{{width}}"></td>
    </tr>
    {{/classes}}
    </table>
    """
    width = (this.opts.cols * 16) + 30
    Mustache.to_html template,
      width: width
      twidth: width + 6
      classes: classes.split(' ')

  renderTitleBar: ->
    template = """
    <table>
    <tr class="title_bar">
    {{>leader}}
    <td class="title" />
    <td class="gap" width="{{width}}" />
    <td class="buttons" />
    {{>trailer}}
    </tr>
    </table>
    """
    gap = this.opts.cols * 16 + 24
    gap -= 94
    gap -= 52
    this.renderTemplate template,
      width: gap

  renderSeparator: (position) ->
    template = """
    <table>
    <tr class="separator">
    {{>leader}}
    <td class="edge ml"></td>
    <td class="separator" width="{{width}}"></td>
    <td class="edge mr""></td>
    {{>trailer}}
    </tr>
    </table>
    """
    this.renderTemplate template,
      position: position
      width: this.opts.cols * 16

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
    <td class="field_side" />
    {{{lcdMinesRemaining}}}
    <td class="gap" width="{{width}}" />
    <td id="indicator" class="statusAlive" />
    <td class="gap" width="{{width}}" />
    {{{lcdTimer}}}
    <td class="field_side" />
    {{>trailer}}
    </tr>
    </table>
    """
    gap = this.opts.cols * 8
    gap -= 3 * 14
    gap -= 17
    this.renderTemplate template,
      lcdMinesRemaining: this.renderLcd 'minesRemaining'
      lcdTimer: this.renderLcd 'timer'
      width: gap

  renderField: ->
    template = """
    <table>
    {{#rows}}
    <tr class="field">
    {{>leader}}
    <td class="field_side" />
    {{#cells}}
    <td class="{{state}}" id="r{{row}}c{{col}}"></td>
    {{/cells}}
    <td class="field_side" />
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