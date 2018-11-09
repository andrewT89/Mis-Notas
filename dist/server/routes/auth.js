'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

var _models = require('../models');

var _bcryptjs = require('bcryptjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();
var debug = new _debug2.default('platzi-overflow:auth');

app.post('/signin', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, email, password, user, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$body = req.body, email = _req$body.email, password = _req$body.password;
                        _context.next = 3;
                        return _models.User.findOne({ email: email });

                    case 3:
                        user = _context.sent;

                        if (user) {
                            _context.next = 7;
                            break;
                        }

                        debug('User with email ' + email + ' not found');
                        return _context.abrupt('return', handleLoginFailed(res));

                    case 7:
                        if ((0, _bcryptjs.compareSync)(password, user.password)) {
                            _context.next = 10;
                            break;
                        }

                        debug('Passwords do not match: ' + password + ' diferent ' + user.password);
                        return _context.abrupt('return', handleLoginFailed(res, 'El correo y/o contraseña no coinciden '));

                    case 10:

                        // Get Token
                        token = createToken(user);
                        return _context.abrupt('return', res.status(200).json({
                            message: 'Login succeded',
                            token: token,
                            userId: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        }));

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

var createToken = function createToken(user) {
    return _jsonwebtoken2.default.sign({ user: user }, _config.secret, { expiresIn: 86400 });
};

app.post('/signup', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, firstName, lastName, email, password, u, user, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password;
                        u = new _models.User({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: (0, _bcryptjs.hashSync)(password, 10)
                        });

                        debug('Creating new user: ' + user);
                        _context2.next = 5;
                        return u.save();

                    case 5:
                        user = _context2.sent;
                        token = createToken(user);
                        return _context2.abrupt('return', res.status(201).json({
                            message: 'User Create and saved',
                            token: token,
                            userId: user._id,
                            firstName: firstName,
                            lastName: lastName,
                            email: email
                        }));

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}());

function handleLoginFailed(res, message) {
    return res.status(401).json({
        message: message,
        error: message || 'Email and password don\'t match'
    });
}

exports.default = app;