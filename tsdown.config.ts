import { defineConfig } from 'tsdown'


type Config = ReturnType<typeof defineConfig>

const esmConfig: Config = defineConfig({
  entry: [ './src' ],
  dts: true,
  treeshake: false,
  format: 'esm',
})

const config: Config[] = [ esmConfig ]

export default config
