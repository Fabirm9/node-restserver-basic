const { response, request } = require('express')

const usersGet = (req = request, res = response) => {

    const { q, name = 'No name', age } = req.query;

    res.json({
        success: true,
        message: "get Api - Controller",
        q,
        name,
        age
    })
};

const usersPut = (req = request, res) => {
    const { userId } = req.params;

    res.json({
        success: true,
        message: "put Api",
        userId
    })
};

const usersPost = (req = request, res) => {
    const { name, age } = req.body;

    res.status(201).json({
        success: true,
        message: "post Api",
        age,
        name
    })
};

const usersDelete = (req, res) => {
    res.json({
        success: true,
        message: "delete Api"
    })
}


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}