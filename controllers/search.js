const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Category, Product, User } = require('../models');

const collectionsAllow = ['products', 'users', 'categories'];

const searchUsers = async(term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const userFound = await User.findById(term);
        res.json({
            results: (userFound) ? [userFound] : []
        })
    } else {
        const regex = new RegExp(term, 'i');

        const userFounds = await User.find({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ state: true }]
        });

        res.json({
            results: userFounds
        })
    }
}

const searchProducts = async(term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const producFound = await Product.findById(term).populate('category', 'name').populate('category', 'name');
        res.json({
            results: (producFound) ? [producFound] : []
        })
    } else {
        const regex = new RegExp(term, 'i');
        const producFound = await Product.find({ $and: [{ name: regex }, { state: true }] }).populate('category', 'name');

        res.json({
            results: producFound
        })
    }
}

const searchCategories = async(term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const category = await Category.findById(term);
        res.json({
            results: (category) ? [category] : []
        })
    } else {
        const regex = new RegExp(term, 'i');

        const category = await Category.find({
            $or: [{ name: regex }],
            $and: [{ state: true }]
        });

        res.json({
            results: category
        })
    }
}


const search = async(req, res = response) => {

    const { collection, term } = req.params;

    if (!collectionsAllow.includes(collection)) {
        return res.status(400).json({
            msg: `The collections allows are: ${collectionsAllow}  `
        })
    }

    switch (collection) {
        case 'products':
            await searchProducts(term, res);
            break;
        case 'users':
            await searchUsers(term, res);
            break;
        case 'categories':
            await searchCategories(term, res);
            break;
        default:
            res.status(500).json({
                msg: 'Forget include this search'
            })
            break;
    }
}


module.exports = {
    search
}