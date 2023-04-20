import http from "./http"


function upload(path: string, userForm: any) {
    let params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    // console.log(params);
    return http.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)
}

export default upload