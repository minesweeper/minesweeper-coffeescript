(function() {

  $(function() {
    var create, presets;
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
    if ($.QueryString("preset")) {
      return create(presets[$.QueryString("preset")]);
    } else {
      return create(presets['expert']);
    }
  });

}).call(this);
