const { response, request } = require("express");
const { Category } = require('../models');

const getCategories = async(req, res = response) => {
    const { limit = 3, from = 0 } = req.query;
    const query = ({ state: true });

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip(from)
        .limit(Number(limit))
    ])

    res.json({
        categories,
        total
    })

}

const getCategory = async(req, res = response) => {

    const { categoryId } = req.params;
    const category = await Category.findOne({ categoryId }).populate('user', 'name');

    return res.status(200).json({
        category
    });

}

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({ name });

    if (categoryDb) {
        return res.status(400).json({
            msg: 'Category already exists'
        });
    }

    const data = {
        name,
        state: true,
        user: req.userAuthenticate._id
    }

    const category = new Category(data);
    await category.save();

    res.status(201).json(category);
}

//update category
const categoryPut = async(req = request, res) => {
    const { categoryId } = req.params;
    const { name, ...category } = req.body;

    const capitalName = name.toUpperCase();
    category.name = capitalName;

    const categoryDb = await Category.findByIdAndUpdate(categoryId, category);
    res.json(categoryDb);
}

//deleteCategory - state: false

const categoryDelete = async(req, res) => {

    const { categoryId } = req.params;
    const userAuthenticate = req.userAuthenticate;
    const category = await Category.findByIdAndUpdate(categoryId, { state: false })

    res.json({
        success: true,
        message: `deleted category with Id ${categoryId}`,
        category,
        //userAuthenticate
    })
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    categoryPut,
    categoryDelete
}