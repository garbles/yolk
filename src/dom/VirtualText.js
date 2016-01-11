/* @flow */

import document from 'global/document'

const tagName = `__YOLK_TEXT_TAG_NAME__`

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
  create (__node: Node): void {}
  insert (__node: Node): void {}
  prepatch (__node: Node): void {}
  patch (__next: VirtualNode, __node: Node): void {}
  postpatch (__node: Node): void {}
  predestroy (__node: Node): void {}
  destroy (): void {}
}
