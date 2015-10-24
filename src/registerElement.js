const YolkRootComponent = require(`./YolkRootComponent`)
const createElement = require(`./createElement`)
const parseDOMNodeAttributes = require(`./parseDOMNodeAttributes`)

const INSTANCE_KEY = `__YOLK_INSTANCE_KEY__`

module.exports = function registerElement (name, Component) {
  const prototype = Object.create(HTMLElement.prototype)

  prototype.createdCallback = function createdCallback () {
    const attrs = parseDOMNodeAttributes(this.attributes)
    const instance = createElement(Component, attrs)

    this[INSTANCE_KEY] = instance
  }

  prototype.attachedCallback = function attachedCallback () {
    YolkRootComponent.render(this[INSTANCE_KEY], this)
  }

  prototype.detachedCallback = function detachedCallback () {
    this[INSTANCE_KEY].destroy()
  }

  prototype.attributeChangedCallback = function attributeChangedCallback () {
    const attrs = parseDOMNodeAttributes(this.attributes)
    const instance = createElement(Component, attrs)
    instance.update(this[INSTANCE_KEY])
    this[INSTANCE_KEY] = instance
  }

  document.registerElement(name, {prototype})
}
