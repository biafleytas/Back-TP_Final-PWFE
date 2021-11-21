module.exports = (sequelize, Sequelize) => {
    const Detalles = sequelize.define("Detalles", {
            total: {
                type: Sequelize.BIGINT
            },
            cantidad: {
                type: Sequelize.BIGINT
            },
            id_productos: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'Productos', // 'fathers' refers to table name
                    key: 'id_productos', // 'id' refers to column name in fathers table
                },
            },
            id_ventas: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'Ventas', // 'fathers' refers to table name
                    key: 'id_ventas', // 'id' refers to column name in fathers table
                },
            },
            id_detalles: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            timestamps: false,
        });
    return Detalles;
};