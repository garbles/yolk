/* @flow */

import {eventsList} from './eventsList'

const HAS_LOWER_CASE: number = 0x1 // transform key to all lowercase
const HAS_DASHED_CASE: number = 0x2 // transform key to dashed case
const HAS_EVENT_CASE: number = 0x4 // transform key from onClick to click
const USE_EQUAL_SETTER: number = 0x8 // props only settable with =
const USE_SET_ATTRIBUTE: number = 0x10 // props only settable with setAttribute
const USE_EVENT_LISTENER: number = 0x20 // props only settable with addEventListener
const HAS_BOOLEAN_VALUE: number = 0x40 // props can only be booleans
const HAS_NUMBER_VALUE: number = 0x80 // props can only be numbers
const IS_STAR: number = 0x100 // props can be any dashed case, e.g. data-*

const DASHED_CASE_REGEX: RegExp = /(?:^\w|[A-Z]|\b\w|\s+)/g

function checkMask (value: number, bitmask: number): boolean {
  return (value & bitmask) === bitmask
}

function makeDashedCase (letter: string, i: number): string {
  if (+letter === 0) {
    return ``
  }

  if (i === 0) {
    return letter.toLowerCase()
  }

  return `-${letter.toLowerCase()}`
}

function computeName (name: string, hasLowerCase: boolean, hasDashedCase: boolean, hasEventCase: boolean): string {
  if (hasLowerCase) {
    return name.toLowerCase()
  } else if (hasDashedCase) {
    return name.replace(DASHED_CASE_REGEX, makeDashedCase)
  } else if (hasEventCase) {
    return name.substr(2).toLowerCase()
  }

  return name
}

const props: Object = {
  accept: USE_EQUAL_SETTER,
  acceptCharset: USE_EQUAL_SETTER | HAS_DASHED_CASE,
  accessKey: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  action: USE_EQUAL_SETTER,
  align: USE_EQUAL_SETTER,
  alt: USE_EQUAL_SETTER,
  async: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  autoComplete: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  autoFocus: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoPlay: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoSave: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  bgColor: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  border: USE_EQUAL_SETTER,
  checked: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  cite: USE_EQUAL_SETTER,
  className: USE_EQUAL_SETTER,
  color: USE_EQUAL_SETTER,
  colSpan: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  content: USE_EQUAL_SETTER,
  contentEditable: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  controls: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  coords: USE_EQUAL_SETTER,
  default: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  defer: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  dir: USE_EQUAL_SETTER,
  dirName: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  disabled: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  draggable: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  dropZone: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  encType: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  for: USE_EQUAL_SETTER,
  headers: USE_EQUAL_SETTER,
  height: USE_EQUAL_SETTER,
  href: USE_EQUAL_SETTER,
  hrefLang: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  httpEquiv: USE_EQUAL_SETTER | HAS_DASHED_CASE,
  icon: USE_EQUAL_SETTER,
  id: USE_EQUAL_SETTER,
  isMap: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  itemProp: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  keyType: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  kind: USE_EQUAL_SETTER,
  label: USE_EQUAL_SETTER,
  lang: USE_EQUAL_SETTER,
  loop: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  max: USE_EQUAL_SETTER,
  method: USE_EQUAL_SETTER,
  min: USE_EQUAL_SETTER,
  multiple: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  name: USE_EQUAL_SETTER,
  noValidate: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  open: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  optimum: USE_EQUAL_SETTER,
  pattern: USE_EQUAL_SETTER,
  ping: USE_EQUAL_SETTER,
  placeholder: USE_EQUAL_SETTER,
  poster: USE_EQUAL_SETTER,
  preload: USE_EQUAL_SETTER,
  radioGroup: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  readOnly: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  rel: USE_EQUAL_SETTER,
  required: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  reversed: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  role: USE_EQUAL_SETTER,
  rowSpan: USE_EQUAL_SETTER | HAS_LOWER_CASE | HAS_NUMBER_VALUE,
  sandbox: USE_EQUAL_SETTER,
  scope: USE_EQUAL_SETTER,
  seamless: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  selected: USE_EQUAL_SETTER | HAS_BOOLEAN_VALUE,
  span: USE_EQUAL_SETTER | HAS_NUMBER_VALUE,
  src: USE_EQUAL_SETTER,
  srcDoc: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  srcLang: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  start: USE_EQUAL_SETTER | HAS_NUMBER_VALUE,
  step: USE_EQUAL_SETTER,
  summary: USE_EQUAL_SETTER,
  tabIndex: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  target: USE_EQUAL_SETTER,
  textContent: USE_EQUAL_SETTER,
  title: USE_EQUAL_SETTER,
  type: USE_EQUAL_SETTER,
  useMap: USE_EQUAL_SETTER | HAS_LOWER_CASE,
  value: USE_EQUAL_SETTER,
  width: USE_EQUAL_SETTER,
  wrap: USE_EQUAL_SETTER,

  allowFullScreen: USE_SET_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  allowTransparency: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  capture: USE_SET_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  charset: USE_SET_ATTRIBUTE,
  challenge: USE_SET_ATTRIBUTE,
  codeBase: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  cols: USE_SET_ATTRIBUTE | HAS_NUMBER_VALUE,
  contextMenu: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  dateTime: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  form: USE_SET_ATTRIBUTE,
  formAction: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  formEncType: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  formMethod: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  formTarget: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  frameBorder: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  hidden: USE_SET_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  inputMode: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  is: USE_SET_ATTRIBUTE,
  list: USE_SET_ATTRIBUTE,
  manifest: USE_SET_ATTRIBUTE,
  maxLength: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  media: USE_SET_ATTRIBUTE,
  minLength: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  rows: USE_SET_ATTRIBUTE | HAS_NUMBER_VALUE,
  size: USE_SET_ATTRIBUTE | HAS_NUMBER_VALUE,
  sizes: USE_SET_ATTRIBUTE,
  srcSet: USE_SET_ATTRIBUTE | HAS_LOWER_CASE,
  style: USE_SET_ATTRIBUTE,

  aria: IS_STAR,
  data: IS_STAR,
}

eventsList.forEach(event => {
  props[`on${event}`] = USE_EVENT_LISTENER | HAS_EVENT_CASE
})

const descriptors: Object = {}
const keys: Array<string> = Object.keys(props)
const len: number = keys.length
let i: number = -1

while (++i < len) {
  const key: string = keys[i]
  const prop: number = props[key]
  const hasLowerCase: boolean = checkMask(prop, HAS_LOWER_CASE)
  const hasDashedCase: boolean = checkMask(prop, HAS_DASHED_CASE)
  const hasEventCase: boolean = checkMask(prop, HAS_EVENT_CASE)
  const useEqualSetter: boolean = checkMask(prop, USE_EQUAL_SETTER)
  const useSetAttribute: boolean = checkMask(prop, USE_SET_ATTRIBUTE)
  const useEventListener: boolean = checkMask(prop, USE_EVENT_LISTENER)
  const hasBooleanValue: boolean = checkMask(prop, HAS_BOOLEAN_VALUE)
  const hasNumberValue: boolean = checkMask(prop, HAS_NUMBER_VALUE)
  const isStar: boolean = checkMask(prop, IS_STAR)
  const computed: string = computeName(key, hasLowerCase, hasDashedCase, hasEventCase)

  descriptors[key] = {
    useEqualSetter,
    useSetAttribute,
    useEventListener,
    hasBooleanValue,
    hasNumberValue,
    isStar,
    computed,
  }
}

export {descriptors}
