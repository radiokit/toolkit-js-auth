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
    User.getCredentialsFromLocalStorage = function () {
        if (typeof (Storage) !== "undefined") {
            var accessToken = localStorage.getItem("accessToken");
            var user = JSON.parse(localStorage.getItem("user"));
            if (accessToken !== null && user !== null) {
                var session = new User(accessToken, user);
                return session;
            }
        }
        return null;
    };
    User.saveCredentialsToLocalStorage = function (user) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("accessToken", user.__accessToken);
            localStorage.setItem("user", JSON.stringify(user.__user));
        }
    };
    User.authenticateAsync = function (email, password, options, storeCredentials) {
        if (storeCredentials === void 0) { storeCredentials = false; }
        var promise = new Promise(function (resolve, reject) {
            if (storeCredentials) {
                var session = User.getCredentialsFromLocalStorage();
                if (session !== null) {
                    return resolve(session);
                }
            }
            var xhr = new XMLHttpRequest();
            var url;
            if (options.hasOwnProperty('baseUrl')) {
                url = options['baseUrl'] + "/api/auth/v1.0/session/user";
            }
            else {
                url = 'https://jungle.radiokitapp.org/api/auth/v1.0/session/user';
            }
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
                    if (xhr.status === 201) {
                        var responseAsJson = JSON.parse(xhr.responseText);
                        if (responseAsJson["data"]) {
                            var session = new User(responseAsJson["data"]["access_token"], responseAsJson["data"]["client_user"]);
                            if (storeCredentials) {
                                User.saveCredentialsToLocalStorage(session);
                            }
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
