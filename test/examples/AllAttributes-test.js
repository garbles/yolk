import { default as test } from 'tape'
import { h, Rx } from 'yolk' // eslint-disable-line no-unused-vars
import { default as renderInDoc } from '../helpers/renderInDoc'

const booleanTestPairs = [true, `true`, false, `false`, `${Math.random()}`, undefined, `true`, undefined, `false`, undefined]
const booleanSoftTestPairs = [true, `true`, false, `false`, true, `true`]
const booleanPropertyTestPairs = [true, true, `true`, true, false, false, `false`, false, `other`, false, undefined, false]

const randomStringTestPairs = (() => {
  let arr = []
  let i = -1

  while (++i < 3) {
    const random = (Math.random() * 0x10000000).toString(36)
    arr = arr.concat([random, random])
  }

  return arr
})()

const randomNumberTestPairs = (() => {
  let arr = []
  let i = -1

  while (++i < 3) {
    const random = Math.floor(Math.random() * 0x10000000)
    arr = arr.concat([random, random.toString(), random.toString(), random.toString()])
  }

  return arr
})()

const randomURLTestPairs = (() => {
  let arr = []
  let i = -1

  while (++i < 3) {
    const random = `https://${(Math.random() * 0x10000000).toString(36)}.com`
    arr = arr.concat([random, random])
  }

  return arr
})()

