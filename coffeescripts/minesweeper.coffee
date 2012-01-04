$ ->
	renderField = (opts) ->
	  (new Field opts).render '#minesweeper'

	$('#beginner').click ->
		renderField height: 9,  width: 9,  mines: 10
	$('#intermediate').click ->
		renderField height: 16, width: 16, mines: 40
	$('#expert').click ->
		renderField height: 16, width: 30, mines: 99
