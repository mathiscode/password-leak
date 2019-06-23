"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _axios = _interopRequireDefault(require("axios"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(password) {
    var digest, firstFive, _ref2, data, results, found;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!password || password === '')) {
              _context.next = 2;
              break;
            }

            throw new Error('You must provide a password');

          case 2:
            digest = _crypto["default"].createHash('sha1').update(password).digest('hex').toUpperCase();
            firstFive = digest.substr(0, 5);
            _context.next = 6;
            return _axios["default"].get("https://api.pwnedpasswords.com/range/".concat(firstFive));

          case 6:
            _ref2 = _context.sent;
            data = _ref2.data;
            results = data.split('\r\n');
            found = false;
            results.forEach(function (result) {
              var parts = result.split(':');
              if (digest === "".concat(firstFive).concat(parts[0])) found = true;
            });
            return _context.abrupt("return", found);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;