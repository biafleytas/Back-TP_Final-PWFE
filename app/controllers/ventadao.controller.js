const db = require("../models");
const Ventas = db.Ventas;
const Detalles = db.Detalles;
const Clientes = db.Clientes;
const Op = db.Sequelize.Op;

Detalles.belongsTo(Ventas, { as: 'detalles', foreignKey: 'id_ventas' });
Ventas.hasMany(Detalles, { as: 'detalleVenta', foreignKey: 'id_ventas' });

Clientes.hasMany(Ventas, { as: 'clienteVenta', foreignKey: 'id_clientes' });
Ventas.belongsTo(Clientes, { as: 'ventaCliente', foreignKey: 'id_clientes' });

exports.create = (req, res) => {
// crea una venta
    const venta = {
        fecha: req.body.fecha,
        id_clientes: req.body.id_clientes,
        factura: req.body.factura,
        total: req.body.total
    };
// Guardamos la venta en la base de datos
    Ventas.create(venta)
        .then(data => {
            console.log('La venta fue creada');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear la venta."
            });
        });
};

exports.listarVentas = (req, res) => {
    Ventas.findAll({
        include: [
            { model: Detalles, as: "detalleVenta" },
            { model: Clientes, as: "ventaCliente" },
        ]
    })
        .then(data => {
            console.log('Mostrando listado de ventas');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las ventas."
            });
        });
};

exports.modificarVenta = (req, res) => {
    const id = req.params.id;
    const venta = {
        total: req.body.total,
    };
    Ventas.findByPk(id)
        .then(data => {
            data.update(venta);
            data.save().then(res.send("La venta fue actualizada"))
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al modificar la venta con id=" + id
            });
        });
};

exports.listarPorCliente = (req, res) => {
    Ventas.findAll(
        {where: {id_clientes: req.query.id_clientes},
            include:
            [
                { model: Detalles, as: "detalleVenta" },
                { model: Clientes, as: "ventaCliente" },
            ]
        })
        .then(data => {
            console.log('Mostrando listado de ventas por cliente');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las ventas."
            });
        });
};

exports.listarPorFecha = (req, res) => {
    Ventas.findAll(
        {where: {fecha: { [Op.between]: [req.query.desde, req.query.hasta] } },
            include:
                [
                    { model: Detalles, as: "detalleVenta" },
                    { model: Clientes, as: "ventaCliente" },
                ]
        })
        .then(data => {
            console.log('Mostrando listado de ventas por rango de fecha');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las ventas."
            });
        });
};