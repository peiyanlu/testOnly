// arr.keys()
const arr = [ 'a', , 'c' ]
const sparseKeys = Object.keys(arr)
const denseKeys = [ ...arr.keys() ]

console.log(arr)
console.log(sparseKeys) // ['0', '2']
console.log(denseKeys)  // [0, 1, 2]


console.log(arr.unshift('5'))
console.log(arr.shift(), 5555)
console.log(arr.pop())
console.log(arr.push(...[ '4' ]))
console.log(arr)


console.log([ 1, 2, 3, 4, 5 ].copyWithin(0, 3, 4))


console.log(Array(100).fill(0).map((_, i) => i + 1))
console.log([ ...Array(101).keys() ].slice(1))

console.log(Array.from(Array(10).keys(), (_,i) => i + 1))

console.log(Array.of(...Array(10).keys()))
