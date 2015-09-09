const kababCase = require(`lodash.kebabcase`)

const HAS_LOWER_CASE = 0x1
const HAS_DASH_CASE = 0x2
const IS_ATTRIBUTE = 0x4

function checkMask (value, bitmask) {
  return (value & bitmask) === bitmask
}

const properties = {
  // inferred by virtual-dom
  className: null,
  id: null,
  style: null,

  // attributes
  accept: IS_ATTRIBUTE,
  acceptCharset: IS_ATTRIBUTE | HAS_DASH_CASE,
  accessKey: IS_ATTRIBUTE | HAS_LOWER_CASE,
  action: IS_ATTRIBUTE,
  align: IS_ATTRIBUTE,
  alt: IS_ATTRIBUTE,
  async: IS_ATTRIBUTE,
  autoComplete: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoFocus: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoPlay: IS_ATTRIBUTE | HAS_LOWER_CASE,
  autoSave: IS_ATTRIBUTE | HAS_LOWER_CASE,
  bgColor: IS_ATTRIBUTE | HAS_LOWER_CASE,
  border: IS_ATTRIBUTE,
  buffered: IS_ATTRIBUTE,
  challenge: IS_ATTRIBUTE,
  charset: IS_ATTRIBUTE,
  checked: IS_ATTRIBUTE,
  cite: IS_ATTRIBUTE,
  code: IS_ATTRIBUTE,
  codebase: IS_ATTRIBUTE,
  color: IS_ATTRIBUTE,
  cols: IS_ATTRIBUTE,
  colSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  content: IS_ATTRIBUTE,
  contentEditable: IS_ATTRIBUTE | HAS_LOWER_CASE,
  contextMenu: IS_ATTRIBUTE | HAS_LOWER_CASE,
  controls: IS_ATTRIBUTE,
  coords: IS_ATTRIBUTE,
  dateTime: IS_ATTRIBUTE | HAS_LOWER_CASE,
  default: IS_ATTRIBUTE,
  defer: IS_ATTRIBUTE,
  dir: IS_ATTRIBUTE,
  dirName: IS_ATTRIBUTE | HAS_LOWER_CASE,
  disabled: IS_ATTRIBUTE,
  download: IS_ATTRIBUTE,
  draggable: IS_ATTRIBUTE,
  dropZone: IS_ATTRIBUTE | HAS_LOWER_CASE,
  email: IS_ATTRIBUTE,
  encType: IS_ATTRIBUTE | HAS_LOWER_CASE,
  file: IS_ATTRIBUTE,
  for: IS_ATTRIBUTE,
  form: IS_ATTRIBUTE,
  formAction: IS_ATTRIBUTE | HAS_LOWER_CASE,
  headers: IS_ATTRIBUTE,
  height: IS_ATTRIBUTE,
  hidden: IS_ATTRIBUTE,
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
  list: IS_ATTRIBUTE,
  loop: IS_ATTRIBUTE,
  low: IS_ATTRIBUTE,
  manifest: IS_ATTRIBUTE,
  max: IS_ATTRIBUTE,
  maxLength: IS_ATTRIBUTE | HAS_LOWER_CASE,
  media: IS_ATTRIBUTE,
  method: IS_ATTRIBUTE,
  min: IS_ATTRIBUTE,
  multiple: IS_ATTRIBUTE,
  name: IS_ATTRIBUTE,
  noValidate: IS_ATTRIBUTE | HAS_LOWER_CASE,
  open: IS_ATTRIBUTE,
  optimum: IS_ATTRIBUTE,
  password: IS_ATTRIBUTE,
  pattern: IS_ATTRIBUTE,
  ping: IS_ATTRIBUTE,
  placeholder: IS_ATTRIBUTE,
  poster: IS_ATTRIBUTE,
  preload: IS_ATTRIBUTE,
  pubdate: IS_ATTRIBUTE,
  radioGroup: IS_ATTRIBUTE | HAS_LOWER_CASE,
  readOnly: IS_ATTRIBUTE | HAS_LOWER_CASE,
  rel: IS_ATTRIBUTE,
  required: IS_ATTRIBUTE,
  reversed: IS_ATTRIBUTE,
  rows: IS_ATTRIBUTE,
  rowSpan: IS_ATTRIBUTE | HAS_LOWER_CASE,
  sandbox: IS_ATTRIBUTE,
  scope: IS_ATTRIBUTE,
  scoped: IS_ATTRIBUTE,
  seamless: IS_ATTRIBUTE,
  selected: IS_ATTRIBUTE,
  shape: IS_ATTRIBUTE,
  size: IS_ATTRIBUTE,
  sizes: IS_ATTRIBUTE,
  span: IS_ATTRIBUTE,
  spellCheck: IS_ATTRIBUTE | HAS_LOWER_CASE,
  src: IS_ATTRIBUTE,
  srcDoc: IS_ATTRIBUTE | HAS_LOWER_CASE,
  srcLang: IS_ATTRIBUTE | HAS_LOWER_CASE,
  srcSet: IS_ATTRIBUTE | HAS_LOWER_CASE,
  start: IS_ATTRIBUTE,
  step: IS_ATTRIBUTE,
  summary: IS_ATTRIBUTE,
  tabIndex: IS_ATTRIBUTE | HAS_LOWER_CASE,
  target: IS_ATTRIBUTE,
  text: IS_ATTRIBUTE,
  title: IS_ATTRIBUTE,
  type: IS_ATTRIBUTE,
  useMap: IS_ATTRIBUTE | HAS_LOWER_CASE,
  value: IS_ATTRIBUTE,
  width: IS_ATTRIBUTE,
  wrap: IS_ATTRIBUTE,

  // events
  onAbort: HAS_LOWER_CASE,
  onBlur: HAS_LOWER_CASE,
  onCanPlay: HAS_LOWER_CASE,
  onCanPlayThrough: HAS_LOWER_CASE,
  onChange: HAS_LOWER_CASE,
  onClick: HAS_LOWER_CASE,
  onContextMenu: HAS_LOWER_CASE,
  onCopy: HAS_LOWER_CASE,
  onCueChange: HAS_LOWER_CASE,
  onCut: HAS_LOWER_CASE,
  onDblClick: HAS_LOWER_CASE,
  onDrag: HAS_LOWER_CASE,
  onDragEnd: HAS_LOWER_CASE,
  onDragEnter: HAS_LOWER_CASE,
  onDragLeave: HAS_LOWER_CASE,
  onDragOver: HAS_LOWER_CASE,
  onDragStart: HAS_LOWER_CASE,
  onDrop: HAS_LOWER_CASE,
  onDurationChange: HAS_LOWER_CASE,
  onEmptied: HAS_LOWER_CASE,
  onEnded: HAS_LOWER_CASE,
  onError: HAS_LOWER_CASE,
  onFocus: HAS_LOWER_CASE,
  onInput: HAS_LOWER_CASE,
  onInvalid: HAS_LOWER_CASE,
  onKeyDown: HAS_LOWER_CASE,
  onKeyPress: HAS_LOWER_CASE,
  onKeyUp: HAS_LOWER_CASE,
  onLoadedData: HAS_LOWER_CASE,
  onLoadedMetaData: HAS_LOWER_CASE,
  onLoadStart: HAS_LOWER_CASE,
  onMouseDown: HAS_LOWER_CASE,
  onMouseMove: HAS_LOWER_CASE,
  onMouseOut: HAS_LOWER_CASE,
  onMouseOver: HAS_LOWER_CASE,
  onMouseUp: HAS_LOWER_CASE,
  onPaste: HAS_LOWER_CASE,
  onPause: HAS_LOWER_CASE,
  onPlay: HAS_LOWER_CASE,
  onPlaying: HAS_LOWER_CASE,
  onProgress: HAS_LOWER_CASE,
  onRateChange: HAS_LOWER_CASE,
  onReset: HAS_LOWER_CASE,
  onScroll: HAS_LOWER_CASE,
  onSearch: HAS_LOWER_CASE,
  onSeeked: HAS_LOWER_CASE,
  onSeeking: HAS_LOWER_CASE,
  onSelect: HAS_LOWER_CASE,
  onShow: HAS_LOWER_CASE,
  onStalled: HAS_LOWER_CASE,
  onSubmit: HAS_LOWER_CASE,
  onSuspend: HAS_LOWER_CASE,
  onTimeUpdate: HAS_LOWER_CASE,
  onToggle: HAS_LOWER_CASE,
  onVolumeChange: HAS_LOWER_CASE,
  onWaiting: HAS_LOWER_CASE,
  onWheel: HAS_LOWER_CASE
}

const keys = Object.keys(properties)
const length = keys.length
const isStandard = true
let propertiesWithInfo = {}
let i = -1

while (++i < length) {
  const key = keys[i]
  const property = properties[key]
  const hasLowerCase = checkMask(property, HAS_LOWER_CASE)
  const hasDashCase = checkMask(property, HAS_DASH_CASE)
  const isAttribute = checkMask(property, IS_ATTRIBUTE)
  let computed

  if (hasLowerCase) {
    computed = key.toLowerCase()
  } else if (hasDashCase) {
    computed = kababCase(key)
  } else {
    computed = key
  }

  propertiesWithInfo[key] = {
    hasLowerCase,
    hasDashCase,
    isAttribute,
    isStandard,
    computed
  }
}

module.exports = propertiesWithInfo
