(function() {

  window.Field = (function() {

    function Field(width, height, mines) {
      this.width = width;
      this.height = height;
      this.mines = mines;
    }

    return Field;

  })();

}).call(this);
