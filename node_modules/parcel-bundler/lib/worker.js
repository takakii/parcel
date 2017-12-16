'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('v8-compile-cache');
const fs = require('./utils/fs');
const Parser = require('./Parser');
const babel = require('./transforms/babel');

let parser;

function emit(event, ...args) {
  process.send({ event, args });
}

exports.init = function (options, callback) {
  parser = new Parser(options || {});
  callback();
};

exports.run = (() => {
  var _ref = _asyncToGenerator(function* (path, pkg, options, callback) {
    try {
      var asset = parser.getAsset(path, pkg, options);
      yield asset.process();

      callback(null, {
        dependencies: Array.from(asset.dependencies.values()),
        generated: asset.generated,
        hash: asset.hash
      });
    } catch (err) {
      if (asset) {
        err = asset.generateErrorMessage(err);
      }

      err.fileName = path;
      callback(err);
    }
  });

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();