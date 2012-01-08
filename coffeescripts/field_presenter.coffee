minesweeper_count = 0

window.FieldPresenter =
  append: (minesweepers_locator, opts) ->
    minesweeper_count += 1
    minesweeper_id = "minesweeper#{minesweeper_count}"
    $(minesweepers_locator).append """
    <div id="#{minesweeper_id}" class="minesweeper"></div>
    """
    FieldPresenter.render "##{minesweeper_id}", opts, minesweeper_count

  render: (minesweeper_locator, opts, index=1) ->
    id = (name) ->
      "g#{index}#{name}"

    selector = (name) ->
      "##{id name}"

    current = new Field opts
    remaining_mines_lcd = new Lcd id 'minesRemaining'
    game_state = null
    timer = Timer.create id 'timer'

    left_clicked = (event) ->
      event.which == 1

    change_class_to = (id, cls) ->
      $(selector id).attr 'class', cls

    change_indicator_status_to = (status) ->
      change_class_to 'indicator', "status #{status}"

    click_cell = (cell) ->
      [r,c] = cell
      $(selector "r#{r}c#{c}").trigger type: 'mouseup', which: 1

    end_game = (status) ->
      timer.stop()
      change_indicator_status_to status

    reveal_unclicked_cell = (element) ->
      match = /r(\d+)c(\d+)/.exec element.attr 'id'
      [row,col] = [parseInt(match[1]),parseInt(match[2])]
      if current.hasMine(row, col)
        _.each current.opts.mines, (cell) -> click_cell cell
        end_game 'dead'
        game_state.lose()
        element.attr 'class', 'mine'
      else
        return if game_state.finished
        adjacentCount = current.adjacentCount row, col
        element.attr 'class', "mines#{adjacentCount}"
        game_state.reveal_cell()
        end_game 'won' if game_state.won
        if adjacentCount == 0
          _.each current.neighbours(row, col), (cell) -> click_cell cell

    adjust_remaining = (increment) ->
      game_state.remaining_mines += increment
      remaining_mines_lcd.display game_state.remaining_mines

    set_unclicked_to_marked = (element) ->
      return if game_state.finished
      element.attr 'class', 'marked'
      element.bind 'mouseup', marked_mouseup
      adjust_remaining -1

    set_marked_to_uncertain = (element) ->
      return if game_state.finished
      element.attr 'class', 'uncertain'
      element.bind 'mouseup', uncertain_mouseup
      adjust_remaining 1

    set_uncertain_to_unclicked = (element) ->
      return if game_state.finished
      element.attr 'class', 'unclicked'
      element.bind 'mouseup', unclicked_mouseup

    marked_mouseup = (event) ->
      unless left_clicked event
        $(this).unbind event
        set_marked_to_uncertain $(this)

    uncertain_mouseup = (event) ->
      unless left_clicked event
        $(this).unbind event
        set_uncertain_to_unclicked $(this)

    unclicked_mouseup = (event) ->
      if left_clicked event
        $(this).unbind event
        reveal_unclicked_cell $(this)
      else
        unless game_state.remaining_mines == 0
          $(this).unbind event
          set_unclicked_to_marked $(this)

    indicator_pressed = ->
      $(this).attr 'class', 'status alivePressed'

    reset_game = ->
      current.opts.mines = null
      set_game()

    set_game = ->
      $(minesweeper_locator).width (current.opts.cols * 16) + 20
      $(minesweeper_locator).html renderParent field: renderField current
      $(minesweeper_locator).draggable();
      remaining_mines_lcd.display current.opts.mineCount
      $("#g#{index} .unclicked").bind 'contextmenu', -> false
      $("#g#{index} .unclicked").bind 'mouseup', unclicked_mouseup
      $("#g#{index}indicator").bind 'mouseup', reset_game
      $("#g#{index}indicator").bind 'mousedown', indicator_pressed
      game_state = new GameState current
      timer.start()

    renderParent = (view) ->
      template =
        """
        <div class="title">
          <span class="title_left"></span>
          <span class="title_right"></span>        
        </div>
        <div class="outer">
          <div class="top">
            <div class="minesRemaining">
              <div id="g#{index}minesRemaining100s" class="lcd n0"></div>
              <div id="g#{index}minesRemaining10s" class="lcd n0"></div>
              <div id="g#{index}minesRemaining1s" class="lcd n0"></div>
            </div>
            <span id="g#{index}indicator{{index}}" class="status alive"></span>
            <div class="timer">
              <div id="g#{index}timer100s" class="lcd n0"></div>
              <div id="g#{index}timer10s" class="lcd n0"></div>
              <div id="g#{index}timer1s" class="lcd n0"></div>            
            </div>
          </div>
          <div id="g#{index}" class="bottom">
          {{{field}}
          </div>
        </div>
        """
      Mustache.to_html template, view

    renderField = (field) ->
      template = """
      <table>
      {{#rows}}
      <tr class="field">
      {{#cells}}
      <td class="{{state}}" id="g#{index}r{{row}}c{{col}}"></td>
      {{/cells}}
      </tr>
      {{/rows}}
      </table>
      """
      Mustache.to_html template,
        rows: ({ cells: ({ state:'unclicked', row: row, col: col } for col in [0..field.opts.cols-1]) } for row in [0..field.opts.rows-1])

    set_game()