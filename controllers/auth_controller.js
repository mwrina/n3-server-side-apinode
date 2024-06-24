import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Proprietario from '../models/proprietario_model.js';

const secretKey = 'secretpassword';

const login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const proprietario = await Proprietario.findOne({ where: { cpf } });

    if (!proprietario) {
      console.log('Proprietário não encontrado.');
      return res.status(404).json({ message: 'Proprietário não encontrado.' });
    }

    console.log('Senha fornecida:', senha);
    console.log('Senha no banco de dados:', proprietario.senha);

    // Garantir que as senhas estejam sendo comparadas corretamente
    const senhaValida = await bcrypt.compare(senha, proprietario.senha);
    console.log('Resultado da comparação de senha:', senhaValida);

    if (!senhaValida) {
      console.log('Senha inválida.');
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ cpf: proprietario.cpf }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};

export { login };
