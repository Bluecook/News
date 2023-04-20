const ProductServer = require('../servers/ProductServer')
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs')
const payloads = require('../util/getpayload')
const productController = {
    addproduct: (req, res) => {
        // console.log(req.body, req.file)
        const { productName, productBrief, productDescription } = req.body
        const pcover = req.file ? `/productuploads/${req.file.filename}` : ''
        const pinfo = {
            pid: uuidv4().split('-').join(""),
            productName,
            productBrief,
            editTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),//
            productDescription,
            pcover,
            pcover_file_name: req.file.filename,
            publishID: payloads().id,
            isPublish: 0,//0表示在审核中,1表示审核完成
        }
        ProductServer.addproduct(pinfo, res)
    },
    getproductlist: (req, res) => {
        if (req.params.pid) {
            // console.log(123);
            ProductServer.getproduct(req.params.pid, res)
        } else {
            ProductServer.getproductlist(payloads(req), res)
        }
    },
    updateProduct: (req, res) => {
        const { pid, productName, productBrief, productDescription } = req.body
        const pcover = req.file ? `/productuploads/${req.file.filename}` : ''
        const pcover_file_name = req.file ? req.file.filename : ''
        ProductServer.delProductCover(pcover_file_name, pid)
        const upinfo = {
            pid,
            productName,
            productBrief,
            productDescription,
            editTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            pcover,
            pcover_file_name
        }

        ProductServer.updateProduct(upinfo, res)

    },
    delproduct: (req, res) => {
        ProductServer.delproduct(req.params.pid, res)
    }
}


module.exports = productController