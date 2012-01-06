(function() {

  window.Lcd = (function() {

    function Lcd(id) {
      this.id = id;
    }

    Lcd.prototype.display = function(number) {
      var s;
      s = "000" + number;
      $("#" + this.id + "1s").attr('class', "lcd" + s[s.length - 1]);
      $("#" + this.id + "10s").attr('class', "lcd" + s[s.length - 2]);
      return $("#" + this.id + "100s").attr('class', "lcd" + s[s.length - 3]);
    };

    return Lcd;

  })();

}).call(this);
