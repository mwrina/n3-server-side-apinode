import express from "express"

import { getProprietarios, createProprietario, updateProprietario, deleteProprietario } from "../controllers/proprietario_controller.js"

const router = express.Router()

router.get('/proprietario', getProprietarios)
router.post('/proprietario', createProprietario)
router.put('/proprietario/:cpf', updateProprietario)
router.delete('/proprietario/:cpf', deleteProprietario)

export default router