var express = require('express');
var router = express.Router();

const {query, validationResult} = require('express-validator/check');

//load Ad module
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', (req, res, next) => {
  Ad.find().exec((err, ads) => {
    if(err) {
      next(err);
      return;
    }
    //render homepage on server
    res.render('index', {ads});
  });
});

router.get('/query', [
  //validations. buscar custom validations
  //query('price').isNumeric().withMessage('must be a number'),
  //añadir una validación más para cada parámetro que pueda tener la query
], (req, res, next) => {
  console.log(req.query);
  validationResult(req).throw(); // --> pasa los errores de validación a next(err)
  res.send(`your ${req.query.size}`);
}); 

//PARA RECOGER DATOS DESDE FORMULARIO --> req.body
//para usar form data: npm multer
router.post('/body', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
})

module.exports = router;
