(function() {

  $(function() {
    var create, opts, presets, with_numeric_parameter, with_parameter;
    create = function(opts) {
      return FieldPresenter.append('#minesweepers', opts);
    };
    presets = {
      beginner: {
        rows: 9,
        cols: 9,
        mineCount: 10
      },
      intermediate: {
        rows: 16,
        cols: 16,
        mineCount: 40
      },
      expert: {
        rows: 16,
        cols: 30,
        mineCount: 99
      }
    };
    with_parameter = function(key, action) {
      if ($.QueryString(key)) return action($.QueryString(key));
    };
    with_numeric_parameter = function(key, action) {
      return with_parameter(key, function(number) {
        return action(parseInt(number));
      });
    };
    opts = presets['expert'];
    with_parameter('preset', function(preset) {
      return opts = presets[preset];
    });
    with_numeric_parameter('rows', function(number) {
      return opts.rows = number;
    });
    with_numeric_parameter('cols', function(number) {
      return opts.cols = number;
    });
    with_numeric_parameter('mines', function(number) {
      return opts.mineCount = number;
    });
    return create(opts);
  });

}).call(this);
