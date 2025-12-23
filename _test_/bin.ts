const pnpm = 'xxx/node_modules/.pnpm/@cbe+core-frontend@1.0.0/node_modules/@cbe/core-frontend'
const npm = 'node_modules/@cbe/core-frontend'

import { sep } from 'node:path'


const [ _node, _script, dir ] = process.argv

const cwd = process.cwd()


const deep = () => {
  const nm = `node_modules`
  // const nm = `/node_modules/`
  // const nm = `${ sep }node_modules${ sep }`
  const u = pnpm.split(nm).slice(1)
  console.log(u)
  if (u.length > 0) {
    return u.join(nm).split(sep).length
  } else {
    return u.length
  }
}

console.log(cwd)
console.log(deep(), 222)
