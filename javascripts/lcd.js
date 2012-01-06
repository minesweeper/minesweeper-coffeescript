(function() {

  window.Lcd = (function() {

    function Lcd(id) {
      this.id = id;
    }

    Lcd.prototype.display = function(number) {
      var s;
      s = "000" + number;
      $('#timer1s').attr('class', "" + this.id + s[s.length - 1]);
      $('#timer10s').attr('class', "" + this.id + s[s.length - 2]);
      return $('#timer100s').attr('class', "" + this.id + s[s.length - 3]);
    };

    return Lcd;

  })();

}).call(this);
