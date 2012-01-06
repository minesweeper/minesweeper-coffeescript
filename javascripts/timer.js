(function() {
  var count, display, increment_timer, stop, tick, timer;

  count = 0;

  timer = null;

  display = function() {
    var s;
    s = "000" + count;
    $('#timer1s').attr('class', "lcd" + s[s.length - 1]);
    $('#timer10s').attr('class', "lcd" + s[s.length - 2]);
    return $('#timer100s').attr('class', "lcd" + s[s.length - 3]);
  };

  tick = function(increment) {
    if (increment == null) increment = 1;
    count += increment;
    return display();
  };

  increment_timer = function() {
    tick(1);
    return timer = setTimeout(increment_timer, 1000);
  };

  stop = function() {
    if (timer) clearTimeout(timer);
    count = 0;
    return display();
  };

  window.Timer = {
    start: function() {
      stop();
      return timer = setTimeout(increment_timer, 1000);
    },
    stop: stop,
    tick: tick
  };

}).call(this);
