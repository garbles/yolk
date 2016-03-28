const Symbol = global.Symbol

if (typeof Symbol === `function`) {
  if (!Symbol.observable) {
    if (typeof Symbol.for === `function`) {
      exports.$$virtual = Symbol.for(`@@virtual`)
      exports.$$componentUid = Symbol.for(`@@virtualComponentUid`)
    } else {
      exports.$$virtual = Symbol(`@@virtual`)
      exports.$$componentUid = Symbol(`@@virtualComponentUid`)
    }
  }
} else {
  exports.$$virtual = `@@virtual`
  exports.$$componentUid = `@@virtualComponentUid`
}
