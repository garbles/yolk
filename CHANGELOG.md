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
