"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* @flow */

var eventsList /*: Array<string>*/ = exports.eventsList = ["Abort", "Blur", "Cancel", "CanPlay", "CanPlayThrough", "Change", "Click", "CompositionStart", "CompositionUpdate", "CompositionEnd", "ContextMenu", "Copy", "CueChange", "Cut", "DblClick", "Drag", "DragEnd", "DragExit", "DragEnter", "DragLeave", "DragOver", "DragStart", "Drop", "DurationChange", "Emptied", "Encrypted", "Ended", "Error", "Focus", "FocusIn", "FocusOut", "Input", "Invalid", "KeyDown", "KeyPress", "KeyUp", "Load", "LoadedData", "LoadedMetaData", "LoadStart", "MouseDown", "MouseEnter", "MouseLeave", "MouseMove", "MouseOut", "MouseOver", "MouseUp", "Paste", "Pause", "Play", "Playing", "Progress", "RateChange", "Reset", "Resize", "Scroll", "Search", "Seeked", "Seeking", "Select", "Show", "Stalled", "Submit", "Suspend", "TimeUpdate", "Toggle", "TouchCancel", "TouchEnd", "TouchMove", "TouchStart", "VolumeChange", "Waiting", "Wheel",

// custom
"Mount", "Unmount"];

var eventListMap /*: Object*/ = exports.eventListMap = eventsList.reduce(function (acc, event) {
  acc["on" + event] = true;
  return acc;
}, {});