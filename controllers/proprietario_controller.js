import Proprietario from "../models/proprietario_model.js"
import bcrypt from 'bcryptjs';

export const getProprietarios = async (req, res) => {
    try {
        const proprietarios = await Proprietario.findAll()
        res.send(proprietarios)
    } catch (e) {
        console.log("Erro ao acessar a tabela proprietario", e)
        
    }
}

export const createProprietario = async (req, res) => {
    try {
      const { cpf, nome, fone, senha } = req.body;
  
      const salt = await bcrypt.genSalt(10);
      const hashedSenha = await bcrypt.hash(senha, salt);
  
      await Proprietario.create({
        cpf,
        nome,
        fone,
        senha: hashedSenha
      });
  
      res.json({ "message": "Um novo registro foi inserido na tabela proprietario" });
    } catch (e) {
      console.log("Erro ao inserir um novo proprietário", e);
      res.status(500).json({ message: 'Erro ao criar proprietário.' });
    }
  };

export const updateProprietario = async (req, res) => {
try {
    const { senha, ...rest } = req.body;
    let updatedFields = rest;

    if (senha) {
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);
    updatedFields = { ...rest, senha: hashedSenha };
    }

    const [updatedRowsCount] = await Proprietario.update(updatedFields, {
    where: { cpf: req.params.cpf }
    });

    if (updatedRowsCount === 0) {
    return res.status(404).json({ message: `Proprietário de CPF ${req.params.cpf} não encontrado.` });
    }

    res.json({ message: `Proprietário de CPF ${req.params.cpf} foi atualizado.` });
} catch (e) {
    console.log("Erro ao atualizar registro de proprietário", e);
    res.status(500).json({ message: 'Erro ao atualizar proprietário. Verifique os dados fornecidos.' });
}
};

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