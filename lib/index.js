"use strict";
var User_1 = require("./session/User");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Session: {
        User: User_1.User,
    },
};
if (typeof (window) !== "undefined") {
    window['RadioKitToolkitAuth'] = {
        Session: {
            User: User_1.User,
        }
    };
}
