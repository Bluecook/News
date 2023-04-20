const connection = require('../db/index')

const delimage = require('../util/delimage')

const ProductServer = {
    addproduct: (pInfo, res) => {
        console.log(pInfo)
        const { pid, productName, productBrief, editTime, productDescription, pcover, pcover_file_name, publishID, isPublish } = pInfo
        const sql = 'INSERT INTO products (pid, productName, productBrief, editTime, productDescription, pcover, pcover_file_name, publishID, isPublish ) values (?,?,?,?,?,?,?,?,?)'
        const info = [pid, productName, productBrief, editTime, productDescription, pcover, pcover_file_name, publishID, isPublish]
        connection.query(sql, info, (error, results) => {
            if (error) return error;
            res.send({
                code: 200,
                message: '添加产品成功'
            })
        })
    },
    getproductlist: (payloads, res) => {
        const { id, role } = payloads
        if (role == 0) {
            connection.query(`select pid,productName,productBrief,editTime,isPublish from products`, (error, results) => {
                if (error) return error
                res.send({
                    code: 200,
                    data: results
                })
            })
        } else {
            connection.query(`select pid,productName,productBrief,editTime,isPublish from products where publishID='${id}'`, (error, results) => {
                if (error) return error
                res.send({
                    code: 200,
                    data: results
                })
            })
        }

    },
    getproduct: (pid, res) => {
        // console.log(pid);
        connection.query(`select pid,productName,productBrief,editTime,productDescription,convert(pcover using utf8) as productCover from products where pid='${pid}'`, (error, results) => {
            if (error) return error
            // console.log("123");
            res.send({
                code: 200,
                data: results[0]
            })
        })
    },
    updateProduct: (upinfo, res) => {
        // console.log(upinfo);
        const { pid, productName, productBrief, productDescription, pcover, pcover_file_name } = upinfo
        if (pcover) {
            const sql1 = 'update products set productName= ?,productBrief=?,editTime=?,productDescription=?,pcover=?,pcover_file_name=? where pid=?'
            const info1 = [productName, productBrief, editTime, productDescription, pcover, pcover_file_name, pid]
            connection.query(sql1, info1, (error, results) => {
                if (error) console.log(error)
                res.send({
                    code: 200,
                    message: "产品更改成功"
                })
            })
        } else {
            const sql2 = 'update products  set productName= ?,productBrief=?,editTime=?,productDescription=? where pid=?'
            const info2 = [productName, productBrief, editTime, productDescription, pid]
            connection.query(sql2, info2, (error, results) => {
                if (error) console.log(error)
                res.send({
                    code: 200,
                    message: "产品更改成功"
                })
            })
        }
    },
    delProductCover: (pcover_file_name, pid) => {
        if (!pcover_file_name) return
        connection.query(`select pcover_file_name from products where pid='${pid}'`, (error, results) => {
            if (error) return error
            if (results.length !== 0) {
                delimage('/productuploads', results[0].pcover_file_name)
            }
            return
        })

    },
    delproduct: (pid, res) => {
        connection.query(`delete from products where pid='${pid}'`, (error, results) => {
            if (error) res.send({ code: 401, message: '删除失败' })
            res.send({ code: 200, message: '删除产品成功' })
        })
    }
}


module.exports = ProductServer