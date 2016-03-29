const Symbol = global.Symbol

const symbols = {
  $$virtual: `@@YOLK_VIRTUAL`,
  $$componentUid: `@@YOLK_COMPONENT_UID`,
  $$root: `@@YOLK_ROOT`
}

const keys = Object.keys(symbols)

if (typeof Symbol === `function`) {
  if (!Symbol.observable) {
    if (typeof Symbol.for === `function`) {
      keys.forEach(key => exports.$$virtual = Symbol.for(symbols[key]))
    } else {
      keys.forEach(key => exports.$$virtual = Symbol(symbols[key]))
    }
  }
} else {
  keys.forEach(key => exports.$$virtual = symbols[key])
}
