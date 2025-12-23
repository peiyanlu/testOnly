function isBrowserProcess() {
  return typeof window === 'object' && typeof window.navigator === 'object'
}

function isElectronAppFrontend() {
  return typeof navigator === 'object' && navigator.userAgent.toLowerCase().indexOf('electron') >= 0
}

console.log(isElectronAppFrontend(), isBrowserProcess())
