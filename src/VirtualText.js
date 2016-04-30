/* @flow */

import {TextProxy} from './TextProxy'
import {$$virtual} from './symbol'
import {set} from './set'

export class VirtualText {
  key: void;
  tagName: string;
  _content: string;
  _proxy: TextProxy;

  constructor (content: string) {
    this._content = content
  }

  getProxy (): TextProxy {
    return this._proxy
  }

  initialize (): void {
    this._proxy = TextProxy.createTextNode(this._content)
  }

  patch (next: VirtualText): void {
    const proxy: TextProxy = next._proxy = this._proxy
    proxy.setValue(next._content)
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
