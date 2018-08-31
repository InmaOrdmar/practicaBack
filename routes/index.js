var express = require('express');
var router = express.Router();

const {query, validationResult} = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  //render homepage on server
  res.render('index');
});

router.get('/query', [
  //validations. buscar custom validations
  query('size').isNumeric().withMessage('must be a number')
  //añadir una validación más para cada parámetro que pueda tener la query
], (req, res, next) => {
  console.log(req.query);
  validationResult(req).throw(); // --> pasa los errores de validación a next(err)
  res.send(`you chose size ${req.query.size}`);
}); 

//PARA RECOGER DATOS DESDE FORMULARIO --> req.body
//para usar form data: npm multer
router.post('/body', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
})

module.exports = router;
