import { pkgVersion } from '@peiyanlu/cli-utils'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import semver, { validRange, valid, satisfies, diff, minVersion, inc, clean } from 'semver'


const pkgPath = join('./package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

const deps: Record<string, string> = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
}

const changes: string[] = []

// for (const [ dep, range ] of Object.entries(deps)) {
//   try {
//     const latest = execSync(`npm view ${ dep } version`).toString().trim()
//     if (validRange(range) && valid(latest) && !satisfies(latest, range)) {
//       const type = diff(minVersion(range)!, latest)
//       if (type && [ 'minor', 'major'].includes(type)) {
//         changes.push(`${ dep }: ${ range } → ${ latest } (${ type })`)
//       }
//     }
//   } catch {}
// }
//
// if (changes.length) {
//   // console.log(`\n📦 Template ${ name }`)
//   changes.forEach(c => console.log(` - ${ c }`))
// }


// console.log(Object.entries(deps).reduce( (res, [ dep, range ]) => {
//   const latest = execSync(`npm view ${ dep } version`).toString().trim()
//
//   if (validRange(range) && valid(latest) && !satisfies(latest, range)) {
//     const type = diff(minVersion(range)!, latest)
//     if (type && [ 'minor', 'major' ].includes(type)) {
//       ;(res[type] ??= []).push({ dep, version: latest })
//     }
//   }
//   return res
// }, {} as Record<string, ({ dep: string, version: string })[]>))

console.log(inc(clean('^1.2.3')!, 'minor'))
