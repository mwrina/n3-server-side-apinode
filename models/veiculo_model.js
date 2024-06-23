import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Proprietario from "../models/professor_model.js"
import Tipo_veiculo from "../models/turma_model.js"

const Veiculo = db.define('curso', {
    id_veic: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    placa: {
        type:Sequelize.STRING(20)
    },
    modelo: {
        type:Sequelize.STRING(50)
    },
    preco: {
        type:Sequelize.DOUBLE
    },
    proprietario: {
        type:Sequelize.INTEGER
    },
    tipo: {
        type:Sequelize.INTEGER,
        references: {
            model: Tipo_veiculo,
            key: 'id_tipo'
        }
    },
}, 
{  
    timestamps: false,
    freezeTableName: true
})

Veiculo.belongsTo(Proprietario, {foreignKey:'proprietario', allowNull:false})
Veiculo.belongsTo(Tipo_veiculo, {foreignKey:'tipo', allowNull:true})

export default Veiculo