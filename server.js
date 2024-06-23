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

server.use(proprietarioRota)
server.listen(5000, () => console.log("servidor executando em http://localhost:5000"))