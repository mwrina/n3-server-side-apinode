import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Proprietario from '../models/proprietario_model.js';

const secretKey = 'secretpassword'; // CHAVE SECRETA PARRA ASSINAR O TOKEN

const login = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const proprietario = await Proprietario.findOne({ where: { cpf } });

    if (!proprietario) {
      return res.status(404).json({ message: 'Proprietário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, proprietario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ cpf: proprietario.cpf }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
};

export { login };
