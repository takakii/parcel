'use strict';

const Asset = require('../Asset');

class WASMAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
    this.encoding = null;
  }

  generate() {
    let js = `
      let buf = new Uint8Array(${JSON.stringify(Array.from(this.contents))});
      let m = new WebAssembly.Module(buf);
      module.exports = new WebAssembly.Instance(m).exports;
    `;

    return { js };
  }
}

module.exports = WASMAsset;