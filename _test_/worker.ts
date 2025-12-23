const worker = new Worker('./worker.js')

worker.onmessage = (e) => {
  console.log('Received message', e.data)
}
