'use strict';

const Asset = require('../Asset');

class VUEAsset extends Asset {
  parse(code) {
    let parts = vueCompiler.parseComponent(code, { pad: true });
  }

  generate() {}
}