const xhrFn = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://peiyanlu.github.io/vite-press/')
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText)
        } else {
          reject(xhr.response)
        }
      }
    }
    xhr.send()
  })
}


const test = async () => {
  return 5
}

console.log(await test())
console.log(await test().then(a => a))

export { }

