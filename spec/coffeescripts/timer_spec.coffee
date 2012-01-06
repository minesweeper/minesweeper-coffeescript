describe 'Timer', ->
  beforeEach ->
    Timer.stop()
    $('#jasmine_content').html """
    <table>
      <tr>
        <td class="lcd0" id="timer100s" />
        <td class="lcd0" id="timer10s" />
        <td class="lcd0" id="timer1s" />
      </tr>
    </table>
    """

  it 'should initially display 000', ->
    Timer.tick 0
    expect($('#timer1s').attr 'class').toEqual 'lcd0'
    expect($('#timer10s').attr 'class').toEqual 'lcd0'
    expect($('#timer100s').attr 'class').toEqual 'lcd0'

  it 'should increment 0 order decimal digit', ->
    Timer.tick 1
    expect($('#timer1s').attr 'class').toEqual 'lcd1'
    expect($('#timer10s').attr 'class').toEqual 'lcd0'
    expect($('#timer100s').attr 'class').toEqual 'lcd0'

  it 'should increment 1 order decimal digit', ->
    Timer.tick 10
    expect($('#timer1s').attr 'class').toEqual 'lcd0'
    expect($('#timer10s').attr 'class').toEqual 'lcd1'
    expect($('#timer100s').attr 'class').toEqual 'lcd0'

  it 'should increment 2 order decimal digit', ->
    Timer.tick 100
    expect($('#timer1s').attr 'class').toEqual 'lcd0'
    expect($('#timer10s').attr 'class').toEqual 'lcd0'
    expect($('#timer100s').attr 'class').toEqual 'lcd1'