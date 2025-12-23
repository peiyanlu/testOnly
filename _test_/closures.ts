const outer = () => {
  let closures = 0
  
  return (): number => {
    return closures++
  }
}

const inner: () => number = outer()
console.log('>>> inner:', inner())
console.log('>>> inner:', inner())

