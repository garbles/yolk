# Yolk

A library for rendering asynchronous UIs.

* __Familiar__: Yolk is a small library built on top of [Virtual DOM](https://github.com/Matt-Esch/virtual-dom)
and [RxJS](https://github.com/Reactive-Extensions/RxJS). It exposes a very limited API so that you don't have to spend
weeks getting up to speed. Like React, Yolk components also use JSX to build markup.

* __Asynchronous__: Yolk components will accept plain values or RxJS observables
as input for both properties and children. Access to asynchronous data flows is
a matter of passing them as arguments to a component.

* __Stateless__: Describing both user interactions and values as observable event
streams means that application design becomes entirely declaractive.

### Examples

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

### Installing

To install Yolk, simply include it in your `package.json`

```
npm install yolk --save
```
