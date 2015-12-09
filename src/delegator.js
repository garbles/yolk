import { default as domDelegator } from 'dom-delegator'
import { default as EventsList } from './EventsList'

export default function delegator (node) {
  const instance = domDelegator(node)

  const length = EventsList.length
  let i = -1

  while (++i < length) {
    instance.listenTo(EventsList[i].toLowerCase())
  }

  return instance
}
