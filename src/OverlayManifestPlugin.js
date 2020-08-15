const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const overlayData = require('./overlayData')

class OverlayManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('OverlayManifestPlugin', (compilation) => {
      const { path: outputPath, publicPath } = compilation.options.output
      const assets = compilation.getAssets()

      const data = []
      for (const { name, source } of assets) {
        if (!overlayData.hasOwnProperty(name)) {
          continue
        }

        // Add hash to force Streamwall to refresh the frame
        const hash = crypto
          .createHash('sha1')
          .update(source.source())
          .digest('hex')
          .substr(0, 16)

        data.push({
          link: `${publicPath}${name}?${hash}`,
          ...overlayData[name],
        })
      }

      const output = JSON.stringify(data, null, 2)
      fs.writeFileSync(path.join(outputPath, 'overlays.json'), output)
    })
  }
}

module.exports = OverlayManifestPlugin
