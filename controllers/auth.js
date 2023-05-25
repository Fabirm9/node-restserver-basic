const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //verify if email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "user / password aren't right - email"
            })
        }

        //If user is active
        if (!user.state) {
            return res.status(400).json({
                msg: "user / password aren't right - status:false"
            })
        }

        //verify password
        const validatePassword = bcryptjs.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                msg: "user / password aren't right - password",
                ok: false
            })
        }

        //Generate jwt
        const token = await generateJWT(user.id);

        res.json({
            user,
            token,
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Upss.. something went wrong',
            ok: false
        })
    }

}

const googleSingIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                name,
                email,
                img,
                password: '23423',
                google: true,
                role: 'USER_ROLE'
            };
            user = new User(data);
            await user.save();
        }


        if (!user.state) {
            return res.status(401).json({
                msg: "Talk with admin, user block "
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            msg: 'Ok',
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: "false",
            msg: "Token can't verify "
        })
    }
}

const verifyToken = async(req, res = response) => {

    const { userAuthenticate } = req;

    //Generate jwt
    const token = await generateJWT(userAuthenticate.id);

    res.json({
        userAuthenticate,
        token,
        ok: true
    })

}

module.exports = {
    login,
    googleSingIn,
    verifyToken
}