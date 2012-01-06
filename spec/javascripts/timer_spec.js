(function() {

  describe('Timer', function() {
    beforeEach(function() {
      Timer.stop();
      return $('#jasmine_content').html("<table>\n  <tr>\n    <td class=\"lcd0\" id=\"timer100s\" />\n    <td class=\"lcd0\" id=\"timer10s\" />\n    <td class=\"lcd0\" id=\"timer1s\" />\n  </tr>\n</table>");
    });
    it('should initially display 000', function() {
      Timer.tick(0);
      expect($('#timer1s').attr('class')).toEqual('lcd0');
      expect($('#timer10s').attr('class')).toEqual('lcd0');
      return expect($('#timer100s').attr('class')).toEqual('lcd0');
    });
    it('should increment 0 order decimal digit', function() {
      Timer.tick(1);
      expect($('#timer1s').attr('class')).toEqual('lcd1');
      expect($('#timer10s').attr('class')).toEqual('lcd0');
      return expect($('#timer100s').attr('class')).toEqual('lcd0');
    });
    it('should increment 1 order decimal digit', function() {
      Timer.tick(10);
      expect($('#timer1s').attr('class')).toEqual('lcd0');
      expect($('#timer10s').attr('class')).toEqual('lcd1');
      return expect($('#timer100s').attr('class')).toEqual('lcd0');
    });
    return it('should increment 2 order decimal digit', function() {
      Timer.tick(100);
      expect($('#timer1s').attr('class')).toEqual('lcd0');
      expect($('#timer10s').attr('class')).toEqual('lcd0');
      return expect($('#timer100s').attr('class')).toEqual('lcd1');
    });
  });

}).call(this);
