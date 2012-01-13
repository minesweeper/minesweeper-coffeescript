(function() {

  window.Lcd = {
    "new": function(id) {
      return {
        display: function(number) {
          var s;
          s = "00" + number;
          $("#" + id + "1s").attr('class', "lcd n" + (s.charAt(s.length - 1)));
          $("#" + id + "10s").attr('class', "lcd n" + (s.charAt(s.length - 2)));
          return $("#" + id + "100s").attr('class', "lcd n" + (s.charAt(s.length - 3)));
        }
      };
    }
  };

}).call(this);
