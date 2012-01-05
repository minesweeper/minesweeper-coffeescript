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
      rows: ({ cells: ({ state:'unclicked', row: row, col: col } for row in [1..@opts.width]) } for col in [1..@opts.height])

  adjacentCount: (row,col) ->
    1

  neighbours: (row, col) ->
    result = []
    append = (r, c) ->
      result.push [r, c] unless (r == row and c == col) or r < 0 or c < 0
    ((append r,c for c in [col-1..col+1]) for r in [row-1..row+1])
    result
