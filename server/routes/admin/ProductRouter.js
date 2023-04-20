var express = require('express');
var ProductRouter = express.Router();
const productController = require('../../controlls/ProductController')

// 图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/productuploads/' })


ProductRouter.post('/adminapi/addproduct', upload.single('file'), productController.addproduct);

ProductRouter.get('/adminapi/getproductlist', productController.getproductlist)
ProductRouter.get('/adminapi/getproduct/:pid', productController.getproductlist)
ProductRouter.post('/adminapi/updateProduct', upload.single('file'), productController.updateProduct)

ProductRouter.delete('/adminapi/delproduct/:pid', productController.delproduct)
module.exports = ProductRouter;
