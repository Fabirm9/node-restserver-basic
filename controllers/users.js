const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');


const usersGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = ({ state: true });

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(from)
        .limit(Number(limit))
    ]);

    res.json({
        users,
        total
    })
};

const usersPut = async(req = request, res) => {
    const { userId } = req.params;
    const { password, google, email, ...user } = req.body;

    //validate on db
    if (password) {
        //encrypt password - hash
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    }

    const userDb = await User.findByIdAndUpdate(userId, user);


    res.json(userDb)
};

const usersPost = async(req = request, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });


    //encrypt password - hash
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //save
    await user.save();

    res.status(201).json({
        success: true,
        message: "post Api",
        user
    })
};

const usersDelete = async(req, res) => {

    const { userId } = req.params;

    await User.findByIdAndUpdate(userId, { state: false })
        //await User.deleteOne({ userId });

    res.json({
        success: true,
        message: `delete user with Id ${userId}`
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}