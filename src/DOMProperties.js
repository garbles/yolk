const kababCase = require(`lodash.kebabcase`)

const HAS_LOWER_CASE = 0x1
const HAS_DASH_CASE = 0x2
const IS_ATTRIBUTE = 0x4
const USE_PROPERTY_HOOK = 0x8
const USE_ATTRIBUTE_HOOK = 0x10
const USE_EVENT_HOOK = 0x20
const USE_CUSTOM_EVENT_HOOK = 0x40
const CAN_BE_ARRAY_OF_STRINGS = 0x80
const HAS_BOOLEAN_VALUE = 0x100

function checkMask (value, bitmask) {
  return (value & bitmask) === bitmask
}

const properties = {
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
  autoFocus: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoPlay: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  autoSave: IS_ATTRIBUTE | HAS_LOWER_CASE,
  bgColor: IS_ATTRIBUTE | HAS_LOWER_CASE,
  border: IS_ATTRIBUTE,
  buffered: IS_ATTRIBUTE,
  cite: IS_ATTRIBUTE,
  code: IS_ATTRIBUTE,
  codebase: IS_ATTRIBUTE,
  color: IS_ATTRIBUTE,
  colSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  content: IS_ATTRIBUTE,
  contentEditable: IS_ATTRIBUTE | HAS_LOWER_CASE,
  coords: IS_ATTRIBUTE,
  default: IS_ATTRIBUTE,
  defer: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  dir: IS_ATTRIBUTE,
  dirName: IS_ATTRIBUTE | HAS_LOWER_CASE,
  download: IS_ATTRIBUTE,
  draggable: IS_ATTRIBUTE,
  dropZone: IS_ATTRIBUTE | HAS_LOWER_CASE,
  email: IS_ATTRIBUTE,
  encType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  file: IS_ATTRIBUTE,
  for: IS_ATTRIBUTE,
  headers: IS_ATTRIBUTE,
  height: IS_ATTRIBUTE,
  hidden: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  high: IS_ATTRIBUTE,
  href: IS_ATTRIBUTE,
  hrefLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  httpEquiv: IS_ATTRIBUTE | HAS_DASH_CASE,
  icon: IS_ATTRIBUTE,
  isMap: IS_ATTRIBUTE | HAS_LOWER_CASE,
  itemProp: IS_ATTRIBUTE | HAS_LOWER_CASE,
  keyType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  kind: IS_ATTRIBUTE,
  label: IS_ATTRIBUTE,
  lang: IS_ATTRIBUTE,
  language: IS_ATTRIBUTE,
  low: IS_ATTRIBUTE,
  max: IS_ATTRIBUTE,
  method: IS_ATTRIBUTE,
  min: IS_ATTRIBUTE,
  name: IS_ATTRIBUTE,
  noValidate: IS_ATTRIBUTE | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  open: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  optimum: IS_ATTRIBUTE,
  password: IS_ATTRIBUTE,
  pattern: IS_ATTRIBUTE,
  ping: IS_ATTRIBUTE,
  placeholder: IS_ATTRIBUTE,
  poster: IS_ATTRIBUTE,
  preload: IS_ATTRIBUTE,
  pubdate: IS_ATTRIBUTE,
  radioGroup: IS_ATTRIBUTE | HAS_LOWER_CASE,
  rel: IS_ATTRIBUTE,
  required: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  reversed: IS_ATTRIBUTE,
  rowSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  sandbox: IS_ATTRIBUTE,
  scope: IS_ATTRIBUTE,
  scoped: IS_ATTRIBUTE | HAS_BOOLEAN_VALUE,
  shape: IS_ATTRIBUTE,
  span: IS_ATTRIBUTE,
  spellCheck: IS_ATTRIBUTE | HAS_LOWER_CASE,
  src: IS_ATTRIBUTE,
  srcLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  start: IS_ATTRIBUTE,
  step: IS_ATTRIBUTE,
  summary: IS_ATTRIBUTE,
  tabIndex: IS_ATTRIBUTE | HAS_LOWER_CASE,
  target: IS_ATTRIBUTE,
  text: IS_ATTRIBUTE,
  title: IS_ATTRIBUTE,
  type: IS_ATTRIBUTE,
  useMap: IS_ATTRIBUTE | HAS_LOWER_CASE,
  wrap: IS_ATTRIBUTE,

  // attributes only accessible via attribute namespace
  allowFullScreen: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  allowTransparency: USE_ATTRIBUTE_HOOK, // not downcased
  capture: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  charset: USE_ATTRIBUTE_HOOK,
  challenge: USE_ATTRIBUTE_HOOK,
  cols: USE_ATTRIBUTE_HOOK,
  contextMenu: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  dateTime: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  disabled: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  form: USE_ATTRIBUTE_HOOK,
  formAction: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formEncType: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formMethod: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  formTarget: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  frameBorder: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  inputMode: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  is: USE_ATTRIBUTE_HOOK,
  list: USE_ATTRIBUTE_HOOK,
  manifest: USE_ATTRIBUTE_HOOK,
  maxLength: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  media: USE_ATTRIBUTE_HOOK,
  minLength: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  role: USE_ATTRIBUTE_HOOK,
  rows: USE_ATTRIBUTE_HOOK,
  seamless: USE_ATTRIBUTE_HOOK | HAS_BOOLEAN_VALUE,
  size: USE_ATTRIBUTE_HOOK,
  sizes: USE_ATTRIBUTE_HOOK,
  srcSet: USE_ATTRIBUTE_HOOK | HAS_LOWER_CASE,
  width: USE_ATTRIBUTE_HOOK,
  wmode: USE_ATTRIBUTE_HOOK,

  // attributes only accessible via setting property in JS
  checked: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  controls: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  loop: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  multiple: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  readOnly: USE_PROPERTY_HOOK | HAS_LOWER_CASE | HAS_BOOLEAN_VALUE,
  selected: USE_PROPERTY_HOOK | HAS_BOOLEAN_VALUE,
  srcDoc: USE_PROPERTY_HOOK | HAS_LOWER_CASE,
  value: USE_PROPERTY_HOOK,

  // events
  onAbort: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onBlur: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onCanPlay: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onCanPlayThrough: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onChange: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onClick: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onContextMenu: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onCopy: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onCueChange: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onCut: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDblClick: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDrag: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDragEnd: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDragEnter: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDragLeave: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDragOver: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDragStart: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDrop: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onDurationChange: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onEmptied: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onEnded: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onError: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onFocus: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onInput: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onInvalid: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onKeyDown: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onKeyPress: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onKeyUp: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onLoadedData: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onLoadedMetaData: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onLoadStart: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onMouseDown: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onMouseMove: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onMouseOut: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onMouseOver: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onMouseUp: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onPaste: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onPause: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onPlay: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onPlaying: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onProgress: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onRateChange: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onReset: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onScroll: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onSearch: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onSeeked: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onSeeking: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onSelect: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onShow: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onStalled: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onSubmit: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onSuspend: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onTimeUpdate: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onToggle: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onVolumeChange: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onWaiting: HAS_LOWER_CASE | USE_EVENT_HOOK,
  onWheel: HAS_LOWER_CASE | USE_EVENT_HOOK,

  // custom events
  onMount: USE_CUSTOM_EVENT_HOOK | HAS_LOWER_CASE,
  onUnmount: USE_CUSTOM_EVENT_HOOK | HAS_LOWER_CASE,
}

