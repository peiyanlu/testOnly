class Person {
  protected age: number = 18
  
  constructor() {
    
  }
  
  clone() {
    return cloneInstance(this)
  }
}

export const cloneInstance = <T extends {}>(source: T): T => {
  return Object.assign<T, T>(Object.create(Object.getPrototypeOf(source)), source)
}


const person = new Person()


console.log(cloneInstance(person), 'constructor')
console.log(person.clone(), 'constructor')

const obj: Record<string, number> = { a: 1, b: 2 }
const clone = cloneInstance(obj)
clone.c = 122
console.log(obj, clone, 'object')
