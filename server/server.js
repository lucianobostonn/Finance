const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 5000

server.use(middlewares)
server.use(router)

server.listen(PORT, () => {
    console.log(`JSON Server está a correr na porta ${PORT}`)
})
