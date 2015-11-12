require(`document-register-element`)

const Rx = require(`rx`)
const createElement = require(`./createElement`)
const registerElement = require(`./registerElement`)
const CustomComponent = require(`./YolkCustomComponent`)
const h = require(`./h`)
const render = require(`./YolkRootComponent`).render

function Yolk () {}
Yolk.prototype = {Rx, CustomComponent, createElement, h, registerElement, render}
Object.freeze(Yolk)

module.exports = new Yolk
