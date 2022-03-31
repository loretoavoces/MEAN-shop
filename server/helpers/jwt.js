const expressJwt = require('express-jwt');

const authJwt = () => {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            // '/api/v1/users/login',
            // register
        ]
    })
}

module.exports = authJwt