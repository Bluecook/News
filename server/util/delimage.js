const fs = require('fs')

const delimage = (path, imageName) => {

    fs.readdir(`public/${path}`, function (err, files) {
        // console.log("运行")
        if (err) {
            return console.error(err);
        }
        // console.log(files)
        files.forEach(function (file) {
            if (file === imageName) {
                fs.unlink(`public/${path}/${file}`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("文件删除成功！");
                });
            }
            // console.log('不存在文件')
        });
    });
}

module.exports = delimage