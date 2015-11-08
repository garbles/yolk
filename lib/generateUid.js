"use strict";

module.exports = function generateUid() {
  return (Math.random() * 0x100000000000000).toString(36);
};