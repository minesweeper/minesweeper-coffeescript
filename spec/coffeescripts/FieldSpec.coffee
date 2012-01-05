describe 'Field', ->
  it 'should render content', ->
    f = new Field width: 1, height: 1
    expect(f.render()).toEqual """
    <table>
      <tr>
          <td class="unclicked" id="r1c1"></td>
      </tr>
    </table>
    """

  describe 'neighbours', ->
    field = new Field width: 3, height: 3

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
      field = new Field width: lastrow.length, height: lines.length, mines: mines

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