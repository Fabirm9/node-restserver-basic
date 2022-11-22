const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategory, getCategories, categoryPut, categoryDelete } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db-validators');
const { validateJWT, valideFields, hasRole, isAdminRole } = require('../middlewares');

const router = Router();

//middleware por id existCategory - validate 

//get all categories
router.get('/', getCategories);

// get category by id
router.get('/:categoryId', [
    check('categoryId', 'Id is not valid').isMongoId(),
    check('categoryId').custom(existCategoryById),
    valideFields
], getCategory);

//create category - private - anyone with token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    valideFields
], createCategory);

//update category  - private - anyone with token 
router.put('/:categoryId', [
    check('categoryId', 'Id is not valid').isMongoId(),
    check('categoryId').custom(existCategoryById),
    valideFields
], categoryPut);

//delete a category - admin
router.delete('/:categoryId', [
    validateJWT,
    isAdminRole,
    check('categoryId', 'Id is not valid').isMongoId(),
    check('categoryId').custom(existCategoryById),
    valideFields
], categoryDelete);


module.exports = router;