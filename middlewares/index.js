const valideFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFile = require('../middlewares/validate-file');


module.exports = {
    ...valideFields,
    ...validateJWT,
    ...validateRoles,
    ...validateFile
}