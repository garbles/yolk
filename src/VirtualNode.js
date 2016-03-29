/* @flow */

import document from 'global/document'
import {Observable} from 'rxjs/Observable'
import {Subject} from 'rxjs/Subject'
import {NodeProxy} from 'yolk/NodeProxy'
import {wrapText} from 'yolk/wrapText'
import {parseTag} from 'yolk/parseTag'
import {batchInsertMessages} from 'yolk/batchInsertMessages'
import {createPatchProperties} from 'yolk/createPatchProperties'
import {createPatchChildren} from 'yolk/createPatchChildren'
import {createCompositeSubject} from 'yolk/createCompositeSubject'
import {createNodeProps} from 'yolk/createNodeProps'
import {createObservableFromArray} from 'yolk/createObservableFromArray'
import {flatten} from 'yolk/flatten'
import {$$virtual} from 'yolk/symbol'

import 'rxjs/add/operator/map'

const createCompositePropSubject = createCompositeSubject(createNodeProps)
const createCompositeArraySubject = createCompositeSubject(createObservableFromArray)

export class VirtualNode {
  key: string;
  tagName: string;
  _nodeProxy: NodeProxy;
  _props: Object;
  _props$: Subject<Object>;
  _children: Array<VirtualNode>;
  _children$: Subject<Array<VirtualNode>>;
  constructor (tagName: string, props: Object, children: Array<VirtualNode>, key?: string) {
    this.key = key
    this.tagName = tagName
    this._props = props
    this._children = children
    this._nodeProxy = null
    this._props$ = null
    this._children$ = null
    this._subscriptions = []
  }

  getNodeProxy (): NodeProxy {
    return this._nodeProxy
  }

  initialize (): void {
    const nodeProxy: NodeProxy = this._nodeProxy = NodeProxy.createElement(this.tagName)
    const props$: Subject<Object> = this._props$ = createCompositePropSubject(this._props)
    const children$: Subject<Array<VirtualNode>> = this._children$ = createCompositeArraySubject(this._children)

    const nodeProxyDecorator = {
      insertChild (child: VirtualNode, index: number): void {
        return batchInsertMessages(queue => {
          child.initialize()
          nodeProxy.insertChild(child.getNodeProxy(), index)
          queue.push(child)
        })
      },

      updateChild (previous: VirtualNode, next: VirtualNode): void {
        previous.patch(next)
      },

      moveChild (previous: VirtualNode, next: VirtualNode, index: number): void {
        previous.patch(next)
        nodeProxy.insertChild(next.getNodeProxy(), index)
      },

      removeChild (child: VirtualNode): void {
        child.beforeDestroy()
        nodeProxy.removeChild(child.getNodeProxy())
        child.destroy()
      },
    };

    const propSub =
      props$.subscribe(createPatchProperties(nodeProxy))

    const childrenSub =
      children$
        .map(flatten)
        .map(wrapText)
        .subscribe(createPatchChildren(nodeProxyDecorator))

    this._subscriptions.push(propSub)
    this._subscriptions.push(childrenSub)
  }

  afterInsert (): void {
    this._nodeProxy.emitMount(this._props.onMount)
  }

  patch (next: VirtualNode): void {
    next._nodeProxy = this._nodeProxy
    next._props$ = this._props$
    next._children$ = this._children$

    next._props$.next(next._props)
    next._children$.next(next._children)
  }

  beforeDestroy (): void {
    this._nodeProxy.emitUnmount(this._props.onUnmount)
  }

  destroy (): void {
    this._subscriptions.forEach(s => s.unsubscribe())
    this._children.forEach(c => c.destroy())
  }
}

VirtualNode.prototype[$$virtual] = true

export function createElement (_tagName: string, props: Object, children: Array<VirtualNode | Observable>): VirtualNode {
  const tagName: string = parseTag(_tagName, props)
  const key: string = props.key || null

  return new VirtualNode(tagName, props, children, key)
}
