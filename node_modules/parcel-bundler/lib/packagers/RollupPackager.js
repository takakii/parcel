'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs');

var _require = require('path');

const basename = _require.basename;

const Packager = require('./Packager');
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('browser-resolve');

class RollupPackager extends Packager {
  start() {
    if (this.options.hmr) {
      throw new Error('Rollup packager does not support HMR');
    }

    this.assets = new Map();
  }

  addAsset(asset) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // console.log(asset.name);
      _this.assets.set(asset.name, asset);
      _this.entryAsset = asset;
    })();
  }

  end() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log(_this2.assets);
      let res = yield rollup.rollup({
        input: _this2.entryAsset.name,
        plugins: [{
          resolveId: function resolveId(a, b) {
            let asset = _this2.assets.get(b);
            let depAsset = asset && asset.depAssets.get(a);
            if (depAsset) {
              return depAsset.name;
            }
          },
          load: function load(a) {
            let asset = _this2.assets.get(a);
            if (asset) {
              return asset.generated.js;
            }
          }
        }, commonjs({})]
      });

      var _ref = yield res.generate({ format: 'cjs' });

      let code = _ref.code;

      // console.log(g)

      yield _this2.dest.end(code);
    })();
  }
}

module.exports = RollupPackager;