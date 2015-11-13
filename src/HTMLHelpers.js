const createElement = require(`./createElement`)
const HTMLTags = require(`./HTMLTags`)

const boundCreateElement = tagName => (props, ...children) => {
  return createElement(tagName, props, ...children)
}

const helpers = {}
const length = HTMLTags.length
let i = -1

while (++i < length) {
  const tagName = HTMLTags[i]
  helpers[tagName] = boundCreateElement(tagName)
}

module.exports = helpers
