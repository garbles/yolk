import { default as Rx } from 'rx'
import { default as transformProperties } from './transformProperties'
import { default as isFunction } from './isFunction'
import { default as flatten } from './flatten'
import { emitMount, emitUnmount } from './mountable'
import { default as parseTag } from './parseTag'
import { default as CompositePropSubject } from './CompositePropSubject'
import { default as YolkBaseInnerComponent } from './YolkBaseInnerComponent'
import { default as Yolk } from './yolk'

const TAG_IS_ONLY_LETTERS = /^[a-zA-Z]*$/

function YolkBaseComponent (tag, props, children) {
  const _props = {...props}
  const _children = children || []

  if (_props.key) {
    this.key = _props.key.toString()
    delete _props.key
  }

  this.name = `YolkBaseComponent_${tag}`
  this.id = tag
  this._props = _props
  this._children = _children
}

YolkBaseComponent.prototype = {
  type: `Widget`,

  init () {
    this._props$ = new CompositePropSubject(this._props)
    this._children$ = new Rx.BehaviorSubject(this._children)
    this._innerComponent = new YolkBaseInnerComponent(this.id)

    const props$ = Yolk.wrapObject(this._props$.asDistinctObservableObject(), {base: true}).map(transformProperties)
    const children$ = this._children$.flatMapLatest(c => Yolk.wrapObject(c, {base: true})).map(flatten)
    const innerComponent = this._innerComponent

    this._disposable =
      props$.combineLatest(children$)
      .subscribe(
        ([props, children]) => innerComponent.update(props, children),
        (err) => {throw err}
      )

    return innerComponent.createVirtualNode()
  },

  postinit (node) {
    this._innerComponent.setNode(node)
    emitMount(node, this._props.onMount)
  },

  update (previous) {
    this._props$ = previous._props$
    this._children$ = previous._children$
    this._disposable = previous._disposable
    this._innerComponent = previous._innerComponent

    this._props$.onNext(this._props)
    this._children$.onNext(this._children)
  },

  predestroy (node) {
    emitUnmount(node, this._props.onUnmount)
  },

  destroy () {
    this._disposable.dispose()

    const children = this._children
    const length = children.length
    let i = -1

    while (++i < length) {
      const child = children[i]
      isFunction(child.destroy) && child.destroy()
    }
  },
}

YolkBaseComponent.create = function createInstance (_tag, _props, children) {
  let tag
  let props

  if (TAG_IS_ONLY_LETTERS.test(_tag)) {
    tag = _tag
    props = _props
  } else {
    const parsed = parseTag(_tag)
    tag = parsed.tag
    props = {..._props, ...parsed.classIds}
  }

  return new YolkBaseComponent(tag, props, children)
}

export default YolkBaseComponent
