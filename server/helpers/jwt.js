// const expressJwt = require('express-jwt');

// const authJwt = () => {
//     const secret = process.env.secret;
//     return expressJwt({
//         secret,
//         algorithms: ['HS256']
//     }).unless({
//         path: [
//             // '/api/v1/users/login',
//             // register
//         ]
//     })
// }

// module.exports = authJwt

const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}



module.exports = authJwt