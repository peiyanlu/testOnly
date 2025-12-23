import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'


const srcIcon = path.resolve('./icon.png') // 原始透明背景PNG图

// 输出目录
const outDir = path.resolve( './build-icons')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

async function generatePngSizes() {
  const sizes = [ 16, 32, 48, 64, 128, 256, 512, 1024 ]
  for (const size of sizes) {
    await sharp(srcIcon)
      .resize(size, size)
      .toFile(path.join(outDir, `icon_${ size }x${ size }.png`))
  }
}

async function generateIco() {
  // 生成 ico 需要 256, 128, 64, 48, 32, 16 PNG 文件
  const icoSizes = [ 16, 32, 48, 64, 128, 256 ]
  const pngFiles = await Promise.all(
    icoSizes.map((size) =>
      sharp(srcIcon)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  )
  const icoBuffer = await pngToIco(pngFiles)
  fs.writeFileSync(path.join(outDir, 'icon.ico'), icoBuffer)
}

async function generateIcns() {
  // macOS专用，先生成iconset文件夹
  const iconsetDir = path.join(outDir, 'icon.iconset')
  if (!fs.existsSync(iconsetDir)) fs.mkdirSync(iconsetDir)
  
  const icnsSizes = [
    16, 32, 64, 128, 256, 512, 1024
  ]
  
  // iconutil需要指定名字和@2x.png
  for (const size of icnsSizes) {
    const filename = `icon_${ size }x${ size }.png`
    const filepath = path.join(iconsetDir, filename)
    await sharp(srcIcon)
      .resize(size, size)
      .toFile(filepath)
    
    // 2x图
    const doubleSize = size * 2
    const doubleFilename = `icon_${ size }x${ size }@2x.png`
    const doubleFilepath = path.join(iconsetDir, doubleFilename)
    await sharp(srcIcon)
      .resize(doubleSize, doubleSize)
      .toFile(doubleFilepath)
  }
  
  // 执行 iconutil 转换
  try {
    execSync(`iconutil -c icns ${ iconsetDir } -o ${ path.join(outDir, 'icon.icns') }`)
  } catch (e) {
    console.error('iconutil 转换失败，请确认你在 macOS 且已安装 Xcode 命令行工具')
  }
}

// 生成纯白色和纯黑色版本的 tray icon
async function generateTrayIcons() {
  const trayOutDir = path.join(outDir, 'tray')
  if (!fs.existsSync(trayOutDir)) fs.mkdirSync(trayOutDir)
  
  // 纯白色
  await sharp(srcIcon)
    .resize(24, 24)
    .flatten({ background: '#ffffff' })
    .modulate({ brightness: 2 }) // 提亮模拟白色（根据需求调）
    .toFile(path.join(trayOutDir, 'tray_white.png'))
  
  // 纯黑色
  await sharp(srcIcon)
    .resize(24, 24)
    .flatten({ background: '#000000' })
    .toFile(path.join(trayOutDir, 'tray_black.png'))
}

// 模糊裁切启动页icon示例
async function generateSplashIcons() {
  const splashOutDir = path.join(outDir, 'splash')
  if (!fs.existsSync(splashOutDir)) fs.mkdirSync(splashOutDir)
  
  const splashSizes = [ 100, 200 ]
  
  for (const size of splashSizes) {
    await sharp(srcIcon)
      .resize(size, size)
      .blur(10) // 模糊效果
      .toFile(path.join(splashOutDir, `splash_${ size }.png`))
  }
}

async function main() {
  await generatePngSizes()
  await generateIco()
  
  if (process.platform === 'darwin') {
    await generateIcns()
  } else {
    console.log('非 macOS 平台，跳过生成 icns')
  }
  
  await generateTrayIcons()
  await generateSplashIcons()
}

main().catch(console.error)
