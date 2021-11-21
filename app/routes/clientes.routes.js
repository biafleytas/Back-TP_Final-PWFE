var cors = require('cors');
module.exports = app => {
    app.use(cors({
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        origin: 'http://localhost:4200'
    }));
    const clientes = require("../controllers/clientesdao.controller.js");
    var router = require("express").Router();
    router.post("/", clientes.create);
    router.get("/", clientes.listarClientes);
    router.put("/:id", clientes.modificarCliente);
    router.delete("/:id", clientes.eliminarCliente);
    app.use('/api/clientes', router);
};