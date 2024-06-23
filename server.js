import express from "express"
import cors from "cors"
import db from "./config/database.js"

import proprietarioRota from "./routes/proprietario_routes.js"

const server = express()
server.use(express.json())
server.use(cors())

try {
    await db.authenticate()
    console.log("Conexão com o Mysql estabelecida")
} catch (e) {
    console.log("Conexão com o Mysql Não estabelecida", e)
}

import veiculo_routes from "./routes/veiculo_routes.js"

app.use(express.json());

app.use('/api', veiculo_routes)

import auth_rotes from './routes/auth_routes.js'

const app = express()

app.use(express.json());

server.use(proprietarioRota)
server.listen(5000, () => console.log("servidor executando em http://localhost:5000"))