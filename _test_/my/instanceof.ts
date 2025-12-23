// const instanceOf = <I, C extends object>(inst: I, Constructor: C) => {
//   let proto = Object.getPrototypeOf(inst)
//
//   while (proto) {
//     if (proto === Constructor.prototype) {
//       return true
//     }
//     proto = Object.getPrototypeOf(proto)
//   }
//
//   return false
// }

const instanceOf = <T extends object>(
  inst: unknown,
  Constructor: new (...args: any[]) => T,
): inst is T => {
  let proto = Object.getPrototypeOf(inst)
  
  while (proto) {
    if (proto === Constructor.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  
  return false
}


console.log(instanceOf({}, Object))

console.log(instanceOf([], Object))

console.log(instanceOf({}, String))
