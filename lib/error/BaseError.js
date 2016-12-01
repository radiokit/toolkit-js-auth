"use strict";
var BaseError = (function () {
    function BaseError(message) {
        Error.apply(this, arguments);
    }
    return BaseError;
}());
exports.BaseError = BaseError;
BaseError.prototype = new Error();
