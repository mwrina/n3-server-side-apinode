import express from 'express';
import { criarVeiculo, deletarVeiculo, listarVeiculos, listVeiProp, updateVeiculo } from '../controllers/veiculo_controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const secretKey = 'secretpassword'; // CHAVE PARA VERIFICAR O TOKEN

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Se não houver token, continua sem autenticação (opcional)
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.cpfProprietario = decoded.cpf; // Adiciona o CPF decodificado ao objeto req para uso posterior
    next(); // Chama a próxima função no middleware stack
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Token inválido.' });
  }
};

// CRUD

router.get('/', listarVeiculos);

router.get('/proprietario', verificarToken, listVeiProp);

router.post('/', criarVeiculo);

router.put('/:id_veic', updateVeiculo);

router.delete('/:id_veic', deletarVeiculo);

export default router;