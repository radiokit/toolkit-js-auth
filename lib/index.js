"use strict";
var User_1 = require("./session/User");
var UnauthorizedError_1 = require("./error/UnauthorizedError");
var NetworkError_1 = require("./error/NetworkError");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Session: {
        User: User_1.User,
    },
    Error: {
        UnauthorizedError: UnauthorizedError_1.UnauthorizedError,
        NetworkError: NetworkError_1.NetworkError,
    },
};
if (typeof (window) !== "undefined") {
    window['RadioKitToolkitAuth'] = {
        Session: {
            User: User_1.User,
        },
        Error: {
            UnauthorizedError: UnauthorizedError_1.UnauthorizedError,
            NetworkError: NetworkError_1.NetworkError,
        },
    };
}
