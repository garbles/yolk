/* @flow */

export const CustomEvent = global.CustomEvent || ((): CustomEvent => {
  const DEFAULT_PARAMS: Object = {bubbles: false, cancelable: false, detail: undefined}

  function _CustomEvent (_event: string, _params?: Object) {
    const params: Object = {...DEFAULT_PARAMS, ..._params}
    const event: CustomEvent = document.createEvent(`CustomEvent`)

    event.initCustomEvent(_event, params.bubbles, params.cancelable, params.detail)
    return event
  }

  return _CustomEvent
})()
