'use strict';
'use strict';

(function (exports) {
    var Test = function () {

    };
    Test.prototype = {
        test(a, b) {
            return a + b;
        }
    };
    exports.Test = Test;
})(window);
