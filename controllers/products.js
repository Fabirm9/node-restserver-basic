const { response, request } = require("express");
const { body } = require("express-validator");
const { Category, Product } = require('../models');

//Get list products
const getProducts = async(req, res = response) => {
    const { limit = 3, from = 0 } = req.query;
    const query = ({ state: true });

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(from)
        .limit(Number(limit))
    ])

    res.json({
        products,
        total
    })

}

const getProduct = async(req, res = response) => {

    const { productId } = req.params;
    const product = await Product.findOne({ productId }).populate('user', 'name').populate('category', 'name');

    return res.status(200).json({
        product
    });

}

//create product
const createProduct = async(req, res = response) => {

    const { user, state, category, ...body } = req.body;

    const productDb = await Product.findOne({ name: req.body.name });

    if (productDb) {
        return res.status(400).json({
            msg: 'Product already exists'
        });
    }

    const data = {
        ...body,
        state: true,
        available: true,
        category,
        user: req.userAuthenticate._id
    }

    const product = new Product(data);
    await product.save();

    res.status(201).json(product);
}


//update category
const productPut = async(req = request, res) => {
    const { productId } = req.params;
    const { name, state, category, ...product } = req.body;

    const capitalName = name.toUpperCase();
    product.name = capitalName;

    const productDb = await Product.findByIdAndUpdate(productId, product, product);
    res.json(productDb);
}

const productDelete = async(req, res) => {

    const { productId } = req.params;
    const userAuthenticate = req.userAuthenticate;
    const product = await Product.findByIdAndUpdate(productId, { state: false })

    res.json({
        success: true,
        message: `deleted category with Id ${productId}`,
        product,
        //userAuthenticate
    })
}

module.exports = {
    getProducts,
    createProduct,
    productPut,
    getProduct,
    productDelete
}