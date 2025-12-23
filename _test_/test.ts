// import { exec } from 'node:child_process'
//
//
// // exec(`npm view puppeteer version`, (err, stdout) => {
// //   console.log(err ? undefined : stdout.trim())
// // })
//
//
const execAsync = (cmd: string) => {
  return new Promise<string | undefined>(r => {
    exec(cmd, (err, stdout) => r(err ? undefined : stdout.trim()))
  })
}
import { exec, spawnSync } from 'node:child_process'
//
// console.log(await execAsync('npm view puppeteer version'))
// console.log(55)
import { promisify } from 'node:util'


const execa = promisify(exec)

async function lsExample() {
  const { stdout, stderr } = await execa('npm view puppeteer version')
  console.log('stdout:', stdout)
  console.error('stderr:', stderr)
}

lsExample()


export const isGitRepo = async (dir?: string) => {
  const target = dir ? `./${ dir }` : '.'
  const cmd = `git -C "${ target }" rev-parse --is-inside-work-tree`
  const res = await execAsync(cmd)
  return !!res
}

// console.log(await isGitRepo())


console.log(JSON.parse('true'))
console.log(JSON.parse('true\n'))
console.log(JSON.parse('true '))
console.log(!!('tru11e'))


const gr = () => {
  const { stdout, stderr } = spawnSync('git', [ 'remote', 'get-url', 'origin' ])
  return stderr ? undefined : stdout.toString().trim()
}

const gh = (url: string) => {
  const reg = /github(?:\.com)?[:/](.+?)\/(.+?)(\/.+?)?(\.git)?$/
  const [ _, user, repo ] = url.match(reg) ?? []
  return user ? [ user, repo ] : undefined
}

console.log(gr())
