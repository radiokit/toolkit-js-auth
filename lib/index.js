"use strict";
var User_1 = require("./session/User");
exports.RadioKitToolkitAuth = {
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
