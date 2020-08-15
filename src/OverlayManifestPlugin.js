const path = require('path')
const crypto = require('crypto')

const { baseURL, overlays } = require('./overlayData')

class OverlayManifestPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('OverlayManifestPlugin', (compilation) => {
      const { path: outputPath } = compilation.options.output
      const assets = compilation.getAssets()

      const data = []
      for (const { name, source } of assets) {
        if (!overlays.hasOwnProperty(name)) {
          continue
        }

        // Add hash to force Streamwall to refresh the frame
        const hash = crypto
          .createHash('sha1')
          .update(source.source())
          .digest('hex')
          .substr(0, 16)

        data.push({
          link: `${baseURL}${name}?${hash}`,
          ...overlays[name],
        })
      }

      const output = JSON.stringify(data, null, 2)
      compiler.outputFileSystem.writeFile(
        path.join(outputPath, 'overlays.json'),
        output,
        () => {},
      )
    })
  }
}

module.exports = OverlayManifestPlugin
