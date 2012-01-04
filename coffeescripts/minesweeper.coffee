$ ->
	template = "<table>
      {{#rows}}
	  <tr>
	    {{#cols}}
	      <td class=\"{{.}}\"></td>
	    {{/cols}}
	  </tr>
	  {{/rows}}
	</table>"
	data =
		name: "foo"
		rows: []
	data.rows.push { cols: ['unclicked','unclicked'] }
	data.rows.push { cols: ['unclicked','unclicked'] }
	content = $.mustache template, data
	$('#minesweeper').html content