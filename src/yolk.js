require(`document-register-element`)

const Rx = require(`rx`)
const createElement = require(`./createElement`)
const registerElement = require(`./registerElement`)
const CustomComponent = require(`./YolkCustomComponent`)
const render = require(`./YolkRootComponent`).render

function Yolk () {}
Yolk.prototype = {Rx, CustomComponent, createElement, registerElement, render}
Object.freeze(Yolk)

module.exports = new Yolk
