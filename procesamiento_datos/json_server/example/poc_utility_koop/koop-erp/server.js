// clean shutdown on `cntrl + c`
process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

// Initialize Koop
const Koop = require('koop')
const koop = new Koop()

// Install the Sample Provider
const provider = require('./')
koop.register(provider)

if (process.env.DEPLOY === 'export') {
  module.exports = koop.server
} else {
  // Start listening for HTTP traffic
  const config = require('config')
  // Set port for configuration or fall back to default
  const port = process.env.PORT || config.port || 8080
  koop.server.listen(port)

  const message = `

  Koop Sample Provider listening on ${port}

  Try it out in your browser: http://localhost:${port}/erp/FeatureServer/0/query
  Or on the command line: curl --silent http://localhost:${port}/erp/FeatureServer/0/query?returnCountOnly=true

  Press control + c to exit
  `
  console.log(message)
}
