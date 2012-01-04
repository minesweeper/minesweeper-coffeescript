class window.Field
  constructor: (@width, @height, @mines) ->

  render: (locator) ->
  	template = "<table>
        {{#rows}}
  	  <tr>
  	    {{#cells}}
  	      <td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>
  	    {{/cells}}
  	  </tr>
  	  {{/rows}}
  	</table>"
  	height = 8
  	width = 12
  	content = $.mustache template,
  		rows: ({ cells: ({ state:'unclicked', row: row, col: col } for row in [1..width]) } for col in [1..height])
  	$(locator).html content
    