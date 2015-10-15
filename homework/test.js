'use strict';

(function(exports) {

var TestManager = function() {
    var a = 0;
    var b = 1;
};

TestManager.prototype = {
  set(a, b) {
      this.a = a;
      this.b = b;
  },

  add() {
      return this.a + this.b;
  },

  start() {
    this.set(10, 20);
    console.log(this.add());
  }
};

exports.TestManager = TestManager;
})(window);
