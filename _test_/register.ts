import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'


export function isTSFile(file: string) {
  return /\.(ts|mts|cts)$/.test(file)
}


export async function loadConfig<T = unknown>(file: string): Promise<T> {
  const url = pathToFileURL(file).href
  console.log(url)
  const mod = await import(url)
  // 兼容 export default / module.exports
  return mod.default ?? mod
}


export function findConfigFile(cwd = process.cwd()) {
  const files = [
    'release.config.ts',
    'release.config.mts',
    'release.config.cts',
    'release.config.js',
    'release.config.mjs',
    'release.config.cjs',
  ]
  
  for (const file of files) {
    const absPath = resolve(cwd, file)
    if (existsSync(absPath)) {
      return absPath
    }
  }
  
  return
}

export async function resolveConfig<T = unknown>(cwd?: string): Promise<T | null> {
  const configFile = findConfigFile(cwd)
  
  if (!configFile) return null
  
  return await loadConfig<T>(configFile)
}

resolveConfig().then(res => {
  console.log(res)
})


const spawnAsync = (...args: Parameters<typeof spawn>) => {
  return new Promise((resolve) => {
    spawn(...args).on('close', code => {
      return 1 === code ? resolve(true) : resolve(false)
    })
  })
}

