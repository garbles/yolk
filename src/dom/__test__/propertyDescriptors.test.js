import document from 'global/document'
import {descriptors} from '../propertyDescriptors'

function generateRandomNumber () {
  return (Math.random() * 0x10000000)
}

function generateRandomString () {
  return generateRandomNumber().toString(36)
}

function falsyString (value) {
  switch (typeof value) {
  case `undefined`:
    return `undefined`
  case `false`:
    return `false`
  case `string`:
    return value.length ? value : `""`
  default:
    return false
  }
}

const createTests = setter => (truthy, falsy) => prop => {
  const tString = truthy.toString()
  const fString = falsyString(falsy)
  const el = document.createElement(`div`)
  const key = prop.computed
  let value = el.getAttribute(key) || el[key]

  assert.notOk(
    value,
    key + ` is not set truthy by default`
  )

  setter(el, key, truthy)
  value = el.getAttribute(key) || el[key]
  assert.ok(
    value === truthy || value === tString,
    key + ` is ` + tString + ` when set to ` + tString
  )

  setter(el, key, falsy)
  value = el.getAttribute(key) || el[key]
  assert.notOk(
    value === truthy || value === tString,
    key + ` is not ` + tString + ` when set to ` + fString
  )
}

const attributeSetter = (el, key, value) => el.setAttribute(key, value)
const equalSetter = (el, key, value) => el[key] = value

const setBooleanWithFunctionTest = createTests(attributeSetter)(true, false)
const setNumberWithFunctionTest = createTests(attributeSetter)(generateRandomNumber(), undefined)
const setStringWithFunctionTest = createTests(attributeSetter)(generateRandomString(), ``)
const setBooleanWithEqualsTest = createTests(equalSetter)(true, false)
const setNumberWithEqualsTest = createTests(equalSetter)(generateRandomNumber(), undefined)
const setStringWithEqualsTest = createTests(equalSetter)(generateRandomString(), ``)

describe(`propertDescriptors`, () => {
  it(`accurately describes how all props are attached/detached to a node`, () => {
    Object.keys(descriptors).forEach(key => {
      const prop = descriptors[key]

      if (key === `style` || prop.isStar) {
        return // ignore
      }

      switch (true) {
      case (prop.useSetAttribute && prop.useEqualSetter):
        throw new Error(`${key} can\`t have two setters!`)
      case (prop.useEqualSetter && prop.hasBooleanValue):
        setBooleanWithEqualsTest(prop)
        break
      case (prop.useEqualSetter && prop.hasNumberValue):
        setNumberWithEqualsTest(prop)
        break
      case (prop.useEqualSetter):
        setStringWithEqualsTest(prop)
        break
      case (prop.useSetAttribute && prop.hasBooleanValue):
        setBooleanWithFunctionTest(prop)
        break
      case (prop.useSetAttribute && prop.hasNumberValue):
        setNumberWithFunctionTest(prop)
        break
      case (prop.useSetAttribute):
        setStringWithFunctionTest(prop)
        break
      default:
        throw new Error(`${key} does not have setter!`)
      }
    })
  })
})
