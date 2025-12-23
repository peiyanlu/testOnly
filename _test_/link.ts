export const pathToLink = (path: string, rootDir = '.', srcDir = '.'): string => path
  .replace(new RegExp(`(^(\/?)${ rootDir }\/)+`, 'g'), '/')
  .replace(new RegExp(`(^(\/?)${ srcDir }\/)+`, 'g'), '/')
  .replace(/\.md$/i, '')
  .replace(/\/index$/g, '/')
  .replace(/\/+/g, '/')


console.log(pathToLink('docs/src/guide/index.md', 'docs', 'src'))

