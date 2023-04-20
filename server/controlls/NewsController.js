const NewServer = require('../servers/NewServer')
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs')
const payloads = require('../util/getpayload')

const NewsController = {
    addNews: (req, res) => {

        const { content, title, category } = req.body
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const cover_file_name = req.file ? req.file.filename : ''
        // console.log(req.body, req.file);
        const newInfo = {
            nid: uuidv4().split('-').join(""),
            title,
            isPublish: 0,//0表示在审核中,1表示审核完成
            editTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),//
            cover,
            content,
            category: 0,
            authorID: payloads(req).id,
            showNews: 1,//0表示不允许展示,1表示允许展示
            cover_file_name
        }
        // console.log(newInfo)
        NewServer.addNew(newInfo, res)
    },
    getnewslist: (req, res) => {
        // console.log(req.params)
        if (req.params.nid) {
            // console.log(req.params)
            NewServer.getnew(req.params.nid, res)
        } else {
            // console.log("列表")
            // console.log(payloads(req))
            NewServer.getnewslist(res, payloads(req))
        }
    },
    delnew: (req, res) => {
        // console.log(req.params.nid);
        NewServer.delnew(req.params.nid, res)
    },
    uploadNew: (req, res) => {
        const { nid, category, content, title } = req.body
        // console.log(req.body, req.file)
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const cover_file_name = req.file ? req.file.filename : ''
        // console.log(req.file.fliename)
        NewServer.delCover(nid, cover_file_name)
        const newInfo = {
            nid,
            title,
            category: parseInt(category),
            editTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            cover,
            content,
            cover_file_name
        }
        // console.log(newInfo, 61)
        NewServer.uplodNew(newInfo, res)

    },
    shownew: (req, res) => {
        // console.log(req.body)
        const { nid, showNews } = req.body
        NewServer.shownew(nid, showNews, res)
    },
    audit: (req, res) => {
        const { nid, isPublish } = req.body
        NewServer.audit(nid, isPublish, res)
    }
}


module.exports = NewsController