const keys = Object.keys(properties)
const length = keys.length
const isStandard = true
const propertiesWithInfo = {}
let i = -1

while (++i < length) {
  const key = keys[i]
  const property = properties[key]
  const hasLowerCase = checkMask(property, HAS_LOWER_CASE)
  const hasDashCase = checkMask(property, HAS_DASH_CASE)
  const isAttribute = checkMask(property, IS_ATTRIBUTE)
  const usePropertyHook = checkMask(property, USE_PROPERTY_HOOK)
  const useAttributeHook = checkMask(property, USE_ATTRIBUTE_HOOK)
  const useEventHook = checkMask(property, USE_EVENT_HOOK)
  const useCustomEventHook = checkMask(property, USE_CUSTOM_EVENT_HOOK)
  const canBeArrayOfStrings = checkMask(property, CAN_BE_ARRAY_OF_STRINGS)
  const hasBooleanValue = checkMask(property, HAS_BOOLEAN_VALUE)
  let computed

  if (useEventHook) {
    computed = `ev-${key.substr(2).toLowerCase()}`
  } else if (hasLowerCase) {
    computed = key.toLowerCase()
  } else if (hasDashCase) {
    computed = kababCase(key)
  } else {
    computed = key
  }

  propertiesWithInfo[key] = {
    isAttribute,
    isStandard,
    usePropertyHook,
    useAttributeHook,
    useEventHook,
    useCustomEventHook,
    canBeArrayOfStrings,
    hasBooleanValue,
    computed,
  }
}

module.exports = propertiesWithInfo
