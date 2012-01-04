(function() {

  window.Field = (function() {

    function Field(opts) {
      this.opts = opts;
    }

    Field.prototype.render = function() {
      var col, row, template;
      template = "<table>\n{{#rows}}\n  <tr>\n  {{#cells}}\n    <td oncontextmenu=\"return false;\" class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>\n  {{/cells}}\n  </tr>\n{{/rows}}\n</table>";
      return Mustache.to_html(template, {
        rows: (function() {
          var _ref, _results;
          _results = [];
          for (col = 1, _ref = this.opts.height; 1 <= _ref ? col <= _ref : col >= _ref; 1 <= _ref ? col++ : col--) {
            _results.push({
              cells: (function() {
                var _ref2, _results2;
                _results2 = [];
                for (row = 1, _ref2 = this.opts.width; 1 <= _ref2 ? row <= _ref2 : row >= _ref2; 1 <= _ref2 ? row++ : row--) {
                  _results2.push({
                    state: 'unclicked',
                    row: row,
                    col: col
                  });
                }
                return _results2;
              }).call(this)
            });
          }
          return _results;
        }).call(this)
      });
    };

    return Field;

  })();

}).call(this);
