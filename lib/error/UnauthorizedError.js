"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UnauthorizedError = (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "UnauthorizedError";
        _this.stack = new Error().stack;
        return _this;
    }
    return UnauthorizedError;
}(Error));
exports.UnauthorizedError = UnauthorizedError;
