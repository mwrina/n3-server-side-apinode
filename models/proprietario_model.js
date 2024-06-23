import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Proprietario = db.define('proprietario', {
  cpf: {
    type:DataTypes.INTEGER,
    primaryKey:true
   },
   nome: {
    type:DataTypes.STRING(150)
   },
   fone: {
    type:Sequelize.INTEGER
   } 
},{
    timestamps:false,
    freezeTableName:true
})

export default Proprietario