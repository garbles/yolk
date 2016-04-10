import type {VirtualNode} from './VirtualNode'
import type {VirtualComponent} from './VirtualComponent'

export type VirtualElement = VirtualNode | VirtualComponent

export type NodeProxyDecorator = {
  insertChild (child: VirtualNode, index: number): void;
  updateChild (previous: VirtualNode, next: VirtualNode): void;
  moveChild (previous: VirtualNode, next: VirtualNode, index: number): void;
  removeChild (child: VirtualNode): void;
}
