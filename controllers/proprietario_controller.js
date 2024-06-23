import Proprietario from "../models/proprietario_model.js"

export const getProprietarios = async (req, res) => {
    try {
        const proprietarios = await Proprietario.findAll()
        res.send(proprietarios)
    } catch (e) {
        console.log("Erro ao acessar a tabela proprietario", e)
        
    }
}

export const createProprietario = async(req, res) => {
    try {
        await Proprietario.create(req.body)
        res.json({ "message":"Um novo registro foi inserido na tabela proprietario"})
    } catch (e) {
       console.log("Erro ao inserir um novo proprietário", e) 
    }
}

export const updateProprietario = async (req, res) => {
    try {
        await Proprietario.update(req.body, {
            where: {
                cpf: req.params.cpf
            }
        })
        res.json({
            "message": "Proprietário de CPF " + req.params.cpf + " foi atualizado"
        })
    } catch (e) {
        console.log("Erro ao atualizar registro de proprietário", e)
        
    }

}

export const deleteProprietario = async (req, res) => {
    try {
        await Proprietario.destroy({
            where: {
                cpf: req.params.cpf
            }
        })
        res.json({
            "message": "Proprietario de CPF " + req.params.cpf + " excluído"
        })
    } catch (e) {
        console.log("Erro ao excluir registro de proprietário", e)
        
    }

}