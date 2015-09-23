function InputValueCheckedHook (value, isReadOnly) {
  this.value = value
  this.isReadOnly = isReadOnly
}

InputValueCheckedHook.prototype = {
  type: `InputValueCheckedHook`,

  hook (node, prop, prev) {
    node.addEventListener('keyup', (ev) => {
      node;prev;prop;this;
      debugger
    })

    // if (prev && prev.type === 'InputValueCheckedHook' &&
    //   prev.value === this.value &&
    //   prev.namespace === this.namespace) {
    //   return;
    // }

    // debugger

    // node.setAttributeNS(this.namespace, prop, this.value);
  },

}

module.exports = InputValueCheckedHook
