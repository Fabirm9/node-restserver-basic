const { Router } = require('express');
const { check } = require('express-validator');

const { valideFields, validateJWT, isAdminRole, hasRole } = require('../middlewares')

const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');
const { roleValid, existEmail, existUserById } = require('../helpers/db-validators');


const router = Router();


router.get('/', usersGet);

router.put('/:userId', [
    check('userId', 'Id is not valid').isMongoId(),
    check('userId').custom(existUserById),
    check('role').custom(roleValid),
    valideFields
], usersPut);

router.post('/', [
    check('name', 'Field name is required').not().isEmpty(),
    check('password', 'Field password is required and more that 6 letters').isLength({ min: 6 }).not().isEmpty(),
    check('email', 'Field email is not valid').isEmail(),
    check('email').custom(existEmail),
    //check('role', 'Field role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValid),
    valideFields
], usersPost);

router.delete('/:userId', [
    validateJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    check('userId', 'Id is not valid').isMongoId(),
    check('userId').custom(existUserById),
    valideFields
], usersDelete);



module.exports = router;