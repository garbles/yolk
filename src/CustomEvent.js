export default global.CustomEvent || (() => {
  const DEFAULT_PARAMS = {bubbles: false, cancelable: false, detail: undefined}

  function CustomEvent (_event, _params) {
    const params = {...DEFAULT_PARAMS, ..._params}
    const event = document.createEvent(`CustomEvent`)

    event.initCustomEvent(_event, params.bubbles, params.cancelable, params.detail)
    return event
  }

  return CustomEvent
})()
