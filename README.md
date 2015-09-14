# yolk

A library for building asynchronous user interfaces.

* __Familiar__: yolk is a small library built on top of [Virtual DOM](https://github.com/Matt-Esch/virtual-dom)
and [RxJS](https://github.com/Reactive-Extensions/RxJS). It exposes a very limited API so that you don't have to spend
weeks getting up to speed. Like React, yolk components also use JSX to build markup.

* __Asynchronous__: yolk components treat RxJS observables as plain values. Asynchronous data sources need only be
wrapped as observables before they can be displayed in components.

* __Stateless__: Describing both user interactions and values as observable event
streams means that application design becomes entirely declaractive.

### TL;DR

Components are functions that return JSX. Rx observables are treated as plain values.

### Examples

Consider the following example for a simple counter. We can write JSX by including the `/** @jsx yolk.createElement */`
pragma at the top of the file,

```js
/** @jsx yolk.createElement */

import yolk from `yolk`

function Counter (props) {

  // map all plus button click events to 1
  const handlePlus = yolk.createEventHandler((ev) => 1, 0)

  // map all minus button click events to -1
  const handleMinus = yolk.createEventHandler((ev) => -1, 0)

  // merge both event streams together and keep a running count of the result
  const count = handlePlus.merge(handleMinus).scan((x, y) => x+y, 0)

  // include the initialValue passed in from props
  const fullCount = count.combineLatest(props.initialValue, (x, y) => x+y)

  return (
    <div>
      <div>
        <button id="plus" onClick={handlePlus}>+</button>
        <button id="minus" onClick={handleMinus}>-</button>
      </div>
      <div>
        <span>Count: {fullCount}</span>
      </div>
    </div>
  )
}

yolk.render(<Counter initialValue={5} />, document.body)
```

By calling `yolk.createEventHandler(<mapFn>, <initialValue>)`, we return a function which also behaves as an observable value.
Notice how the `count` observable object is used in the component template as if it were a plain value.
The `<span>` will always update itself to display the last observed value from `count`.

All component state is captured in the composition of observable event streams and thus, there is no need
make imperative operations such as calling `setState` or mutating variables.

Also see the [yolk implementation of TodoMVC](https://github.com/BrewhouseTeam/yolk-todomvc).

### Creating Event Handlers

Event handlers can be created using `yolk.createEventHandler(<mapFn>, <initialValue>)`. Note that while both `mapFn` and
`initialValue` are optional values, if you are using the event handler to render your view, failing to provide an
`initialValue` will prevent any subcomponent relying on it from rendering correctly on the initial load. Initial values
are not subject to being passed through the `mapFn`.

### Installing

To install yolk, simply include it in your `package.json` along with `rx`,

```
npm install yolk rx --save
```

Or install it with Bower,

```
bower install yolk rx --save
```

[RxJS](https://github.com/Reactive-Extensions/RxJS) is listed as a dependency of this library;
however, it is not included as part of the bundle file.
