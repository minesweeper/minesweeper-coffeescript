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
    it 'should determine adjacent mine count zero mines', ->
      f = new Field width: 2, height: 2, mines: []
      expect(f.adjacentCount(0,0)).toEqual 0
      expect(f.adjacentCount(0,1)).toEqual 0
      expect(f.adjacentCount(1,0)).toEqual 0
      expect(f.adjacentCount(1,1)).toEqual 0

    it 'should determine adjacent mine count for single mine', ->
      f = new Field width: 2, height: 2, mines: [
        [0,0]
      ]
      expect(f.adjacentCount(1,1)).toEqual 1
      expect(f.adjacentCount(0,1)).toEqual 1
      expect(f.adjacentCount(1,0)).toEqual 1

    it 'should determine adjacent mine count for 2 mines', ->
      f = new Field width: 2, height: 2, mines: [
        [0,0],
        [1,0]
      ]
      expect(f.adjacentCount(1,1)).toEqual 2
      expect(f.adjacentCount(0,1)).toEqual 2

    it 'should determine adjacent mine count for 3 mines', ->
      f = new Field width: 2, height: 2, mines: [
        [0,0],[0,1],
        [1,0],
      ]
      expect(f.adjacentCount(1,1)).toEqual 3

    it 'should determine adjacent mine count for 4 mines', ->
      f = new Field width: 3, height: 3, mines: [
        [0,0],[0,1],[0,2],
        [1,0],
      ]
      expect(f.adjacentCount(1,1)).toEqual 4
      expect(f.adjacentCount(1,2)).toEqual 2
      expect(f.adjacentCount(2,0)).toEqual 1
      expect(f.adjacentCount(2,1)).toEqual 1
      expect(f.adjacentCount(2,2)).toEqual 0
