/* @flow */

import document from 'global/document'
import {noop} from '../util/noop'

export class VirtualText {
  text: string;
  constructor (text: string) {
    this.text = text
    Object.freeze(this)
  }

  init (): Text {
    return document.createTextNode(vnode.text)
  }

  create = noop;
}
