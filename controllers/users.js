const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


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

    //Generate jwt
    const token = await generateJWT(user.id);


    //save
    await user.save();

    res.status(201).json({
        ok: true,
        msg: "post Api",
        user,
        token
    })
};

const usersDelete = async(req, res) => {

    const { userId } = req.params;
    const userAuthenticate = req.userAuthenticate;
    const user = await User.findByIdAndUpdate(userId, { state: false })

    res.json({
        ok: true,
        msg: `delete user with Id ${userId}`,
        user,
        //userAuthenticate
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}