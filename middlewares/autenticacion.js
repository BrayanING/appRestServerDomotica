const jwt = require('jsonwebtoken');

//verificar token
let verificaToken = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.userToken = decoded.user;
        next();
    });

};

module.exports = {
    verificaToken
}