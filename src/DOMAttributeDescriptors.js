const kababCase = require(`lodash.kebabcase`)
const EventsList = require(`./EventsList`)

const HAS_LOWER_CASE = 0x1
const HAS_DASH_CASE = 0x2
const IS_ATTRIBUTE = 0x4
const USE_PROPERTY_HOOK = 0x8
const USE_ATTRIBUTE_HOOK = 0x10
const USE_EVENT_HOOK = 0x20
const CAN_BE_ARRAY_OF_STRINGS = 0x80
const HAS_BOOLEAN_VALUE = 0x100
const IS_STAR = 0x200

function checkMask (value, bitmask) {
  return (value & bitmask) === bitmask
}

const attributes = {
  // inferred by virtual-dom
  className: CAN_BE_ARRAY_OF_STRINGS,
  id: null,
  style: null,

  // attributes
  accept: IS_ATTRIBUTE,
  acceptCharset: IS_ATTRIBUTE | HAS_DASH_CASE,
  accessKey: IS_ATTRIBUTE | HAS_LOWER_CASE,
  action: IS_ATTRIBUTE,
  align: IS_ATTRIBUTE,
  alt: IS_ATTRIBUTE,
  async: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  autoComplete: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoFocus: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoPlay: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoSave: IS_ATTRIBUTE | HAS_LOWER_CASE,
  bgColor: IS_ATTRIBUTE | HAS_LOWER_CASE,
  border: IS_ATTRIBUTE,
  cite: IS_ATTRIBUTE,
  color: IS_ATTRIBUTE,
  colSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  content: IS_ATTRIBUTE,
  contentEditable: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  coords: IS_ATTRIBUTE,
  default: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  defer: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  dir: IS_ATTRIBUTE,
  dirName: IS_ATTRIBUTE | HAS_LOWER_CASE,
  draggable: IS_ATTRIBUTE,
  dropZone: IS_ATTRIBUTE | HAS_LOWER_CASE,
  encType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  for: IS_ATTRIBUTE,
  headers: IS_ATTRIBUTE,
  height: IS_ATTRIBUTE,
  href: IS_ATTRIBUTE,
  hrefLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  httpEquiv: IS_ATTRIBUTE | HAS_DASH_CASE,
  icon: IS_ATTRIBUTE,
  isMap: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  itemProp: IS_ATTRIBUTE | HAS_LOWER_CASE,
  keyType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  kind: IS_ATTRIBUTE,
  label: IS_ATTRIBUTE,
  lang: IS_ATTRIBUTE,
  max: IS_ATTRIBUTE,
  method: IS_ATTRIBUTE,
  min: IS_ATTRIBUTE,
  name: IS_ATTRIBUTE,
  noValidate: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  open: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  optimum: IS_ATTRIBUTE,
  pattern: IS_ATTRIBUTE,
  ping: IS_ATTRIBUTE,
  placeholder: IS_ATTRIBUTE,
  poster: IS_ATTRIBUTE,
  preload: IS_ATTRIBUTE,
  radioGroup: IS_ATTRIBUTE | HAS_LOWER_CASE,
  rel: IS_ATTRIBUTE,
  required: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  reversed: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  role: IS_ATTRIBUTE,
  rowSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  sandbox: IS_ATTRIBUTE,
  scope: IS_ATTRIBUTE,
  span: IS_ATTRIBUTE,
  spellCheck: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  src: IS_ATTRIBUTE,
  srcLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  start: IS_ATTRIBUTE,
  step: IS_ATTRIBUTE,
  summary: IS_ATTRIBUTE,
  tabIndex: IS_ATTRIBUTE | HAS_LOWER_CASE,
  target: IS_ATTRIBUTE,
  title: IS_ATTRIBUTE,
  type: IS_ATTRIBUTE,
  useMap: IS_ATTRIBUTE | HAS_LOWER_CASE,
  width: IS_ATTRIBUTE,
  wrap: IS_ATTRIBUTE,

  // attributes only accessible via attribute namespace
  allowFullScreen: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  allowTransparency: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  capture: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  charset: USE_ATTRIBUTE_HOOK,
  challenge: USE_ATTRIBUTE_HOOK,
  codeBase: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  cols: USE_ATTRIBUTE_HOOK,
  contextMenu: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  dateTime: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  form: USE_ATTRIBUTE_HOOK,
  formAction: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formEncType: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formMethod: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formTarget: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  frameBorder: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  hidden: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  inputMode: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  is: USE_ATTRIBUTE_HOOK,
  list: USE_ATTRIBUTE_HOOK,
  manifest: USE_ATTRIBUTE_HOOK,
  maxLength: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  media: USE_ATTRIBUTE_HOOK,
  minLength: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  rows: USE_ATTRIBUTE_HOOK,
  seamless: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  size: USE_ATTRIBUTE_HOOK,
  sizes: USE_ATTRIBUTE_HOOK,
  srcSet: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,

  // attributes only accessible via setting property in JS
  checked: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  controls: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  disabled: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  loop: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  multiple: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  readOnly: USE_PROPERTY_HOOK | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  selected: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  srcDoc: USE_PROPERTY_HOOK | HAS_LOWER_CASE,
  value: USE_PROPERTY_HOOK,

  // X-* attributes
  data: IS_STAR,
}

// events
let length = EventsList.length
let i = -1

while (++i < length) {
  const event = EventsList[i]
  attributes[`on${event}`] = HAS_LOWER_CASE | USE_EVENT_HOOK
}

const keys = Object.keys(attributes)
const isStandard = true
const DOMAttributeDescriptors = {}
length = keys.length
i = -1

while (++i < length) {
  const key = keys[i]
  const attr = attributes[key]
  const hasLowerCase = checkMask(attr, HAS_LOWER_CASE)
  const hasDashCase = checkMask(attr, HAS_DASH_CASE)
  const isAttribute = checkMask(attr, IS_ATTRIBUTE)
  const usePropertyHook = checkMask(attr, USE_PROPERTY_HOOK)
  const useAttributeHook = checkMask(attr, USE_ATTRIBUTE_HOOK)
  const useEventHook = checkMask(attr, USE_EVENT_HOOK)
  const canBeArrayOfStrings = checkMask(attr, CAN_BE_ARRAY_OF_STRINGS)
  const hasBooleanValue = checkMask(attr, HAS_BOOLEAN_VALUE)
  const isStar = checkMask(attr, IS_STAR)
  let computed

  if (hasLowerCase) {
    computed = key.toLowerCase()
  } else if (hasDashCase) {
    computed = kababCase(key)
  }

  DOMAttributeDescriptors[key] = {
    isAttribute,
    isStandard,
    usePropertyHook,
    useAttributeHook,
    useEventHook,
    canBeArrayOfStrings,
    hasBooleanValue,
    isStar,
    computed,
  }
}

module.exports = DOMAttributeDescriptors
