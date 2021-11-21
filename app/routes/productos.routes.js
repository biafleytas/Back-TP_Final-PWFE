var cors = require('cors');
module.exports = app => {
    app.use(cors({
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        origin: 'http://localhost:4200'
    }));
    const producto = require("../controllers/productosdao.controller.js");
    var router = require("express").Router();
    router.post("/", producto.create);
    router.get("/", producto.listarProductos);
    router.put("/:id", producto.modificarProducto);
    router.delete("/:id", producto.eliminarProducto);
    app.use('/api/producto', router);
};