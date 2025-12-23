import { readFileSync } from 'fs'
import { exec } from 'node:child_process'
import { join } from 'path'


export const getFiledValue = (pkg: string, filed: string = 'version'): Promise<[ string, string ]> => {
  return new Promise((resolve) => {
    exec(
      `pnpm view ${ pkg } ${ filed } --json`, { encoding: 'utf8' },
      (err, stdout) => resolve([ pkg, err ? '' : JSON.parse(stdout) ]),
    )
  })
}


const pkg = JSON.parse(readFileSync(join(process.cwd(), '..', 'package.json'), 'utf8'))
const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })


const getLicense = (pkg: string) => getFiledValue(pkg, 'license')
const licenses = await Promise.all(deps.map(getLicense))

console.log('已安装依赖许可证：', licenses)


const getVersion = (pkg: string) => getFiledValue(pkg, 'version')
const versions = await Promise.all(deps.map(getVersion))

console.log('已安装依赖版本：', versions)

