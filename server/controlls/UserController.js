const svgCaptcha = require('svg-captcha');
const UserServer = require('../servers/UserServer')
const { v4: uuidv4 } = require('uuid');

const payloads = require('../util/getpayload')

const UserController = {
    login: async (req, res) => {
        // console.log(req.body, req.session.captcha);
        const { username, password, code } = req.body
        const captch = String(req.session.captcha)
        // console.log(captch);
        if (code.toLocaleLowerCase() !== captch.toLocaleLowerCase()) {
            res.send({
                code: 401,
                data: { message: '验证码错误' }
            })
        } else {
            UserServer.login(username, password, res)
        }

    },
    captcha: (req, res) => {
        const captcha = svgCaptcha.create({
            noise: 3,
            width: 80,
            background: '#f1f1f1'
        });
        req.session.captcha = captcha.text;
        res.type('svg');
        res.status(200).send(captcha.data);
    },
    upload: async (req, res) => {
        const { username, gender, introduction } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        // console.log(req.file)
        const avatarFileName = req.file ? req.file.filename : ''
        UserServer.getAvatarFileName(payload.id, avatarFileName)
        let userinfo = {
            uid: payloads(req).id,
            username,
            gender,
            introduction,
            avatar,
            avatar_file_name: avatarFileName
        }
        // console.log(userinfo)
        UserServer.upload(userinfo, res)
    },
    getuserinfo: async (req, res) => {
        // console.log(payload)
        UserServer.getuserinfo(payloads(req).id, res)
    },
    adduser: async (req, res) => {
        const { username, gender, introduction, role, password } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        const userinfo = {
            uid: uuidv4().split('-').join(""),
            username,
            password,
            role,
            introduction,
            gender,
            avatar,
            avatar_file_name: req.file.filename
        }
        UserServer.adduser(userinfo, res)
    },
    getUserlits: (req, res) => {
        UserServer.getUserlits(res)
    }
}


module.exports = UserController