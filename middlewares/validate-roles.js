const { response } = require("express")


const isAdminRole = (req, res = response, next) => {

    if (!req.userAuthenticate) {
        return res.status(500).json({
            msg: 'request to verify role but without verify token first'
        })
    }
    const { role, name } = req.userAuthenticate;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} isn't admin`
        })
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.userAuthenticate) {
            return res.status(500).json({
                msg: 'request to verify role but without verify token first'
            })
        }

        if (!roles.includes(req.userAuthenticate.role)) {
            return res.status(401).json({
                msg: `Services require one of these roles ${roles}`
            })
        }

        console.log(roles, req.userAuthenticate.role);
        next();
    }

}

module.exports = {
    isAdminRole,
    hasRole
}