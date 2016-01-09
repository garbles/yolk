/* @flow */

import document from 'global/document'

const tagName = `__TEXT__`

export class VirtualText {
  tagName: string;
  text: string;
  constructor (text: string) {
    this.tagName = tagName
    this.text = text
    Object.freeze(this)
  }

  init (): Text {
    return document.createTextNode(this.text)
  }

  // TODO: type this better
  create (__node: Object): void {}
  insert (__node: Object): void {}
  prepatch (__node: Object): void {}
  patch (__next: Object, __node: Object): void {}
  postpatch (__node: Object): void {}
  predestroy (__node: Object): void {}
  destroy (): void {}
}
