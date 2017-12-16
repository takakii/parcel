'use strict';

var _require = require('path');

const dirname = _require.dirname;

const resolve = require('resolve');

const cache = new Map();

module.exports = function (name, path) {
  let basedir = dirname(path);
  let key = basedir + ':' + name;
  let resolved = cache.get(key);
  if (!resolved) {
    resolved = resolve.sync(name, { basedir });
    cache.set(key, resolved);
  }

  return require(resolved);
};