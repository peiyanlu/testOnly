function myNew(Fun: Function, ...args: any[]) {
  const obj = Object.create(null)
  obj._proto_ = Fun.prototype
  const res = Fun.apply(obj, args)
  return res instanceof Object ? res : obj
}
