const Symbol = global.Symbol

const symbols = {
  $$virtual: `@@YOLK_VIRTUAL`,
  $$componentUid: `@@YOLK_COMPONENT_UID`,
  $$root: `@@YOLK_ROOT`
}

if (typeof Symbol === `function`) {
  if (typeof Symbol.for === `function`) {
    Object.keys(symbols).forEach(key => symbols[key] = Symbol.for(symbols[key]))
  } else {
    Object.keys(symbols).forEach(key => symbols[key] = Symbol(symbols[key]))
  }
}

export const {$$virtual, $$componentUid, $$root} = symbols
