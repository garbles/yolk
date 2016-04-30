/* @flow */

import document from 'global/document'

export class TextProxy {
  _node: Text;

  constructor (node: Text) {
    this._node = node
  }

  setValue (value : string) : void {
    this._node.nodeValue = value
  }

  static createTextNode (content: string): TextProxy {
    const node: Text = document.createTextNode(content)
    return new TextProxy(node)
  }
}
