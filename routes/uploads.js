const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateFile, showFile, updateFileCloudibary } = require('../controllers/uploads');
const { collectionsAllowed } = require('../helpers');

const { valideFields, validateFile } = require('../middlewares');

const router = Router();

router.get('/:collection/:id', [
    check('id', 'Field id should be of mongo').isMongoId(),
    check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    valideFields
], showFile)

router.post("/", validateFile, uploadFiles);

router.put("/:collection/:id", [
    validateFile,
    check('id', 'Field id should be of mongo').isMongoId(),
    check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
    valideFields
], updateFileCloudibary);


module.exports = router;