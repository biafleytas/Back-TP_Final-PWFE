module.exports = (sequelize, Sequelize) => {
    const Ventas = sequelize.define("Ventas", {
            total: {
                type: Sequelize.BIGINT
            },
            factura: {
                type: Sequelize.STRING,
                unique: true
            },
            fecha: {
                type: Sequelize.DATEONLY,
            },
            id_clientes: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'Clientes', // 'fathers' refers to table name
                    key: 'id_clientes', // 'id' refers to column name in fathers table
                },
            },
            id_ventas: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            timestamps: false,
        });
    return Ventas;
};