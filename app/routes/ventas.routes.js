var cors = require('cors');
module.exports = app => {
    app.use(cors({
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        origin: 'http://localhost:4200'
    }));
    const ventas = require("../controllers/ventadao.controller.js");
    var router = require("express").Router();
    router.post("/", ventas.create);
    router.get("/", ventas.listarVentas);
    router.get("/cliente", ventas.listarPorCliente);
    router.get("/fecha", ventas.listarPorFecha);
    router.put("/:id", ventas.modificarVenta);
    app.use('/api/ventas', router);
};