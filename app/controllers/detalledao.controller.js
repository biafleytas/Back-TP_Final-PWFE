const db = require("../models");
const Detalles = db.Detalles;
const Productos = db.Productos;
const Ventas = db.Ventas;
const Op = db.Sequelize.Op;

Detalles.belongsTo(Productos, { as: 'detallesProducto', foreignKey: 'id_productos' });
Productos.hasMany(Detalles, { as: 'productoDetalle', foreignKey: 'id_productos' });

Detalles.belongsTo(Ventas, { as: 'detallesVenta', foreignKey: 'id_ventas' });
Ventas.hasMany(Detalles, { as: 'VentaDetalles', foreignKey: 'id_ventas' });


exports.create = (req, res) => {
// crea un detalle
    const detalle = {
        id_ventas: req.body.id_ventas,
        id_productos: req.body.id_productos,
        cantidad: req.body.cantidad,
        total: req.body.total,
    };
// Guardamos el detalle en la base de datos
    Detalles.create(detalle)
        .then(data => {
            Ventas.findByPk(req.body.id_ventas)
                .then(dataV => {
                const respuesta = {mensaje: "Los datos de la venta fueron actualizados"};
                dataV.total = parseInt(dataV.total) + parseInt(data.total)
                dataV.save().then(res.send(respuesta))
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el detalle."
            });
        });
};

exports.listarDetalles = (req, res) => {
    const venta = req.query.id_ventas;
    var condition = venta ? {id_ventas: venta } : null;
    Detalles.findAll(
        { where: condition,
            include: [
                { model: Productos, as: "detallesProducto"},
                {model: Ventas, as: "detallesVenta"},
            ]
        },
        )
        .then(data => {
            console.log('Mostrando listado de detalles');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los detalles."
            });
        });
};

exports.eliminarDetalle = (req, res) => {
    const id = req.params.id;
    var condition = id ? { id_detalles:  id } : null;
    Detalles.destroy({ where: condition }).then(res.send("El detalle fue eliminado"));
    console.log('El detalle fue eliminado');
};

exports.listarPorProducto = (req, res) => {
    Detalles.findAll(
        {where: {id_productos: req.query.id_productos},
            include:[
                { model: Productos, as: "detallesProducto"},
                {model: Ventas, as: "detallesVenta"},
            ]
        })
        .then(data => {
            console.log('Mostrando listado de detalles por producto');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los detalles."
            });
        });
};
