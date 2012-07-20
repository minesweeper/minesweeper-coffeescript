describe 'Lcd', ->
  lcd = Lcd.new 'prefix'
  l = (number) -> "lcd n#{number}"

  beforeEach ->
    $('#jasmine_content').html """
    <div id="prefix" class="minesRemaining">
      <div class="lcd n0" id="prefix100s" />
      <div class="lcd n0" id="prefix10s" />
      <div class="lcd n0" id="prefix1s" />
    </div>
    """

  it 'should display 0', ->
    lcd.display 0
    expect($('#prefix1s').attr 'class').toEqual l(0)
    expect($('#prefix10s').attr 'class').toEqual l(0)
    expect($('#prefix100s').attr 'class').toEqual l(0)

  it 'should display 1', ->
    lcd.display 1
    expect($('#prefix1s').attr 'class').toEqual l(1)
    expect($('#prefix10s').attr 'class').toEqual l(0)
    expect($('#prefix100s').attr 'class').toEqual l(0)

  it 'should display 10', ->
    lcd.display 10
    expect($('#prefix1s').attr 'class').toEqual l(0)
    expect($('#prefix10s').attr 'class').toEqual l(1)
    expect($('#prefix100s').attr 'class').toEqual l(0)

  it 'should display 100', ->
    lcd.display 100
    expect($('#prefix1s').attr 'class').toEqual l(0)
    expect($('#prefix10s').attr 'class').toEqual l(0)
    expect($('#prefix100s').attr 'class').toEqual l(1)

  it 'should support displaying the value as title', ->
    lcd.display 888
    expect($("#prefix").attr 'title').toEqual '888'