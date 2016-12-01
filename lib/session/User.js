"use strict";
var User = (function () {
    function User(accessToken, user) {
        this.__accessToken = accessToken;
        this.__user = user;
    }
    User.prototype.getAccessToken = function () {
        return this.__accessToken;
    };
    User.prototype.getUser = function () {
        return this.__user;
    };
    User.authenticateAsync = function (email, password) {
        var promise = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var url = 'https://jungle.radiokitapp.org/api/auth/v1.0/session/user';
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.timeout = 15000;
            xhr.onerror = function (e) {
                reject(new Error("Unable to authenticate: Network error (" + xhr.status + ")"));
            };
            xhr.onabort = function (e) {
                reject(new Error("Unable to authenticate: Aborted"));
            };
            xhr.ontimeout = function (e) {
                reject(new Error("Unable to authenticate: Timeout"));
            };
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var responseAsJson = JSON.parse(xhr.responseText);
                        if (responseAsJson["data"].length === 1) {
                            var session = new User(responseAsJson["data"]["access_token"], responseAsJson["data"]["user"]);
                            resolve(session);
                        }
                        else {
                            reject(new Error("Unable to authenticate: Record not found"));
                        }
                    }
                    else if (xhr.status === 401) {
                        reject(new Error("Unable to authenticate: Unauthorized"));
                    }
                    else {
                        reject(new Error("Unable to authenticate: Unexpected response (status = " + xhr.status + ")"));
                    }
                }
            };
            xhr.send(JSON.stringify({ email: email, password: password }));
        });
        return promise;
    };
    return User;
}());
exports.User = User;
