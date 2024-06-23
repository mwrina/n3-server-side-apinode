import Veiculo from '../models/Veiculo.js';
import TipoVeiculo from '../models/TipoVeiculo.js';
import Proprietario from '../models/proprietario_model.js';

// CRIA VEICULO
const criarVeiculo = async (req, res) => {
  try {
    const { preco, ...veiculoData } = req.body;

    // DETERMINA O TIPO DE VEICULOS COM BASE NOS PREÇOS
    let tipoId;
    if (preco < 50000) {
      tipoId = 1; // POPULAR
    } else if (preco >= 50000 && preco < 100000) {
      tipoId = 2; // SUPER LUXO
    } else {
      tipoId = 3; // LUXO
    }

    const veiculo = await Veiculo.create({ ...veiculoData, preco, tipo: tipoId });
    res.status(201).json(veiculo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar veículo.' });
  }
};

// LISTA OS VEICULOS
const listarVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      include: [{ model: TipoVeiculo, attributes: ['tipo'] }]
    });
    res.status(200).json(veiculos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar veículos.' });
  }
};

const listVeiProp = async (req, res) => {
    const cpfProprietario = req.cpfProprietario;
  
    try {
      // VERIFICA SE O PROPRIETÁRIO COM O CPF EXISTE
      const proprietario = await Proprietario.findByPk(cpfProprietario);
  
      if (!proprietario) {
        return res.status(404).json({ message: 'Proprietário não encontrado.' });
      }
  
      // LISTA OS VEÍCULOS COM BASE NO CPF
      const veiculos = await Veiculo.findAll({
        where: { proprietario: cpfProprietario }
      });
  
      res.status(200).json(veiculos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar veículos do proprietário.' });
    }
  };

export {
  criarVeiculo,
  listarVeiculos,
  listVeiProp
};
