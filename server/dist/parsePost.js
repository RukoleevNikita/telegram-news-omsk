'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPosts = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var getPosts = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(links) {
        var count, posts, i, post;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        count = links.length;
                        posts = [];
                        i = 0;

                    case 3:
                        if (!(i < count)) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 6;
                        return parsePost(links[i], _configs.elems.bk55).then(function (post) {
                            return post;
                        });

                    case 6:
                        post = _context.sent;

                        posts.push(post);
                        _context.next = 10;
                        return log(i + 1, count, 2000);

                    case 10:
                        i++;
                        _context.next = 3;
                        break;

                    case 13:
                        return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                            if (!posts.length) reject({ empty: 'empty' });
                            resolve(posts);
                        }));

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getPosts(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _configs = require('./configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = function log(i, count, ms) {
    return new _promise2.default(function (r) {
        return setTimeout(function () {
            console.log('\n                \u0418\u043D\u0434\u0435\u043A\u0441: ' + i + ';\n                \u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439: ' + count + ';\n            ');
            r();
        }, ms);
    });
}; // вспомогательные пакеты
// unirest
// cheerio

function parsePost(url, elems) {
    return new _promise2.default(function (resolve, reject) {

        _unirest2.default.get(url).end(function (_ref) {
            var body = _ref.body,
                error = _ref.error;


            if (error) reject(error);

            var $ = _cheerio2.default.load(body);

            var domain = url.match(/\/\/(.*?)\//)[1];
            var title = $(elems.title).text(); // .trim() - убираем лишние отступы 
            // const articleDate = $('.article-date').text();
            var image = 'https:' + $(elems.image).attr('src'); // attr('src') берём атрибут у img и добовляем домен
            image = image.indexOf('http') >= 0 ? image : 'http://' + domain + image;
            var text = $(elems.text).text().trim();
            // const view = $(viewClass).text().trim(); // не правильно считывает

            var post = {
                title: title,
                image: image,
                text: text
                // view: view
            };
            resolve(post);
        });
    });
};

// парсим все блоки с превью новости
function parseLinks(url, className) {
    var maxLinks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

    return new _promise2.default(function (resolve, reject) {

        var links = [];

        _unirest2.default.get(url).end(function (_ref2) {
            var body = _ref2.body,
                error = _ref2.error;

            if (error) reject(error);

            var $ = _cheerio2.default.load(body);

            var domain = url.match(/\/\/(.*?)\//)[1];
            $(className).each(function (i, e) {
                if (i + 1 <= maxLinks) {
                    var link = $(e).attr('href');

                    link = link.indexOf('https') >= 0 ? link : 'http://' + domain + link;
                    links.push(link);
                }
            });
            resolve(links);
            if (!links.length) reject({ error: 'empty links' });
        });
    });
};

;

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;