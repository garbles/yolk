import type {VirtualNode} from './VirtualNode'
import type {VirtualComponent} from './VirtualComponent'
import type {VirtualText} from './VirtualText'
import type {NodeProxy} from './NodeProxy'
import type {TextProxy} from './TextProxy'

export type VirtualElement = VirtualNode | VirtualComponent | VirtualText
export type VirtualProxy = TextProxy | NodeProxy

export type NodeProxyDecorator = {
  insertChild (child: VirtualNode, index: number): void;
  updateChild (previous: VirtualNode, next: VirtualNode): void;
  moveChild (previous: VirtualNode, next: VirtualNode, index: number): void;
  removeChild (child: VirtualNode): void;
}
