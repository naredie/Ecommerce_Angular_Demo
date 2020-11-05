'use strict'
//archivo de rutas. 

var express = require('express');
//carga el controlador articleController
var ArticleController = require('../controllers/articleController');

var router = express.Router();

//modulo para upload imagenes
var multiparty = require('connect-multiparty');
var midelware_upload = multiparty({ uploadDir: './upload/articles' });

//rutas para articulos
router.post('/save', ArticleController.save);
//metodo get
//:last? es un parametro opcional en la url por lo que funciona la url articles o la url articles/:last? 
router.get('/articles/:last?', ArticleController.getArticles);
//ruta para solo 1 articulo
router.get('/article/:id', ArticleController.getSingleArticle);
//ruta para update
router.put('/article/:id', ArticleController.update);
//ruta para delete
router.delete('/article/:id', ArticleController.delete);
//ruta para upload
router.post('/upload-image/:id?', midelware_upload, ArticleController.upload);
//ruta para get imagen
router.get('/get-image/:image', ArticleController.getImage);
//ruta para buscar
router.get('/search/:search', ArticleController.search);
//ruta para buscar por categoria
router.get('/search/categorie/:search', ArticleController.getByCategorie);
//ruta para buscar todas las categorias
router.get('/categories', ArticleController.getCategories);







module.exports = router;