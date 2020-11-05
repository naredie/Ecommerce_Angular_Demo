'use strict'
//index solo crea la conexion con la base de datos (servidor)
//cargamos mongoose
var mongoose = require('mongoose');
var app = require('./app');
var port = '3900';

//defino el puerto para que lo leea del proceso y si no lo defina como 3900 por default
app.set('port', process.env.PORT || port);

//Forzamos a que los metodos antiguos de trabajo se desactiven - lo pone en la documentacion de mongoose
mongoose.set('useFindAndModify', false);
//esto lo recomienda mongoose en su documentacion
mongoose.Promise = global.Promise;
//conexion a mongodb - localhost es donde corre nuestro mongodb y api-rest-blog es el nombre de la base de datos
//
mongoose.connect('mongodb://localhost/api-rest-blog', { useNewUrlParser: true, useUnifiedTopology: true }).catch (err => console.log(err)).then(() => {
    console.log('Conexion a la bd correcta');

    //crear servidor y escuchar peticiones HTTP
    app.listen(app.get('port'), () => {
        console.log('Servidor corriendo en puerto ' + app.get('port'));
    });
});