const jsonServer = require('json-server')
const { DEFAULT_PORT } = require('./src/constants')
const { authMiddleWare } = require('./src/middlewares/auth')
const { authRouter } = require('./src/router/auth')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const argv = process.argv
const portIndex = argv.indexOf('--port')
const port =
  portIndex >= 0 && argv[portIndex].includes('port')
    ? argv[portIndex + 1]
    : DEFAULT_PORT
const isTesting = argv.some((arg) => arg.includes('jest'))

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use('/auth', authRouter)
server.use(authMiddleWare)
server.use(router)

if (!isTesting) {
  server.listen(port, () => {
    console.log('JSON Server is running')
    console.log('http://localhost:' + port)
  })
}

module.exports = {
  server,
}
