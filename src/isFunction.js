export default function isFunction (obj) {
  return Object.prototype.toString.call(obj) === `[object Function]`
}
