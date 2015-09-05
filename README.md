# Yolk.js

A library for rendering asynchronous UIs.

```js
/** @jsx Yolk.createElement */

import Yolk from `yolk`

function Counter (props, children) {
  const handlePlus = Yolk.createEventHandler()
  const handleMinus = Yolk.createEventHandler()

  const plusOne = handlePlus.map(() => 1)
  const minusOne = handleMinus.map(() => -1)
  const count = plusOne.merge(minusOne).scan((x, y) => x+y, 0)

  return (
    <div>
      <button id="plus" onclick={handlePlus}>+</button>
      <button id="minus" onclick={handleMinus}>-</button>
      <span>Count: {count}</span>
    </div>
  )
}

Yolk.render(<Counter />, document.body)
```
