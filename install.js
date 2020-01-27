const fs = require('fs')
const path = require('path')
const { https } = require('follow-redirects')
const zlib = require('zlib')
const pkg = require('./package')

function platform() {
  switch (process.platform) {
    case 'win32': {
      return 'win'
    }
    case 'darwin': {
      return 'osx'
    }
    case 'linux': {
      return 'linux'
    }
    default: {
      throw new Error(`Not a supported platform: ${process.platform}`)
    }
  }
}

function main() {
  const dlUrl = `https://github.com/denoland/deno/releases/download/v${pkg.version}/deno_${platform()}_x64.gz`
  const file = fs.createWriteStream(path.join(__dirname, 'bin', 'deno'))
  // 1. Download Deno binary from github release page
  https.get(dlUrl, res => {
    // 2. Put it at ./bin/deno
    res.pipe(zlib.createGunzip()).pipe(file)
  })
}

main()
