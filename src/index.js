import {h} from './h'
import {render} from './render'

function Yolk () {}
Yolk.prototype = {h, render}

export {h}
export {render}
export default new Yolk()
