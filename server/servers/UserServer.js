const connection = require('../db/index')

const JWT = require('../util/jwt')
const delimage = require('../util/delimage')
const { publicMenu, adminMenu } = require('../util/menu')

const UserServer = {
    login: (username, password, res) => {
        connection.query(`select uid,username,gender,introduction,role,convert(avatar using utf8) as avatar,password from users where username='${username}'`, (error, results) => {
            if (error) console.log(error);
            // console.log(results[0])
            if (results.length != 0) {
                if (results[0].password !== password) {
                    res.send({ code: 403, data: { message: '输入密码错误' } })
                } else {
                    // 生成token
                    const token = JWT.generate({
                        id: results[0].uid,
                        username: results[0].username,
                        role: results[0].role
                    }, '1d')
                    res.header("Authorization", token)
                    const menu = results[0].role == 0 ? [...publicMenu, ...adminMenu] : publicMenu
                    res.send({
                        code: 200,
                        data: {
                            message: '登陆成功',
                            id: results[0].uid,
                            username: results[0].username,
                            gender: results[0].gender,//性别 0,1,2
                            introduction: results[0].introduction,//简介
                            avatar: results[0].avatar,
                            role: results[0].role,//管理员0，编辑2 ,vip用户1
                            menu
                        }
                    })
                }
            } else {
                res.send({ code: 404, data: { message: "用户名输入有误" } })
            }


        })
    },
    upload: (userinfo, res) => {
        const { uid, username, gender, introduction, avatar, avatar_file_name } = userinfo
        connection.query(`select username from users where username='${username}'`, (error, results) => {
            if (error) return error
            if (results.length !== 0) {
                res.send({ code: 401, message: '用户名已存在,请更改' })
            } else {
                if (avatar) {
                    connection.query(`update users set username='${username}', gender='${gender}', introduction='${introduction}', avatar='${avatar}',avatar_file_name='${avatar_file_name}' where uid='${uid}'`, (err, result) => {
                        if (err) return err
                        res.send({ code: 200, message: '更改成功' })
                    })
                } else {
                    connection.query(`update users set username='${username}', gender='${gender}', introduction='${introduction}' where uid='${uid}'`, (err, result) => {
                        if (err) return err
                        res.send({ code: 200, message: '更改成功' })
                    })
                }
            }
        })

    },
    getuserinfo: (uid, res) => {
        // console.log(uid)
        connection.query(`select uid as id,username,gender,introduction,role,convert(avatar using utf8) as avatar from users where uid='${uid}'`, (erro, results) => {
            if (erro) return erro
            // const avatar = 
            res.send({
                code: 200,
                data: results[0]
            })
        })
    },
    adduser: (userinfo, res) => {
        const { uid, username, password, role, introduction, gender, avatar, avatar_file_name } = userinfo

        connection.query(`select uid from users where username='${username}'`, (err, result) => {
            if (err) return err
            if (result.length !== 0) {
                res.send({
                    code: 401,
                    message: '用户名已存在'
                })
            } else {
                connection.query(`INSERT INTO users (uid, username, password, role, introduction, gender, avatar,avatar_file_name) values ('${uid}', '${username}', '${password}', '${role}', '${introduction}', '${gender}', '${avatar}','${avatar_file_name}')`, (error, results) => {
                    if (error) return error
                    res.send({
                        code: 200,
                        message: '插入成功'
                    })
                })

            }
        })

    },
    getUserlits: (res) => {
        connection.query(`select username,convert(avatar using utf8) as avatar,role from users`, (error, results) => {
            if (error) return error
            res.send({
                code: 200,
                data: results
            })

        })
    },
    getAvatarFileName: (uid, avatarFileName) => {
        if (!avatarFileName) return
        connection.query(`select avatar_file_name from users where uid='${uid}'`, (error, results) => {
            if (error) return error
            /* console.log(results[0].avatar_file_name) */
            if (results.length !== 0) {
                delimage('avataruploads', results[0].avatar_file_name)
            }
            return
        })
    }
}


// connection.end()

module.exports = UserServer