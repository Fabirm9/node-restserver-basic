const { response, request } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'without token'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token invalid - user no found'
            })
        }


        //verify if uid has uid true        
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token invalid - state:false'
            })
        }
        req.userAuthenticate = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msh: 'Token invalid'
        })
    }


}


module.exports = {
    validateJWT
}