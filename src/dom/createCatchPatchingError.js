/* @flow */

export function createCatchPatchingError (vnode: VirtualElement): Function {
  return (err: Error): void => {
    const {name, message} = err

    throw new Error(name, `Uncaught error while patching ${vnode.tagName}[key=${vnode.key}]: ${message}`)
  }
}
