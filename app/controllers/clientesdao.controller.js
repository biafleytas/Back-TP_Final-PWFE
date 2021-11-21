const db = require("../models");
const Clientes = db.Clientes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
// crea una cliente
    const cliente = {
        ruc: req.body.ruc,
        nombre: req.body.nombre,
        email: req.body.email
    };

// Guardamos el cliente en la base de datos
    Clientes.create(cliente)
        .then(data => {
            console.log('Se creo el cliente');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el cliente."
            });
        });
};

exports.listarClientes = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
    Clientes.findAll( { where: condition })
        .then(data => {
            console.log('Mostrando el listado de clientes');
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los clientes."
            });
        });
};

exports.eliminarCliente = (req, res) => {
    const id = req.params.id;
    var condition = id ? { id_clientes:  id } : null;
    const respuesta = {mensaje: "El cliente fue eliminado"};
    Clientes.destroy({ where: condition }).then(res.send(respuesta));
    console.log('El cliente fue eliminado');
};

exports.modificarCliente = (req, res) => {
    const id = req.params.id;
    const cliente = {
        nombre: req.body.nombre,
        ruc: req.body.ruc,
        email: req.body.email,
    };
    Clientes.findByPk(id)
        .then(data => {
            const respuesta = {mensaje: "Los datos del cliente fueron actualizados"};
            data.update(cliente);
            data.save().then(res.send(respuesta))
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al modificar el cliente con id=" + id
            });
        });
};
