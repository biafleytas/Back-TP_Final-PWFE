var cors = require('cors');
module.exports = app => {
    app.use(cors({
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        origin: 'http://localhost:4200'
    }));
    const detalles = require("../controllers/detalledao.controller.js");
    var router = require("express").Router();
    router.post("/", detalles.create);
    router.get("/", detalles.listarDetalles);
    router.delete("/:id", detalles.eliminarDetalle);
    router.get("/producto", detalles.listarPorProducto);
    app.use('/api/detalles', router);
};