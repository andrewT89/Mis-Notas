'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectId = _mongoose.Schema.Types.ObjectId;


var QuestionSchema = new _mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    user: { type: ObjectId, ref: 'User', required: true },
    answers: [{ type: ObjectId, ref: 'Answer', default: [] }]
});

exports.default = _mongoose2.default.model('Question', QuestionSchema);