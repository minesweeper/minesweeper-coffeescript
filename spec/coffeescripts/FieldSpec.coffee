describe 'Field', ->
  field = new Field 8, 15, 10

  it 'should expose width', ->
    expect(field.width).toEqual 8

  it 'should expose height', ->
    expect(field.height).toEqual 15
