import express from 'express';
import jwt from 'jsonwebtoken';
import { login } from '../controllers/auth_controller.js';
import { listVeiProp } from '../controllers/veiculo_controller.js'; 

const router = express.Router();
const secretKey = 'secretpassword'; 

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

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

  try {
    
    const veiculos = await listVeiProp(cpfProprietario);

    res.status(200).json(veiculos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar veículos do proprietário.' });
  }
});

// Outras rotas aqui, se houver

export default router;