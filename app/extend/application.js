const path = require('path')

const CHAIN = Symbol('onix.chain')

module.exports = {
  get chain() {
    this[CHAIN] = this[CHAIN] || this.onixinfo.lib.Chain.get(this.config.onix.chain)
    return this[CHAIN]
  },
  get onixinfo() {
    return {
      lib: require(path.resolve(this.config.onixinfo.path, 'lib')),
      rpc: require(path.resolve(this.config.onixinfo.path, 'rpc'))
    }
  }
}
