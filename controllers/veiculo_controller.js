// veiculo_controller.js
import Veiculo from '../models/veiculo_model.js';
import Tipo_veiculo from '../models/tipo_model.js';
import Proprietario from '../models/proprietario_model.js';

// LISTAR VEICULOS
export const listarVeiculos = async (req, res) => {
  try {
    const veiculos = await Veiculo.findAll({
      include: [{ model: Tipo_veiculo, attributes: ['tipo'] }]
    });
    res.status(200).json(veiculos);
  } catch (e) {
    console.error('Erro ao acessar a tabela veiculo:', e);
    res.status(500).json({ message: 'Erro ao acessar a tabela veiculo' });
  }
};

// LISTAR VEÍCULOS POR PROPRIETÁRIO
export const listVeiProp = async (req, res) => {
  const cpfProprietario = req.cpfProprietario;

  try {
    // Verifica se o proprietário com o CPF existe
    const proprietario = await Proprietario.findByPk(cpfProprietario);

    if (!proprietario) {
      return res.status(404).json({ message: 'Proprietário não encontrado.' });
    }

    // Lista os veículos com base no CPF do proprietário
    const veiculos = await Veiculo.findAll({
      where: { proprietario: cpfProprietario }
    });

    res.status(200).json(veiculos);
  } catch (err) {
    console.error('Erro ao buscar veículos do proprietário:', err);
    res.status(500).json({ message: 'Erro ao buscar veículos do proprietário.' });
  }
};

const determinarTipoVeiculo = (preco) => {
  let tipoId;
  if (preco < 50000) {
    tipoId = 1; // POPULAR
  } else if (preco >= 50000 && preco < 100000) {
    tipoId = 3; // LUXO
  } else {
    tipoId = 2; // SUPER LUXO
  }
  return tipoId;
};

// CRIAR VEICULO
export const criarVeiculo = async (req, res) => {
  try {
    const { placa, modelo, preco, proprietario } = req.body;

    if (!placa || !modelo || !preco || !proprietario) {
      return res.status(400).json({ message: 'Todos os campos (placa, modelo, preco, proprietario) são obrigatórios.' });
    }

    const tipoId = determinarTipoVeiculo(preco);

    const veiculo = await Veiculo.create({ placa, modelo, preco, proprietario, tipo: tipoId });

    res.status(201).json(veiculo);
  } catch (err) {
    console.error('Erro ao criar veículo:', err);
    res.status(500).json({ message: 'Erro ao criar veículo. Verifique os dados fornecidos.' });
  }
};

export const updateVeiculo = async (req, res) => {
  try {
    const { id_veic } = req.params;
    const { preco } = req.body;
    

    if(preco) {
      const tipoId = determinarTipoVeiculo(preco);
      const [updatedRowsCount] = await Veiculo.update({ ...req.body, tipo: tipoId }, {
        where: { id_veic }
      });
    }
    else {
      const [updatedRowsCount] = await Veiculo.update(req.body, {
        where: { id_veic }
      });
    }

    

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: `Veículo de ID ${id_veic} não encontrado.` });
    }

    res.json({ message: `Veículo de ID ${id_veic} foi atualizado.` });
  } catch (e) {
    console.error("Erro ao atualizar registro de veículo:", e);
    res.status(500).json({ message: 'Erro ao atualizar veículo. Verifique os dados fornecidos.' });
  }
};

export const deletarVeiculo = async (req, res) => {
  try {
    await Veiculo.destroy({
        where: {
            id_veic: req.params.id_veic
        }
    })
    res.json({
        "message": "Veículo de id " + req.params.id_veic + " excluído"
    })
} catch (e) {
    console.log("Erro ao excluir registro de veículo", e)
    
}

}