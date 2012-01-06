describe 'Field', ->
  it 'should render field content', ->
    f = new Field rows: 1, cols: 1
    expect(f.renderField()).toEqual """
    <table>
      <tr class="field">
        <td class="dstripe" />
        <td class="lstripe" />
        <td class="dstripe" />
          <td class="unclicked" id="r0c0"></td>
      <td class="dstripe" />
        <td class="lstripe" />
        <td class="dstripe" />
      </tr>
    </table>
    """

  describe 'neighbours', ->
    field = new Field rows: 3, cols: 3

    it 'should determine neighbours for middle', ->
      expect(field.neighbours(1,1)).toEqual [
        [0,0],[0,1],[0,2],
        [1,0],      [1,2],
        [2,0],[2,1],[2,2]
      ]

    it 'should determine neighbours for top left', ->
      expect(field.neighbours(0,0)).toEqual [
              [0,1],
        [1,0],[1,1]
      ]

    it 'should determine neighbours for bottom right', ->
      expect(field.neighbours(2,2)).toEqual [
        [1,1],[1,2],
        [2,1]
      ]

  describe 'has mine', ->
    field = new Field rows: 3, cols: 3, mines: [[1,1]]

    it 'should find mine when there is one', ->
      expect(field.hasMine(1,1)).toEqual true

    it 'should not find a mine when there is not one', ->
      expect(field.hasMine(0,0)).toEqual false

  describe 'mine placement', ->
    field = new Field rows: 2, cols:1, mineCount: 1

    it 'should place a mine after a call to hasMine', ->
      expect(field.hasMine(0,0)).toEqual false
      expect(field.opts.mines.length).toEqual 1
      expect(field.opts.mines[0]).toEqual [1, 0 ]

  describe 'adjacent mine count', ->
    field = null
 
    given_field = (s) ->
      mines = []
      lines = s.split "\n"
      lastrow = null
      _.each lines, (line, row) ->
        lastrow = line.split " "
        _.each lastrow, (char, col) ->
          mines.push [row, col] if char=='*'
      field = new Field cols: lastrow.length, rows: lines.length, mines: mines, mineCount: mines.length

    expect_counts = (s) ->
      _.each s.split("\n"), (line, row) ->
        _.each line.split(' '), (char, col) ->
          unless char=='-'
            expect(field.adjacentCount(row, col)).toEqual parseInt(char)

    it 'should determine adjacent mine count for 0 mines', ->
      given_field """
      . .
      . .
      """
      expect_counts """
      0 0
      0 0
      """

    it 'should determine adjacent mine count for 1 mines', ->
      given_field """
      * .
      . .
      """
      expect_counts """
      - 1
      1 1
      """

    it 'should determine adjacent mine count for 2 mines', ->
      given_field """
      * *
      . .
      """
      expect_counts """
      - -
      2 2
      """

    it 'should determine adjacent mine count for 3 mines', ->
      given_field """
      * *
      * .
      """
      expect_counts """
      - -
      - 3
      """

    it 'should determine adjacent mine count for 4 mines', ->
      given_field """
      * * *
      * . .
      . . .
      """
      expect_counts """
      - - -
      - 4 2
      1 1 0
      """

    it 'should determine adjacent mine count for 5 mines', ->
      given_field """
      * * *
      * . .
      * . .
      """
      expect_counts """
      - - -
      - 5 2
      - 2 0
      """

    it 'should determine adjacent mine count for 6 mines', ->
      given_field """
      * * *
      * . *
      * . .
      """
      expect_counts """
      - - -
      - 6 -
      - 3 1
      """

    it 'should determine adjacent mine count for 7 mines', ->
      given_field """
      * * *
      * . *
      * . *
      """
      expect_counts """
      - - -
      - 7 -
      - 4 -
      """


    it 'should determine adjacent mine count for 8 mines', ->
      given_field """
      * * *
      * . *
      * * *
      """
      expect_counts """
      - - -
      - 8 -
      - - -
      """