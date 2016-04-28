/* @flow */

import {NodeProxy} from './NodeProxy'
import {$$virtual} from './symbol'
import {set} from './set'

export class VirtualText {
  key: void;
  tagName: string;
  _content: string;
  _proxy: NodeProxy;

  constructor (content: string) {
    this._content = content
  }

  getProxy (): NodeProxy {
    return this._proxy
  }

  initialize (): void {
    this._proxy = NodeProxy.createTextNode(this._content)
  }

  patch (next: VirtualText): void {
    const proxy: NodeProxy = next._proxy = this._proxy
    proxy.setAttribute(`textContent`, next._content)
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
