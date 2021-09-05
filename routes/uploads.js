/* 
    ruta: /api/todo/:busqueda
 */
const { Router, application } = require('express');
const expressfileUpload = require('express-fileupload');
const { check } = require('express-validator');
const { fileUpload, retornaImagen } = require('../controllers/uploads');



const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload );

router.get('/:tipo/:foto', validarJWT, retornaImagen );



module.exports = router;