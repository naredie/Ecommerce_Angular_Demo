'use strict'
//en el controlador definimos los metodos y rutas con los articulos de nuestra API

//
var validator = require('validator');
var cartProductmodel = require('../models/cartproduct');
var filesistem = require('fs');
var path = require('path');



var controller = {

    //**********METODO GUARDAR productos en el carro**********
    save: function (req, res) {
        //recoger parametros para el post
        var params = req.body;

        //validar datos (validator)
        try {
            var validateTitle = !validator.isEmpty(params.title);
        }
        catch (err) {
            return res.status(200).send({
                status: 'Error',
                message: 'Faltan datos por enviar'
            });
        }

        //si validacion es positiva
        if (validateTitle) {
            //crear el objeto a guardar
            var cartProduct = new cartProductmodel();

            //asignar valores - esto se podria hacer en una funcion aparte
            //pero de momento se queda así
            cartProduct.title = params.title;
            if (params.image) {
                cartProduct.image = params.image;
            } else {
                cartProduct.image = null;
            }

            cartProduct.price = params.price;
            cartProduct.qty = params.qty;
            cartProduct.cartid = params.cartid;
            cartProduct.categorie = params.categorie;

            //guardar objeto - esto se podria hacer en una funcion aparte
            //pero de momento se queda así
            //## los metodos save,findById, findOneAndUpdate, findOneAndDelete etc son de javascript/nodejs
            cartProduct.save(function (err, productStored) {
                if (err || !productStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                else {
                    //devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        product: productStored,
                        params: params
                    });
                }
            });



        }
        else {
            //si validacion es negativa
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos'
            });
        }
        //siempre devuelvo una respuesta para que el frontend sepa si todo ha ido bien o tenemos errores
    }, 
    //**********METODO OBTENER TODOS LOS ARTICULOS**********
    getcartProducts: function (req, res)
    { 
        //query de todos los articulos
        var query = cartProductmodel.find({}); 

        //find all - (sort -_id, el menos lo que hace es ordenar de mas nuevos a mas viejos por id)
        query.sort('-_id').exec((err, products) => {
            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error encontrando los articulos',
                    err
                });
            }
            //if articles empty
            if (!products) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar',
                    err
                });
            }
            // si existen articulos devuelvelos todos
            return res.status(200).send({
                status: 'success',
                products: products
            });
        });
    },
    //**********METODO OBTENER SOLO UN ARTICULO**********
    getSingleProduct: function (req, res) {
        //recogemos la id de la url
        var articleId = req.params.id;

//comprobacion de si ese item existe
if (!articleId || articleId === null || articleId === undefined) {
    return res.status(404).send({
        status: 'error',
        message: 'El articulo buscado no existe'
    });
}

//buscar atrticulo en BD
        cartProductmodel.findById(articleId, function (err, articleresult) {
    //if error
    if (err) {
        return res.status(500).send({
            status: 'error',
            message: 'Error encontrando los articulos',
            err
        });
    }

    //if articles empty
    if (!articleresult) {
        return res.status(404).send({
            status: 'error',
            message: 'El articulo buscado no existe',
            err
        });
    }

    // si existen articulo devuelvelo
    return res.status(200).send({
        status: 'success',
        productresult
    });

});
    },
    //**********METODO BORRAR ARTICULO**********
    deleteProduct: function (req, res) {
        //recoger el id de la url
        var articleId = req.params.id;
        console.log(articleId);
        //find and delete
        cartProductmodel.findOneAndDelete({ _id: articleId }, function (err, productremoved) {
            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error borrando los productos',
                    err
                });
            }

            //if articles empty
            if (!productremoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El producto que se quiere borrar no existe en la B.D',
                    err
                });
            }

            // si existen articulo devuelvelo
            return res.status(200).send({
                status: 'success',
                article: productremoved
            });

        });
    }
   
}; // end controller


//exportamos para poder usar estos metodos en el resto de la app
module.exports = controller;




