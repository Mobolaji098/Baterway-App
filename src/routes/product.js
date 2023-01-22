const express = require('express');
const {check} = require('express-validator');
// const multer = require('multer');

// const User = require('../controllers/user');
const Product = require('../controllers/product');
const validate = require('../middlewares/validate');

const router = express.Router();

// const upload = multer().single('profileImage');

//INDEX
router.get('/', Product.index);


router.post('/store', [
    check('name').not().isEmpty().withMessage('Name of product is required'),
    check('price').not().isEmpty().withMessage('Product price is required'),
    check('weight').not().isEmpty().withMessage('Product weight required'),
    check('description').not().isEmpty().withMessage('Product description is required'),
    check('categories').not().isEmpty().withMessage('Product categories required'),
    check('itemInReturn').not().isEmpty().withMessage('Your itemInReturn required'),
    check('location').not().isEmpty().withMessage('Your location required'),
], validate, Product.store);





module.exports = router;