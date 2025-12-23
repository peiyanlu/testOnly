function Log() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value
    
    console.log(target, propertyKey)
    descriptor.value = function (...args: any[]) {
      console.log(`[LOG] ${ propertyKey } called with arguments:`, args)
      return originalMethod.apply(this, args)
    }
    
    return descriptor
  }
}

function Test() {
  return function (target: any, propertyKey: string) {
    console.log(target, propertyKey)
    console.log(`[LOG] ${ propertyKey } called with arguments: ${ propertyKey }`)
  }
}

class Example {
  @Test()
  age: number = 18
  
  @Log()
  sayHello(name: string, age?: number) {
    console.log(`Hello, ${ name }! Age: ${ age }`)
  }
}

const example = new Example()
example.sayHello('Alice', 25)
