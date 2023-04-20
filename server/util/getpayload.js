const JWT = require('./jwt')

const getpayload = (req) => {
    const token = req.headers['authorization'].split(" ")[1];
    let payload = JWT.verify(token)
    return payload
}

module.exports = getpayload