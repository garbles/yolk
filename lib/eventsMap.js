const events = [
  `Abort`,
  `Blur`,
  `CanPlay`,
  `CanPlayThrough`,
  `Change`,
  `Click`,
  `ContextMenu`,
  `Copy`,
  `CueChange`,
  `Cut`,
  `DblClick`,
  `Drag`,
  `DragEnd`,
  `DragEnter`,
  `DragLeave`,
  `DragOver`,
  `DragStart`,
  `Drop`,
  `DurationChange`,
  `Emptied`,
  `Ended`,
  `Error`,
  `Focus`,
  `Input`,
  `Invalid`,
  `KeyDown`,
  `KeyPress`,
  `KeyUp`,
  `LoadedData`,
  `LoadedMetaData`,
  `LoadStart`,
  `MouseDown`,
  `MouseMove`,
  `MouseOut`,
  `MouseOver`,
  `MouseUp`,
  `Paste`,
  `Pause`,
  `Play`,
  `Playing`,
  `Progress`,
  `RateChange`,
  `Reset`,
  `Scroll`,
  `Search`,
  `Seeked`,
  `Seeking`,
  `Select`,
  `Show`,
  `Stalled`,
  `Submit`,
  `Suspend`,
  `TimeUpdate`,
  `Toggle`,
  `VolumeChange`,
  `Waiting`,
  `Wheel`
]

let length = events.length
let i = -1
let eventsMap = {}

while (++i < length) {
  const event = events[i]
  eventsMap[`on${event}`] = `on${event.toLowerCase()}`
}

module.exports = eventsMap
