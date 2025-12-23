function myNew<C extends new (...args: any[]) => any>(
  constructor: C,
  ...args: ConstructorParameters<C>
): InstanceType<C> {
  const obj = Object.create(constructor.prototype)
  
  const result = constructor.apply(obj, args)
  
  return (typeof result === 'object' && result !== null) ? result : obj
}


function myNew1(Func: Function, ...args: any[]) {
  // 1. 创建一个空对象
  const obj = Object.create(null)
  // 2. 将构造函数原型对象指向新对象原型
  obj.__proto__ = Func.prototype
  // 3. 将构造函数的 this 指向新对象
  const result = Func.apply(obj, args)
  // 4. 根据返回值判断
  return result instanceof Object ? result : obj
}
