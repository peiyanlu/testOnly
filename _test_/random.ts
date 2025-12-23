// [min, max]
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// [min, max)
const random1 = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}

// (min, max)
const random2 = (min: number, max: number) => {
  return Math.ceil(Math.random() * (max - min - 1)) + min
}

// (min, max]
const random3 = (min: number, max: number) => {
  return Math.ceil(Math.random() * (max - min)) + min
}


for (let i = 0; i < 1000; i++) {
  const r = random2(1, 5)
  // console.log(r)
  
  if ([ 1, 5 ].includes(r)) {
    console.log(r)
  }
}
