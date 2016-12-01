"use strict";
var User_1 = require("./session/User");
exports.Session = {
    User: User_1.User,
};
if (typeof (window) !== "undefined") {
    window['RadioKitToolkitAuth'] = {
        Client: {
            User: User_1.User,
        }
    };
}
