class RenderCache {
  constructor () {
    this.keys = []
    this.values = []
  }

  getInstance (node, componentName) {
    let index = this.keys.indexOf(node)

    return (index > -1 && this.values[index] && this.values[index][componentName]) || null
  }

  setInstance (node, instance, child) {
    let index = this.keys.indexOf(node)

    if (index === -1) {
      this.keys.push(node)
      index = this.keys.length - 1
    }

    this.values[index] || (this.values[index] = {})
    this.values[index][instance.name] = {instance, child}

    return instance
  }
}

module.exports = RenderCache;
