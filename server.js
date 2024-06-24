import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import veiculoRoutes from './routes/veiculo_routes.js';
import authRoutes from './routes/auth_routes.js';
import proprietarioRoutes from './routes/proprietario_routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
try {
    await db.authenticate();
    console.log('Conexão com o MySQL estabelecida');
} catch (error) {
    console.error('Erro ao conectar com o MySQL:', error);
}

// Rotas
app.use('/api/veiculos', veiculoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/proprietarios', proprietarioRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});