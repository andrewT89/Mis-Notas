'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var secret = exports.secret = '@MiClaveSecreta';
var mongoDB = exports.mongoDB = process.env.mongoDB || 'mongodb://localhost:27017/platzi-overflow';
var port = exports.port = process.env.PORT || 3000;