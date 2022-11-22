const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, productPut, getProduct, productDelete } = require('../controllers/products');
const { existProductById, existCategoryById } = require('../helpers/db-validators');
const { validateJWT, valideFields, hasRole, isAdminRole } = require('../middlewares');

const router = Router();


router.get('/', getProducts);

router.get('/:productId', [
    check('productId', 'Id is not valid').isMongoId(),
    check('productId').custom(existProductById),
    valideFields
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId(),
    check('category').custom(existCategoryById),
    valideFields
], createProduct);

//update category  - private - anyone with token 
router.put('/:productId', [
    check('productId', 'Id is not valid').isMongoId(),
    check('productId').custom(existProductById),
    valideFields
], productPut);

//delete a category - admin
router.delete('/:productId', [
    validateJWT,
    isAdminRole,
    check('productId', 'Id is not valid').isMongoId(),
    check('productId').custom(existProductById),
    valideFields
], productDelete);

module.exports = router;