const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');

const roleValid = async(role = '') => {
    const existRol = await Role.findOne({ role });
    if (!existRol)
        throw new Error(`Role ${ role } is not exist on db`)
}

const existEmail = async(email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`Email ${email} already exist`);
    }
}

const existUserById = async(userId = '') => {
    const existUser = await User.findById({ _id: userId });
    if (!existUser) {
        throw new Error(`userId ${userId} is not exist`);
    }
}

const existCategoryById = async(categoryId = '') => {
    const existCategory = await Category.findById({ _id: categoryId });
    if (!existCategory) {
        throw new Error(`categoryId ${categoryId} is not exist`);
    }
}

const existProductById = async(productId = '') => {
    const existProduct = await Product.findById({ _id: productId });
    if (!existProduct) {
        throw new Error(`productId ${productId} is not exist`);
    }
}

const collectionsAllowed = (collection = '', collections = []) => {
    const incluide = collections.includes(collection);

    if (!incluide) {
        throw new Error(`The collection ${collection} isn't allowed, ${collections}`)
    }

    return true;
}

module.exports = {
    roleValid,
    existEmail,
    existUserById,
    existCategoryById,
    existProductById,
    collectionsAllowed
}