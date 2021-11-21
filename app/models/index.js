const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Clientes = require("./clientes.model.js")(sequelize, Sequelize);
db.Productos = require("./productos.model.js")(sequelize, Sequelize);
db.Ventas = require("./venta.model.js")(sequelize, Sequelize);
db.Detalles = require("./detalle.model.js")(sequelize, Sequelize);
module.exports = db;