$ ->
	renderField = (opts) ->
		$('#minesweeper').html (new Field opts).render()
		$('.unclicked').mouseup (event) ->
			if event.which == 1
			  $(this).attr 'class', 'clicked'
			else
			  $(this).attr 'class', 'marked'

	$('#beginner').click ->
		renderField height: 9,  width: 9,  mines: 10
	$('#intermediate').click ->
		renderField height: 16, width: 16, mines: 40
	$('#expert').click ->
		renderField height: 16, width: 30, mines: 99
