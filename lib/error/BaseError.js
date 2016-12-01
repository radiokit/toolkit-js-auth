"use strict";
var BaseError = (function () {
    function BaseError(message) {
        this.message = message;
    }
    return BaseError;
}());
exports.BaseError = BaseError;
BaseError.prototype = new Error();
