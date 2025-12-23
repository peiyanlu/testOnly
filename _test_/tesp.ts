import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import semver from 'semver'
import minimist from 'minimist'


const { name, type } = minimist(process.argv.slice(2))

const templatePath = join('templates', name, 'template.json')

const tpl = JSON.parse(readFileSync(templatePath, 'utf8'))
tpl.version = semver.inc(tpl.version, type)!

writeFileSync(templatePath, JSON.stringify(tpl, null, 2) + '\n')

console.log(`✔ ${ name } bumped to ${ tpl.version }`)


