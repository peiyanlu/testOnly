import { execSync } from 'node:child_process'


function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString().trim()
  } catch {
    return null
  }
}

function fail(msg) {
  console.error(`\n❌ ${ msg }\n`)
  process.exit(1)
}

console.log('\n🔍 npm publish preflight check\n')

// 1. registry
const registry = run('npm config get registry')
if (registry !== 'https://registry.npmjs.org/') {
  fail(`Invalid registry: ${ registry }`)
}
console.log('✅ registry ok')

// 2. whoami
const user = run('npm whoami')
if (!user) {
  fail('Not logged in or token invalid')
}
console.log(`✅ logged in as ${ user }`)

// 3. package name
const pkgName = run('node -p "require(\'../package.json\').name"')
if (!pkgName) {
  fail('Cannot read package.json name')
}
console.log(`📦 package: ${ pkgName }`)

// 4. maintainer check (best-effort)
const maintainers = run(`npm view ${ pkgName } maintainers --json`)
if (maintainers) {
  try {
    const list = JSON.parse(maintainers)
    const ok = list.some(m => m.name === user)
    if (!ok) {
      fail(`User "${ user }" is not a maintainer of ${ pkgName }`)
    }
    console.log('✅ maintainer check ok')
  } catch {
    console.log('⚠️ cannot parse maintainers, skip')
  }
} else {
  console.log('⚠️ package not found (first publish?)')
}

// 5. dry run (authoritative)
console.log('\n🚀 npm publish --dry-run\n')
try {
  execSync('npm publish --dry-run', { stdio: 'inherit' })
} catch {
  fail('Dry run failed (likely 2FA / token / permission issue)')
}

console.log('\n🎉 Preflight check passed. Ready to publish.\n')
