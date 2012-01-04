$ ->		
	$('#beginner').click ->
		(new Field { height: 9,  width: 9,  mines: 10}).render '#minesweeper'
	$('#intermediate').click ->
		(new Field { height: 16, width: 16, mines: 40}).render '#minesweeper'
	$('#expert').click ->
		(new Field { height: 16, width: 30, mines: 99}).render '#minesweeper'
		
		