const testTable = [
// | attribute | computed | input | expected | update | new expected |
[`className`, `className`, `a b c d`, `a b c d`, `a e`, `a e`, [`a`], `a`, [`a`, `x`], `a x`],
[`id`, `id`, ...randomStringTestPairs],
[`accept`, `accept`, `jpg,mp3`, `jpg,mp3`, `gif`, `gif`],
[`acceptCharset`, `accept-charset`, `ISO-8859-1`, `ISO-8859-1`, `ISO-8859-2`, `ISO-8859-2`],
[`accessKey`, `accesskey`, ...randomStringTestPairs],
[`action`, `action`, ...randomURLTestPairs],
[`align`, `align`, `center`, `center`, `left`, `left`],
[`alt`, `alt`, ...randomStringTestPairs],
[`async`, `async`, ...booleanTestPairs],
[`autoComplete`, `autocomplete`, `on`, `on`, `off`, `off`],
[`autoFocus`, `autofocus`, ...booleanTestPairs],
[`autoPlay`, `autoplay`, ...booleanTestPairs],
[`autoSave`, `autosave`, ...randomStringTestPairs],
[`bgColor`, `bgcolor`, ...randomStringTestPairs],
[`border`, `border`, ...randomNumberTestPairs],
[`cite`, `cite`, ...randomURLTestPairs],
[`codeBase`, `codebase`, ...randomURLTestPairs],
[`color`, `color`, ...randomStringTestPairs],
[`colSpan`, `colspan`, ...randomNumberTestPairs],
[`content`, `content`, ...randomStringTestPairs],
[`contentEditable`, `contenteditable`, ...booleanTestPairs],
[`coords`, `coords`, `0,0,82,126`, `0,0,82,126`, `0,0`, `0,0`],
[`default`, `default`, ...booleanTestPairs],
[`defer`, `defer`, ...booleanTestPairs],
[`dir`, `dir`, `rtl`, `rtl`, `auto`, `auto`],
[`dirName`, `dirname`, ...randomStringTestPairs],
[`draggable`, `draggable`, true, `true`, false, `false`],
[`draggable`, `draggable`, `auto`, `auto`, false, `false`],
[`dropZone`, `dropzone`, `copy`, `copy`, `move`, `move`, `link`, `link`],
[`encType`, `enctype`, `text/plain`, `text/plain`, `multipart/form-data`, `multipart/form-data`],
[`for`, `for`, ...randomStringTestPairs],
[`headers`, `headers`, ...randomStringTestPairs],
[`height`, `height`, ...randomStringTestPairs],
[`hidden`, `hidden`, undefined, false, `random`, false, true, `true`, `true`, false, `false`, false],
[`href`, `href`, ...randomStringTestPairs],
[`hrefLang`, `hreflang`, `en`, `en`, `jp`, `jp`],
[`httpEquiv`, `http-equiv`, ...randomStringTestPairs],
[`icon`, `icon`, ...randomStringTestPairs],
[`isMap`, `isMap`, ...booleanTestPairs],
[`itemProp`, `itemProp`, ...randomStringTestPairs],
[`keyType`, `keyType`, `rsa`, `rsa`, `ec`, `ec`],
[`kind`, `kind`, `captions`, `captions`, `metadata`, `metadata`],
[`label`, `label`, ...randomStringTestPairs],
[`lang`, `lang`, `en`, `en`, `jp`, `jp`],
[`max`, `max`, ...randomNumberTestPairs],
[`method`, `method`, `get`, `get`, `post`, `post`],
[`min`, `min`, ...randomNumberTestPairs],
[`name`, `name`, ...randomStringTestPairs],
[`noValidate`, `noValidate`, ...booleanTestPairs],
[`open`, `open`, ...booleanTestPairs],
[`optimum`, `optimum`, ...randomNumberTestPairs],
[`pattern`, `pattern`, ...randomStringTestPairs],
[`ping`, `ping`, ...randomURLTestPairs],
[`placeholder`, `placeholder`, ...randomStringTestPairs],
[`poster`, `poster`, ...randomURLTestPairs],
[`preload`, `preload`, `auto`, `auto`, `metadata`, `metadata`],
[`radioGroup`, `radiogroup`, ...randomStringTestPairs],
[`rel`, `rel`, `help`, `help`, `next`, `next`],
[`required`, `required`, ...booleanTestPairs],
[`reversed`, `reversed`, ...booleanTestPairs],
[`role`, `role`, ...randomStringTestPairs],
[`rowSpan`, `rowspan`, ...randomNumberTestPairs],
[`sandbox`, `sandbox`, `allow-forms`, `allow-forms`, `allow-scripts, allow-forms`, `allow-scripts, allow-forms`],
[`scope`, `scope`, `col`, `col`, `row`, `row`],
[`span`, `span`, ...randomNumberTestPairs],
[`spellCheck`, `spellcheck`, ...booleanSoftTestPairs],
[`src`, `src`, ...randomURLTestPairs],
[`srcLang`, `srcLang`, `en`, `en`, `jp`, `jp`],
[`start`, `start`, ...randomNumberTestPairs],
[`step`, `step`, ...randomNumberTestPairs],
[`summary`, `summary`, ...randomStringTestPairs],
[`tabIndex`, `tabindex`, ...randomNumberTestPairs],
[`target`, `target`, `_blank`, `_blank`, `_top`, `_top`],
[`title`, `title`, ...randomStringTestPairs],
[`type`, `type`, `text`, `text`, `password`, `password`],
[`useMap`, `usemap`, `#a`, `#a`, `#b`, `#b`],
[`width`, `width`, ...randomNumberTestPairs],
[`wrap`, `wrap`, `soft`, `soft`, `hard`, `hard`],
[`allowFullScreen`, `allowfullscreen`, ...booleanTestPairs],
[`allowTransparency`, `allowtransparency`, ...booleanSoftTestPairs],
[`capture`, `capture`, ...booleanTestPairs],
[`charset`, `charset`, ...randomStringTestPairs],
[`challenge`, `challenge`, ...randomStringTestPairs],
[`cols`, `cols`, ...randomNumberTestPairs],
[`contextMenu`, `contextmenu`, ...randomStringTestPairs],
[`dateTime`, `datetime`, `2008-02-14`, `2008-02-14`, `2008-02-15`, `2008-02-15`],
[`form`, `form`, ...randomStringTestPairs],
[`formAction`, `formaction`, ...randomURLTestPairs],
[`formEncType`, `formenctype`, ...randomStringTestPairs],
[`formMethod`, `formmethod`, `get`, `get`, `post`, `post`],
[`formTarget`, `formtarget`, `_self`, `_self`, `_top`, `_top`],
[`frameBorder`, `frameborder`, 1, `1`, `0`, `0`],
[`inputMode`, `inputMode`, `verbatim`, `verbatim`, `tel`, `tel`],
[`is`, `is`, ...randomStringTestPairs],
[`list`, `list`, ...randomStringTestPairs],
[`manifest`, `manifest`, ...randomStringTestPairs],
[`maxLength`, `maxlength`, ...randomNumberTestPairs],
[`media`, `media`, ...randomStringTestPairs],
[`minLength`, `minlength`, ...randomNumberTestPairs],
[`rows`, `rows`, ...randomNumberTestPairs],
[`seamless`, `seamless`, ...booleanTestPairs],
[`size`, `size`, ...randomNumberTestPairs],
[`sizes`, `sizes`, `1,2,3`, `1,2,3`, `1,2,3,4`, `1,2,3,4`],
[`srcSet`, `srcSet`, ...randomStringTestPairs],
[`checked`, `checked`,   ...booleanPropertyTestPairs],
[`controls`, `controls`, ...booleanPropertyTestPairs],
[`disabled`, `disabled`, ...booleanPropertyTestPairs],
[`loop`, `loop`, ...booleanPropertyTestPairs],
[`multiple`, `multiple`, ...booleanPropertyTestPairs],
[`readOnly`, `readonly`, ...booleanPropertyTestPairs],
[`selected`, `selected`, ...booleanPropertyTestPairs],
[`srcDoc`, `srcdoc`, ...randomStringTestPairs],
[`value`, `value`, ...randomStringTestPairs],
]

test(`AllAttributes: make sure that all attributes are properly applied`, t => {
  testTable.forEach(([attribute, computed, ...inputOutputPairs]) => {
    const input = inputOutputPairs[0]
    const output = inputOutputPairs[1]
    const value = new Rx.BehaviorSubject(input)
    const props = {[attribute]: value}

    const [node, cleanup] = renderInDoc(<div {...props} />)

    t.equal(node.getAttribute(computed) || node[computed], output, `${attribute}: ${input} -> ${output}`)

    const length = inputOutputPairs.length
    let i = 2

    while (i < length) {
      const newInput = inputOutputPairs[i]
      const newOutput = inputOutputPairs[i + 1]

      value.onNext(newInput)

      t.equal(node.getAttribute(computed) || node[computed], newOutput, `${attribute}: ${newInput} -> ${newOutput}`)

      i += 2
    }

    cleanup()
  })

  t.end()
})
