'use strict'
//en el controlador definimos los metodos y rutas con los articulos de nuestra API

//
var validator = require('validator');
var articlemodel = require('../models/article');
var filesistem = require('fs');
var path = require('path');


//creamos un objeto "controller" con todas las funciones, de manera que cada funcion o metodo 
//es como una propiedad del objeto y es mas facil utilizarlo
var controller = {

    //**********METODO GUARDAR ARTICULOS**********
    save: function (req, res) {

        //recoger parametros para el post
        var params = req.body;

        //validar datos (validator)
        //validator.js de node tiene infinidad de validaciones para aplicar
        //docu: https://www.npmjs.com/package/validator
        try {
            var validateTitle = !validator.isEmpty(params.title);
            var validateContent = !validator.isEmpty(params.content);
        }
        catch (err) {
            return res.status(200).send({
                status: 'Error',
                message: 'Faltan datos por enviar'
            });
        }

        //si validacion es positiva
        if (validateTitle && validateContent) {
            //crear el objeto a guardar
            var article = new articlemodel();

            //asignar valores - esto se podria hacer en una funcion aparte
            //pero de momento se queda así
            article.title = params.title;
            article.content = params.content;
            if (params.image) {
                article.image = params.image;
            } else {
                article.image = null;
            }

            article.price = params.price;
            article.stock = params.stock;
            article.categorie = params.categorie;

            //guardar objeto - esto se podria hacer en una funcion aparte
            //pero de momento se queda así
            //## los metodos save,findById, findOneAndUpdate, findOneAndDelete etc son de javascript/nodejs
            article.save(function (err, articleStored) {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                else {
                        //devolver respuesta
                    return res.status(200).send({
                        status: 'success',
                        article: articleStored
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
    getArticles: function (req, res)
    { 
        //query de todos los articulos
        var query = articlemodel.find({}); 

        //he hecho una ruta para obtener todos los articulos y si le anyado un parametro a la URL, solo buscare los ultimos articulos (todo en la misma ruta)
        //detecto si la url es para ultimos articulos o para todos los articulos
        var last = req.params.last;
        if (last || last !== undefined)
        {
            //limito para solo mostrar los ultimos 5 articulos
            query.limit(8);
        }

        //find all - (sort -_id, el menos lo que hace es ordenar de mas nuevos a mas viejos por id)
        query.sort('-_id').exec((err, articles) => {
            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error encontrando los articulos',
                    err
                });
            }
            //if articles empty
            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar',
                    err
                });
            }
            // si existen articulos devuelvelos todos
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },
    //**********METODO OBTENER SOLO UN ARTICULO**********
    getSingleArticle: function (req, res) {
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
        articlemodel.findById(articleId, function (err, articleresult) {
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
                articleresult
            });

        });
    },
    //**********METODO UPDATE ARTICULO**********
    update: function (req, res) {
        //leer el id del articulo 
        var artileid = req.params.id;

        //recoger los datos que llegan por put
        var params = req.body;
        //validar los datos
        try
        {
            var validateTitle = !validator.isEmpty(params.title);
            var validateContente = !validator.isEmpty(params.content);

        }
        catch(error){
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar antes de hacer el update'
            });
        }

        if (validateTitle && validateContente) {
            //hacer find en base de datos y update
            //{new: true} lo que hace es un parametro que devuelve el objeto con el que estoy trabajando atualizado
            articlemodel.findOneAndUpdate({_id: artileid}, params, {new: true}, function (err, articleUpdate) {
                //if error
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error encontrando los articulos',
                        err
                    });
                }
                //if articles empty
                if (!articleUpdate) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo que se quiere modificar no existe',
                        err
                    });
                }

            // si existen articulo devuelvelo
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
                });

            });
        }
        else {
            return res.status(500).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }     
    },
    //**********METODO BORRAR ARTICULO**********
    delete: function (req, res) {
        //recoger el id de la url
        var articleId = req.params.id;

        //find and delete
        articlemodel.findOneAndDelete({ _id: articleId }, function (err, articleremoved) {
            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error borrando los articulos',
                    err
                });
            }

            //if articles empty
            if (!articleremoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El articulo que se quiere borrar no existe en la B.D',
                    err
                });
            }

            // si existen articulo devuelvelo
            return res.status(200).send({
                status: 'success',
                article: articleremoved
            });

        });
    },
    //**********METODO UPLOAD IMAGE**********
    upload: function(req,res) {
        //configurar el modulo del connect multiparty - esto se hace en el router
        //recoger el fichero de la peticion
        var filename = 'imagen no subida...';
         
        if (!req.files) {
            return res.status(401).send({
                status: 'error',
                message: filename
            });
        }

        console.log("req: " + req);
        console.log("req.files: " + req.files);
        console.log("req.files.file0: " + req.files.file0);

        //conseguir el nombre y la extension
        var filePath = req.files.file0.path;
        var fileSplit = filePath.split('\\');

        console.log("filePath: " + filePath);
        console.log("fileSplit: " + fileSplit);

        //*LINUX O MAC* - esto no se como detectarlo
        //var filSplit = filePath.split('/');

        //Nombre del archivo
         filename = fileSplit[2];

        console.log("filename: " + filename);

        //extension del fichero
        var extensionSplitName = filename.split('\.');
        var fileExt = extensionSplitName[1];

        console.log("fileExt: " + fileExt);


        //comprobar la extenion (solo imagenes) si no es valida borrar fichero

        if (fileExt.toLowerCase() !== 'jpg' && fileExt.toLowerCase() !== 'png' && fileExt.toLowerCase() !== 'jpeg' && fileExt.toLowerCase() !== 'gif')
        {
            //borrar archivo subido si la extension no es valida
            filesistem.unlink(filePath, function (err) {
                return res.status(401).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                });
            });
        }
        else
        {
            //si todo es valido buscamos el articulo por id y le asignamos la imagen antes de hacer el update
            var articleid = req.params.id;

            if (articleid) {
                articlemodel.findOneAndUpdate({ _id: articleid }, { image: filename }, { new: true }, function (err, articleUpdated) {

                    //if error
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al guardar la imagen en el articulo',
                            err
                        });
                    }

                    //if articles empty
                    if (!articleUpdated) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'El articulo que se quiere modificar no existe',
                            err
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        articleUpdated
                    });
                });
            } else {
                //si no hay id simplemente que suba la imagen al backend y me devuelva el nombre de la imagen
                return res.status(200).send({
                    status: 'success',
                    image: filename
                });
            }
        }
    },

    //**********METODO GET IMAGE**********
    getImage: function (req, res) {

        //sacamos nombre de imagen por url
        var fileName = req.params.image;
        //le definimos el path
        var pathFile = './upload/articles/' + fileName;
        //miramos si el fichero existe
        filesistem.exists(pathFile, function (existe) {
            if (existe) {
                //envio el fichero de vuelta
                return res.sendFile(path.resolve(pathFile));
            }
            else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        });
    },
    //**********METODO BUSCAR**********
    search: function (req, res) {
        //sacar el string a buscar de la url
        var searchString = req.params.search;

        //find or 
        articlemodel.find({
            "$or": [
                //esto significa --> si el searchstring esta incluido "i" en el titulo o esta incluido en el content
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } },
            ]
        }).sort([['date', 'descending']]).exec(function (err, articles) {

            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al buscar',
                    err
                });
            }

            //if articles empty
            if (!articles || articles.length <=0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar que coincidan con tu busqueda',
                    err
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },
    getByCategorie: function (req, res) {
        var searchString = req.params.search;
        articlemodel.find({ "categorie": searchString }).sort([['date', 'descending']]).exec(function (err, articles) {
            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al buscar categoria',
                    err
                });
            }

            //if articles empty
            if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar que coincidan con tu categoria',
                    err
                });
            }

            return res.status(200).send({
                status: 'success',
                articles: articles
            });
        });
    },
    filterArticlesByPrice: function (req, res) {
        var min = req.params.min;
        var max = req.params.max;
    },
    getCategories: function (req, res) {
        articlemodel.distinct("categorie").exec(function (err, categories) {
            //if error
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al buscar categoria',
                    err
                });
            }

            //if articles empty
            if (!categories || categories.length <= 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar que coincidan con tu categoria',
                    err
                });
            }

            return res.status(200).send({
                status: 'success',
                categories: categories
            });
        });
    }

}; // end controller


//exportamos para poder usar estos metodos en el resto de la app
module.exports = controller;




