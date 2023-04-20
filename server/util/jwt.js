const jsonwebtoken = require('jsonwebtoken')

const secret = 'bluecook'
const JWT = {
    /* 
     加密 expires过期时间
    */
    generate(value, expires) {
        return jsonwebtoken.sign(value, secret, { expiresIn: expires })
    },
    // 解密
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        }
        catch {
            return false
        }
    }
}

// const token = JWT.generate({ name: 'zhangsan' }, "10s")
// console.log(JWT.verify(token))
module.exports = JWT