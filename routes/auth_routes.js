import express from 'express';
import { login } from '../controllers/auth_controller';
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = 'secretpassword'; // CCHAVE PARA VERIFICAR TOKEN

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.cpfProprietario = decoded.cpf;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};

router.post('/login', login);

router.get('/veiculos/proprietario', verificarToken, async (req, res) => {
  const cpfProprietario = req.cpfProprietario;

  // Implemente a lógica para listar veículos do proprietário com o CPF `cpfProprietario`
});

// ... outras rotas

export default router;
