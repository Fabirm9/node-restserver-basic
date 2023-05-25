const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, verifyToken } = require('../controllers/auth');
const { valideFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    valideFields
], login);


router.post('/google', [
    check('id_token', 'Token from google is required').not().isEmpty(),
    valideFields
], googleSingIn);


router.get('/', validateJWT, verifyToken);

module.exports = router;