import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Tipo_veiculo = db.define('tipo_veiculo', {
  id_tipo: {
    type:DataTypes.INTEGER,
    primaryKey:true
   },
   tipo: {
    type:DataTypes.STRING(50)
   }
},{
    timestamps:false,
    freezeTableName:true
})

export default Tipo_veiculo