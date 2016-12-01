"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NetworkError = (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "NetworkError";
        _this.stack = new Error().stack;
        return _this;
    }
    return NetworkError;
}(Error));
exports.NetworkError = NetworkError;
