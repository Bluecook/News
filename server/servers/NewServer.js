const connection = require('../db/index')
const delimage = require('../util/delimage')
const NewServer = {
    addNew: (newInfo, res) => {
        const { nid, title, isPublish, editTime, cover, content, category, authorID, showNews, cover_file_name } = newInfo
        connection.query(`INSERT INTO news (nid, title, isPublish, editTime, cover, content, category,authorID,showNews,cover_file_name) values ('${nid}','${title}','${isPublish}','${editTime}','${cover}','${content}','${category}','${authorID}','${showNews}','${cover_file_name}')`, (error, results) => {
            if (error) console.log(error)
            res.send({
                code: 200,
                message: '插入成功'
            })
        })
    },
    getnewslist: (res, payload) => {
        const { id, role } = payload
        console.log(payload);
        if (role == 0) {
            connection.query(`select nid,title,category,editTime,showNews, isPublish,content from news`, (error, results) => {
                if (error) return error
                res.send({
                    code: 200,
                    data: results
                })
            })
        } else {
            connection.query(`select nid,title,category,editTime,showNews, isPublish,content from news where authorID='${id}'`, (error, results) => {
                if (error) return error
                res.send({
                    code: 200,
                    data: results
                })
            })
        }

    },
    delnew: (nid, res) => {
        connection.query(`DELETE FROM news where nid='${nid}'`, (error, results) => {
            if (error) return error
            res.send({
                code: 200,
                message: '删除文章成功'
            })
        })
    },
    getnew: (nid, res) => {
        connection.query(`select title,convert(cover using utf8) as cover,content,category from news where nid='${nid}'`, (error, result) => {
            console.log(error)
            if (error) return
            res.send({
                code: 200,
                data: result
            })
        })
    },
    uplodNew: (newInfo, res) => {
        // console.log(newInfo)
        const { nid, title, editTime, cover, content, category, cover_file_name } = newInfo
        if (cover) {
            connection.query(`update news set title='${title}',editTime='${editTime}',cover='${cover}',content='${content}',category='${category}',cover_file_name='${cover_file_name}' where nid='${nid}'`, (error, results) => {
                if (error) return error
                res.send({
                    code: 200,
                    message: '更改成功'
                })
            })
        } else {
            connection.query(`update news set title='${title}',editTime='${editTime}',content='${content}',category='${category}' where nid='${nid}'`, (error, results) => {
                if (error) return error
                res.send({
                    code: 200,
                    message: '更改成功'
                })
            })
        }

    },
    shownew: (nid, showNews, res) => {
        connection.query(`update news set showNews='${showNews}' where nid='${nid}'`, (error, result) => {
            if (error) return error
            //0表示不允许展示,1表示允许展示
            if (showNews == 1) {
                res.send({
                    code: 200,
                    message: '发布成功,所有用户将可以看见'
                })
            } else {
                res.send({
                    code: 200,
                    message: '隐藏成功,仅自己可见'
                })
            }
        })
    },
    audit: (nid, isPublish, res) => {
        connection.query(`update news set isPublish='${isPublish}' where nid='${nid}'`, (error, result) => {
            if (error) return error
            // 0表示在审核中, 1表示审核完成
            if (isPublish == 1) {
                res.send({
                    code: 200,
                    message: '审核完成'
                })
            } else {
                res.send({
                    code: 200,
                    message: '撤销审核'
                })
            }
        })
    },
    delCover: (nid, cover_file_name) => {
        // console.log(nid)
        if (!cover_file_name) return
        connection.query(`select cover_file_name from news where nid='${nid}'`, (error, results) => {
            if (error) return error
            if (results.length !== 0) {
                // console.log(results[0])
                delimage('newsuploads', results[0].cover_file_name)
            }
            return
        })

    }
}

module.exports = NewServer