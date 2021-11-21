module.exports = (sequelize, Sequelize) => {
    const Clientes = sequelize.define("Clientes", {
            nombre: {
                type: Sequelize.STRING
            },
            ruc: {
                type: Sequelize.STRING,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            id_clientes: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            timestamps: false,
        });
    return Clientes;
};