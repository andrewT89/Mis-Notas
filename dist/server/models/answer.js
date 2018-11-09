'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.Schema.Types.ObjectId;


var AnswerSchema = new _mongoose.Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    user: { type: ObjectId, ref: 'User', required: true }
});

exports.default = _mongoose2.default.model('Answer', AnswerSchema);