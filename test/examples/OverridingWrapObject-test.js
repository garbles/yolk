import { default as test } from 'tape'
import { default as renderInDoc } from '../helpers/renderInDoc'

const Yolk = require(`yolk`)
const {h} = Yolk // eslint-disable-line no-unused-vars

test(`OverridingWrapObject: giving wrapObject special behavior`, t => {
  t.plan(5)

  const oldWO = Yolk.wrapObject
  const SPECIAL = `__SPECIAL_SECRET_PROP_THAT_I_CHECK_FOR__`

  Yolk.wrapObject = (obj, opts) => {
    if (typeof obj[SPECIAL] !== `undefined`) {
      const obj_ = {...obj}
      obj_.width = 50000
      delete obj_[SPECIAL]
      return Yolk.Rx.Observable.just(obj_)
    }

    return oldWO(obj, opts)
  }

  const specialStyle = {height: 5, [SPECIAL]: true}
  const unspecialStyle = {height: 5}

  const [node, cleanup] = renderInDoc(<div style={specialStyle} />)
  const [node2, cleanup2] = renderInDoc(<div style={unspecialStyle} />)

  t.equal(node.style.height, `5px`)
  t.equal(node.style.width, `50000px`)
  t.notOk(node.style[SPECIAL])
  t.equal(node2.style.height, `5px`)
  t.notOk(node2.style.width)

  Yolk.wrapObject = oldWO
  cleanup()
  cleanup2()
})
