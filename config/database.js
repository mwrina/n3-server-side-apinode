import { Sequelize } from "sequelize";

const db = new Sequelize('n3svside', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db