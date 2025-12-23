import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { join } from 'path'


const copyDir = async (src: string, dist: string) => {
  await mkdir(dist, { recursive: true })
  
  const files = await readdir(src, { withFileTypes: true })
  await Promise.all(files.map(async (file) => {
    const srcPath = join(src, file.name)
    const distPath = join(dist, file.name)
    if (file.isDirectory()) {
      await copyDir(srcPath, distPath)
    } else {
      await copyFile(srcPath, distPath)
    }
  }))
}

console.log(join(process.cwd(), '../_test_'), join(process.cwd(), '../dist1'))
console.log(await copyDir(join(process.cwd(), '../_test_'), join(process.cwd(), '../dist1')))
