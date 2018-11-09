'use strict';

var dbStart = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _mongoose2.default.connect(_config.mongoDB, { useNewUrlParser: true, useCreateIndex: true });

                    case 2:
                        debug('Base de Datos: \x1b[32m%s\x1b[0m', ' onLine');

                        _app2.default.listen(_config.port, function () {
                            debug('Server is running at port ' + _config.port);
                        });

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function dbStart() {
        return _ref.apply(this, arguments);
    };
}();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = new _debug2.default('platzi-overflow:root');

_mongoose2.default.Promise = global.Promise;

dbStart();