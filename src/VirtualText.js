/* @flow */

import {NodeProxy} from './NodeProxy'
import {$$virtual} from './symbol'
import {set} from './set'

export class VirtualText {
  key: void;
  tagName: string;
  _nodeProxy: NodeProxy;

  constructor (content: string) {
    this._content = content
  }

  getNodeProxy (): NodeProxy {
    return this._nodeProxy
  }

  initialize (): void {
    const nodeProxy: NodeProxy = this._nodeProxy = NodeProxy.createTextNode(this._content)
  }

  patch (next: VirtualText): void {
    const nodeProxy = next._nodeProxy = this._nodeProxy
    nodeProxy.setAttribute(`textContent`, next._content)
  }

  afterInsert (): void {}
  beforeDestroy (): void {}
  destroy (): void {}

  static create (content): VirtualText {
    return new VirtualText(content)
  }
}

set(VirtualText.prototype, `key`, null)
set(VirtualText.prototype, `tagName`, `__VIRTUAL_TEXT_NODE__`)
set(VirtualText.prototype, $$virtual, true)
