(function() {

  window.Field = (function() {

    function Field(width, height, mines) {
      this.width = width;
      this.height = height;
      this.mines = mines;
    }

    Field.prototype.render = function(locator) {
      var col, content, height, row, template, width;
      template = "<table>        {{#rows}}  	  <tr>  	    {{#cells}}  	      <td class=\"{{state}}\" id=\"r{{row}}c{{col}}\"></td>  	    {{/cells}}  	  </tr>  	  {{/rows}}  	</table>";
      height = 8;
      width = 12;
      content = $.mustache(template, {
        rows: (function() {
          var _results;
          _results = [];
          for (col = 1; 1 <= height ? col <= height : col >= height; 1 <= height ? col++ : col--) {
            _results.push({
              cells: (function() {
                var _results2;
                _results2 = [];
                for (row = 1; 1 <= width ? row <= width : row >= width; 1 <= width ? row++ : row--) {
                  _results2.push({
                    state: 'unclicked',
                    row: row,
                    col: col
                  });
                }
                return _results2;
              })()
            });
          }
          return _results;
        })()
      });
      return $(locator).html(content);
    };

    return Field;

  })();

}).call(this);
