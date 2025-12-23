import { readFileSync } from 'fs'


function parseIcoSizes(buffer: Buffer): { width: number, height: number }[] {
  const sizes: { width: number, height: number }[] = []
  if (buffer.readUInt16LE(0) !== 0 || buffer.readUInt16LE(2) !== 1) {
    throw new Error('Not a valid ICO file')
  }
  const count = buffer.readUInt16LE(4)
  for (let i = 0; i < count; i++) {
    const entryOffset = 6 + i * 16
    const width = buffer.readUInt8(entryOffset) || 256
    const height = buffer.readUInt8(entryOffset + 1) || 256
    sizes.push({ width, height })
  }
  return sizes
}

const icoPath = './icon.ico' // 改成你的 .ico 路径

try {
  const buffer = readFileSync(icoPath)
  const sizes = parseIcoSizes(buffer)
  console.log(`ICO 文件包含 ${ sizes.length } 个图标尺寸:`)
  sizes.forEach(({ width, height }, i) => {
    console.log(`  图标 #${ i + 1 }: ${ width }x${ height }`)
  })
} catch (error) {
  console.error('读取或解析 .ico 文件失败:', error)
}
