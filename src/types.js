import type {VirtualElement} from './VirtualElement'
import type {VirtualComponent} from './VirtualComponent'
import type {VirtualText} from './VirtualText'
import type {ElementProxy} from './ElementProxy'
import type {TextProxy} from './TextProxy'

export type VirtualNode = VirtualElement | VirtualComponent | VirtualText
export type NodeProxy = ElementProxy | TextProxy

export type ElementProxyDecorator = {
  insertChild (child: VirtualNode, index: number): void;
  updateChild (previous: VirtualNode, next: VirtualNode): void;
  moveChild (previous: VirtualNode, next: VirtualNode, index: number): void;
  removeChild (child: VirtualNode): void;
}
