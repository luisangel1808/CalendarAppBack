/*
    Rutas de usuarios / Auth
    host  + /api/auth
*/
const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const router = Router();
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [ //middlewares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de al menos 6 carácteres').isLength({min:6}),
        validarCampos
    ]
    , createUser)

router.post(
    '/',
    [ //middlewares
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe ser de al menos 6 carácteres').isLength({min:6}),
    validarCampos
    ], 
    loginUser)

router.get('/renew', validarJWT, revalidateToken)

module.exports = router;