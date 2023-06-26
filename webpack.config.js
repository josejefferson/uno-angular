const webpack = require('webpack')
const path = require('path')

const dotenv = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

module.exports = (config, opts, context) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  )

  return config
}
