/* @flow */

export class VirtualText {
  text: string;
  constructor (text: string) {
    this.text = text
    Object.freeze(this)
  }
}
