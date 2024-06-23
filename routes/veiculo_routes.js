import express from 'express';
import { criarVeiculo, listarVeiculos } from '../controllers/veiculoController.js';
import { listVeiProp } from '../controllers/veiculo_controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = 'secretpassword'; // CHAVE PARA VERIFICAR O TOKEN

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

// CRUD

router.post('/veiculos', criarVeiculo);

router.get('/veiculos', listarVeiculos);

router.get('/veiculos/proprietario', verificarToken, listarVeiculosPorProprietario);

export default router;
