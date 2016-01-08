/* @flow */

import document from 'global/document'

export class VirtualText {
  text: string;
  constructor (text: string) {
    this.text = text
    Object.freeze(this)
  }

  init (): Text {
    return document.createTextNode(this.text)
  }

  // TODO: type this better
  create (__node: Object): void {}
}
