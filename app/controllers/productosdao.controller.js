const db = require("../models");
const Productos = db.Productos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// crea un producto
    const producto = {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        existencia: req.body.existencia,
        precio: req.body.precio
    };
// Guardamos el producto en la base de datos
    Productos.create(producto)
        .then(data => {
            console.log('Se creo el producto');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el producto."
            });
        });
};

exports.listarProductos = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    Productos.findAll( { where: condition })
        .then(data => {
            console.log('Mostrando el listado de productos');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los productos."
            });
        });
};

exports.eliminarProducto = (req, res) => {
    const id = req.params.id;
    var condition = id ? { id_productos:  id } : null;
    const respuesta = {mensaje: "El producto fue eliminado"};
    Productos.destroy({ where: condition }).then(res.send(respuesta));
    console.log('El producto fue eliminado');
};

exports.modificarProducto = (req, res) => {
    const id = req.params.id;
    const producto = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        precio: req.body.precio,
        existencia: req.body.existencia,
    };
    Productos.findByPk(id)
        .then(data => {
            const respuesta = {mensaje: "Los datos del producto fueron actualizados"};
            data.update(producto);
            data.save().then(res.send(respuesta))
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al modificar el producto con id=" + id
            });
        });
};
