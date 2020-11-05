'use strict'
//Aquí creo un modelo para articulos (guardar datos, devolver datos, etc)

//cargamos mongoose
var mongoose = require('mongoose');
//cargamos el schema del mongoose
var Schema = mongoose.Schema;

//Aquí defino la estructura que van a tener los objetos
var articleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String,
    price: String,
    stock: String,
    categorie: String
});

//lo exportamos para poder usarlo en otras parte del backend
                                //nombre del modelo,  esquema del modelo
module.exports = mongoose.model('Article', articleSchema);
//mongoose lo que hace es guardar items de este tipo y con esta estructura dentro de la coleccion articles (lo crea siempre en minuscula)

