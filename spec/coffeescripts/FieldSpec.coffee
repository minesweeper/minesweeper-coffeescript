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
