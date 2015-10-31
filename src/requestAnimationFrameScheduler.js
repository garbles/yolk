// rewrite of https://github.com/Reactive-Extensions/RxJS-DOM/blob/master/src/concurrency/requestanimationframescheduler.js

const Rx = require(`rx`)
const {requestAnimFrame, cancelAnimFrame} = require(`./requestAnimationFrame`)
const inherit = require(`./inherit`)
const addProperties = require(`./addProperties`)
const ClearDisposable = require(`./ClearDisposable`)

function RequestAnimationFrameScheduler () {
  Rx.Scheduler.call(this)
}

inherit(RequestAnimationFrameScheduler, Rx.Scheduler)

function scheduleAction (disposable, action, scheduler, state) {
  return () => !disposable.isDisposed && disposable.setDisposable(Rx.Disposable._fixup(action(scheduler, state)))
}

addProperties(RequestAnimationFrameScheduler.prototype, {
  schedule (state, action) {
    let disposable = new Rx.SingleAssignmentDisposable()
    let id = requestAnimFrame(scheduleAction(disposable, action, this, state))

    return new Rx.BinaryDisposable(disposable, new ClearDisposable(cancelAnimFrame, id))
  },

  _scheduleFuture (state, dueTime, action) {
    if (dueTime === 0) {
      return this.schedule(state, action)
    }

    let disposable = new Rx.SingleAssignmentDisposable()
    let id = global.setTimeout(scheduleAction(disposable, action, this, state), dueTime)

    return new Rx.BinaryDisposable(disposable, new ClearDisposable(global.clearTimeout, id))
  },
})

module.exports = new RequestAnimationFrameScheduler()
