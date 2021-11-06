'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _parsePost = require('./parsePost');

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { elems  } from "./configs";

var urlPage = 'https://bk55.ru/';

var saveResult = function saveResult(json) {
    json = _iconvLite2.default.decode(Buffer.from(json), 'utf8');
    _fs2.default.writeFile('result.json', json, function (err) {
        if (err) console.log('Not saved');
    });
};

(0, _parsePost.parseLinks)(urlPage, '.news-block h2 a', 5).then(function (links) {
    (0, _parsePost.getPosts)(links).then(function (posts) {
        return saveResult((0, _stringify2.default)(posts, 0, 4)).catch(function (e) {
            return console.log(e);
        });
    });
}).catch(function (e) {
    return console.log(e);
});