(function() {
  var count, increment_timer, lcd, stop, tick, timer;

  count = 0;

  timer = null;

  lcd = new Lcd('timer');

  tick = function(increment) {
    if (increment == null) increment = 1;
    count += increment;
    return lcd.display(count);
  };

  increment_timer = function() {
    tick(1);
    return timer = setTimeout(increment_timer, 1000);
  };

  stop = function() {
    if (timer) clearTimeout(timer);
    return count = 0;
  };

  window.Timer = {
    start: function() {
      stop();
      return timer = setTimeout(increment_timer, 1000);
    }
  };

}).call(this);
