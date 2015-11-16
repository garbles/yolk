require(`document-register-element`)

const Rx = require(`rx`)
const h = require(`./createElement`)
const DOM = require(`./HTMLHelpers`)
const registerElement = require(`./registerElement`)
const CustomComponent = require(`./YolkCustomComponent`)
const render = require(`./YolkRootComponent`).render

function Yolk () {}
Yolk.prototype = {Rx, CustomComponent, DOM, h, registerElement, render}
Object.freeze(Yolk)

module.exports = new Yolk
