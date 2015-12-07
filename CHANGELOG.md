# 0.10.0 (December 6, 2015)

- Upgrade to Babel 6
- Make all components accept a single argument rather than two. This now includes injecting
createEventHandler as part of this argument rather than calling `this.createEventHandler`

# 0.9.0 (November 12, 2015)

- Remove `Yolk.createElement` in favor of supercharged `Yolk.h`

# 0.8.1 (November 12, 2015)

- Add `Yolk.h` for doing hyperscript instead of JSX

# 0.8.0 (November 11, 2015)

- Through testing all of the attribute descriptors, I found that several attributes either
has invalid descriptors, were not widely supported, or were not being assigned correctly.
- Added various other event handlers

# 0.7.1 (November 8, 2015)

- Fix nasty bug where anything using `.setAttribute` to set an attribute did not work

# 0.7.0 (November 4, 2015)

- Add Yolk.CustomComponent to wrap custom JavaScript behaviors as Yolk components

# 0.6.1 (October 31, 2015)

- Fix bug where some attributes wouldn't be set

# 0.6.0 (October 31, 2015)

- Remove Yolk.createEventHandler from top level API
  - Forces creating components
  - Handlers are always automatically cleaned up

- Add Yolk.registerElement to register custom HTML tags
