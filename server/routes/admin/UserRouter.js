var express = require('express');
var UserRouter = express.Router();

// 图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

const UserController = require('../../controlls/UserController')

/* GET home page. */
UserRouter.post('/adminapi/login', UserController.login);

UserRouter.get('/adminapi/captcha', UserController.captcha)

UserRouter.post('/adminapi/upload', upload.single('file'), UserController.upload)
UserRouter.get('/adminapi/getuserifo', UserController.getuserinfo)
UserRouter.post('/adminapi/adduser', upload.single('file'), UserController.adduser)

UserRouter.get('/adminapi/getUserlits', UserController.getUserlits)


module.exports = UserRouter;
