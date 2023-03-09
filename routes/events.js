const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validarJWT)

//Obtener eventos
router.get('/', getEvents);

//Crear evento
router.post(
    '/',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','La fecha de inicio es obligatoria').custom(isDate),
        check('end','La fecha de fin es obligatoria').custom(isDate),
        validarCampos,
    ],
     createEvent);

//Actualizar eventos
router.patch('/:id', updateEvent);

//Borrar eventos
router.delete('/:id', deleteEvent);

module.exports = router;