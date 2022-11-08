const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { valideFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    valideFields
], login);

module.exports = router;