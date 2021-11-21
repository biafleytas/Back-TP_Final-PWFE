module.exports = (sequelize, Sequelize) => {
    const Productos = sequelize.define("Productos", {
            nombre: {
                type: Sequelize.STRING
            },
            codigo: {
                type: Sequelize.STRING,
                unique: true
            },
            precio: {
                type: Sequelize.BIGINT
            },
            existencia: {
                type: Sequelize.BIGINT
            },
            id_productos: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            timestamps: false,
        });
    return Productos;
};