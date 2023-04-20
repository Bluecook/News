var express = require('express');
var NewsRouter = express.Router();

// 图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })


const NewsController = require('../../controlls/NewsController')

NewsRouter.post('/adminapi/addnews', upload.single('file'), NewsController.addNews);
NewsRouter.get('/adminapi/getnewslist', NewsController.getnewslist)
NewsRouter.get('/adminapi/getnewslist/:nid', NewsController.getnewslist)
NewsRouter.delete('/adminapi/delnew/:nid', NewsController.delnew)

NewsRouter.post('/adminapi/uploadNew', upload.single('file'), NewsController.uploadNew)

NewsRouter.put('/adminapi/shownew', NewsController.shownew)
NewsRouter.put('/adminapi/audit', NewsController.audit)


module.exports = NewsRouter;
