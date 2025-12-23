interface MyIterator {
  data: number[];
  
  [Symbol.iterator](): Iterator<number>;
}

const myIterator: MyIterator = {
  data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  [Symbol.iterator]() {
    let idx = 0
    const data = this.data
    return {
      next() {
        if (idx < data.length) {
          return { done: false, value: data[idx++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  },
}

for (const input of myIterator) {
  console.log(input)
}

// ------------------------------------------

function* myGenerator(): Generator<number> {
  yield 1
  yield 2
  yield 3
  yield 4
}

const gen: Generator<number> = myGenerator()
for (const number of gen) {
  console.log(number)
}

// ------------------------------------------

type IteratorMode = 'entries' | 'keys' | 'values'

type ElementType<T, M extends IteratorMode> = M extends 'entries'
  ? [ keyof T, T[keyof T] ]
  : M extends 'keys'
    ? keyof T
    : T[keyof T];

type IterableReturn<T, M extends IteratorMode> = T & Iterable<ElementType<T, M>>;

const makeIterable = <T extends object, M extends IteratorMode>(obj: T, mode: M): IterableReturn<T, M> => {
  const iterable: Iterable<ElementType<T, M>> =
    mode === 'entries'
      ? Object.entries(obj)
      : mode === 'keys'
        ? Object.keys(obj)
        : Object.values(obj)
  
  function* iteratorFactory(): Generator<ElementType<T, M>> {
    for (const item of iterable) {
      yield item
    }
  }
  
  return Object.assign(obj, {
    [Symbol.iterator]: iteratorFactory,
  })
}

const makeIterable1 = <T extends object, M extends IteratorMode>(obj: T, mode: M): IterableReturn<T, M> => {
  let temp: ElementType<T, M>[]
  switch (mode) {
    case 'entries':
      temp = Object.entries(obj) as ElementType<T, M>[]
      break
    case 'keys':
      temp = Object.keys(obj) as ElementType<T, M>[]
      break
    case 'values':
    default:
      temp = Object.values(obj) as ElementType<T, M>[]
      break
  }
  
  const iteratorFactory = (): Iterator<ElementType<T, M>> => {
    let index = 0
    return {
      next(): IteratorResult<ElementType<T, M>> {
        if (index < temp.length) {
          return { done: false, value: temp[index++] }
        } else {
          return { done: true, value: undefined }
        }
      },
    }
  }
  
  return Object.assign(obj, {
    [Symbol.iterator]: iteratorFactory,
  })
}

const make: IterableReturn<{ a: number; b: number; }, 'entries'> = makeIterable({ a: 1, b: 2 }, 'entries')

for (const [ key, val ] of make) {
  console.log(key, val)
}

// ------------------------------------------
