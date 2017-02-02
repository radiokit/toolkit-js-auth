/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var User_1 = __webpack_require__(1);
	var UnauthorizedError_1 = __webpack_require__(2);
	var NetworkError_1 = __webpack_require__(4);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var UnauthorizedError_1 = __webpack_require__(2);
	var NetworkError_1 = __webpack_require__(4);
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
	    User.clearCachedCredentials = function () {
	        if (typeof (Storage) !== "undefined") {
	            localStorage.removeItem("accessToken");
	            localStorage.removeItem("user");
	        }
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaseError_1 = __webpack_require__(3);
	var UnauthorizedError = (function (_super) {
	    __extends(UnauthorizedError, _super);
	    function UnauthorizedError(message) {
	        _super.call(this, message);
	    }
	    return UnauthorizedError;
	}(BaseError_1.BaseError));
	exports.UnauthorizedError = UnauthorizedError;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var BaseError = (function () {
	    function BaseError(message) {
	        this.message = message;
	    }
	    return BaseError;
	}());
	exports.BaseError = BaseError;
	BaseError.prototype = new Error();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BaseError_1 = __webpack_require__(3);
	var NetworkError = (function (_super) {
	    __extends(NetworkError, _super);
	    function NetworkError(message) {
	        _super.call(this, message);
	    }
	    return NetworkError;
	}(BaseError_1.BaseError));
	exports.NetworkError = NetworkError;


/***/ }
/******/ ]);
//# sourceMappingURL=radiokit-toolkit-auth.js.map