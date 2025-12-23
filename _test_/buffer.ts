console.log(new Uint8Array([1, 2, 3, 4, 5]));

// console.log(Buffer)

console.log(Buffer.from(new Uint8Array([ 1, 2, 3, 4, 5 ])).toString('base64'))
console.log(Buffer.from(new Uint8Array([ 1, 2, 3, 4, 5 ])).toString('base64url'))

console.log(Buffer.from('AQIDBAU=', 'base64'))


for (var item of [1,2,3,4,5,6]) {
  setTimeout(() => {
    console.log(item)
  })
}


console.log(btoa('123'))
console.log(atob('MTIz'))

console.log(Buffer.from('123').toString('base64'))
