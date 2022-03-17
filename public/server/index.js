'use strict';
(function () {
    const express = require('express');
    const path = require('path');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');

    const {dbinit} = require('./database/index');

    dbinit().then(console.log("db iniciada"));
   
    var clienteRouter = require('./routes/cliente');
    var proveedorRouter = require('./routes/proveedor');
    var productoRouter = require('./routes/producto');
    var comboRouter = require('./routes/combo');

    const app = express();
    const publicPath = path.resolve(__dirname, '../dist');
    const port = 5000;

    // point for static assets
    app.use(express.static(publicPath));
    
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    

    //view engine setup
    app.set('views', path.join(__dirname, '../dist'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended:true
    }));

    //app.use('/', routes);
    app.use('/api/cliente', clienteRouter);
    app.use('/api/proveedor', proveedorRouter);
    app.use('/api/producto', productoRouter);
    app.use('/api/combo', comboRouter);
    app.use('/', function(req, res){
        res.json('hola')
    });

    app.use(cookieParser());

    const server = app.listen(port, () => console.log(`Express server listening on port ${port}`));

    module.exports = app;

}());