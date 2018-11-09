'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var handleError = exports.handleError = function handleError(error, res) {
    res.status(500).json({
        message: 'Ocurrio un error',
        error: error
    });
};