'use strict'
//archivo de rutas. 

var express = require('express');
//carga el controlador articleController
var CartProductsController = require('../controllers/cartProductsController');

var router = express.Router();

//modulo para upload imagenes
var multiparty = require('connect-multiparty');
var midelware_upload = multiparty({ uploadDir: './upload/cartproducts' });

//rutas para articulos
router.post('/saveProdCart', CartProductsController.save);
//metodo get
router.get('/cartproducts', CartProductsController.getcartProducts);
//ruta para solo 1 articulo
router.get('/cartproducts/:id', CartProductsController.getSingleProduct);
//ruta para delete
router.delete('/cartproducts/:id', CartProductsController.deleteProduct);

module.exports = router;