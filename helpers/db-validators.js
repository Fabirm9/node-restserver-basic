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

module.exports = {
    roleValid,
    existEmail,
    existUserById
}