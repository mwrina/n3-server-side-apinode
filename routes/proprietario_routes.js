import express from "express"

import { getProprietarios, createProprietario, updateProprietario, deleteProprietario } from "../controllers/proprietario_controller.js"

const router = express.Router()

router.get('/', getProprietarios)
router.post('/', createProprietario)
router.put('/:cpf', updateProprietario)
router.delete('/:cpf', deleteProprietario)

export default router