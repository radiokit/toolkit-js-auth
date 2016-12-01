"use strict";
var UnauthorizedError_1 = require("../error/UnauthorizedError");
var NetworkError_1 = require("../error/NetworkError");
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
                reject(new NetworkError_1.NetworkError("Network error (" + xhr.status + ")"));
            };
            xhr.onabort = function (e) {
                reject(new NetworkError_1.NetworkError("Aborted"));
            };
            xhr.ontimeout = function (e) {
                reject(new NetworkError_1.NetworkError("Timeout"));
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
                            reject(new NetworkError_1.NetworkError("Invalid API response: Record not found"));
                        }
                    }
                    else if (xhr.status === 401) {
                        reject(new UnauthorizedError_1.UnauthorizedError("Unauthorized"));
                    }
                    else {
                        reject(new NetworkError_1.NetworkError("Unexpected response (status = " + xhr.status + ")"));
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
