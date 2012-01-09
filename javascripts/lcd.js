(function() {

  window.Lcd = {
    "new": function(id) {
      return {
        display: function(number) {
          var s;
          s = "000" + number;
          $("#" + id + "1s").attr('class', "lcd n" + s[s.length - 1]);
          $("#" + id + "10s").attr('class', "lcd n" + s[s.length - 2]);
          return $("#" + id + "100s").attr('class', "lcd n" + s[s.length - 3]);
        }
      };
    }
  };

}).call(this);
