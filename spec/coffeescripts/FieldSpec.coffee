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

  it 'should determine adjacent mine count for single mine', ->
    f = new Field width: 2, height: 2, mines: [[0,0]]
    expect(f.adjacentCount(1,1)).toEqual 1
    expect(f.adjacentCount(0,1)).toEqual 1
    expect(f.adjacentCount(1,0)).toEqual 1
