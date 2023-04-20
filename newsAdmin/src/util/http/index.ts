import axios from 'axios'

const http = axios.create({
    baseURL: '/adminapi',
    // timeout: 3000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response.headers);

    const { authorization } = response.headers

    authorization && localStorage.setItem('token', authorization)

    return response;
}, function (error) {
    // 对响应错误做点什么
    // const { status } = error.response
    // if (status === 401) {
    //     localStorage.removeItem('token')
    //     window.location.href = '#/login'
    // }
    return Promise.reject(error);
});



export default http