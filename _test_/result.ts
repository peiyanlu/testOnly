console.log([] == ![]) // true

console.log(![]) // fase


console.log(1 + 2 + '3')
console.log(1 + '2' + 3)

queueMicrotask(() => {
  console.log('queueMicrotask')
})

setTimeout(()=>{
  console.log('setTimeout')
})

console.log(8888)


console.log(Object.create(null))

console.log(({}) + [])


let a = { n: 1 };
let b = a;
a.x = a = { n: 2 }

console.log(a)
console.log(b)


console.log([ , , , ].length)


console.log(0 in [ undefined ])
console.log(0 in [ , ])
