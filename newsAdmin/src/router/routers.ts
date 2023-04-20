import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'home',
        component: () => import("../views/Home/Home.vue"),
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import("../views/index/index.vue"),
            },
            {
                path: '/usercenter',
                name: 'usercenter',
                component: () => import("../views/usercenter/usercenter.vue"),
            },
            {
                path: '/addnew',
                name: 'addnew',
                component: () => import("../views/news/addnew.vue"),
            },
            {
                path: '/newlist',
                name: 'newlist',
                component: () => import("../views/news/newlist.vue"),
            },
            {
                path: '/editnew/:nid',
                name: 'editnew',
                component: () => import("../views/news/newedit.vue"),
            },
            {
                path: '/adduser',
                name: 'addnuser',
                component: () => import("../views/user/adduser.vue"),
            },
            {
                path: '/userlist',
                name: 'userlist',
                component: () => import("../views/user/userlist.vue"),
            },
            {
                path: '/addproducts',
                name: 'addproducts',
                component: () => import("../views/product/addproduct.vue"),
            },
            {
                path: '/productlist',
                name: 'productlist',
                component: () => import("../views/product/productlist.vue"),
            },
            {
                path: '/editproduct/:pid',
                name: 'editproduct',
                component: () => import('../views/product/productedit.vue')
            },
            /*    {
                   path: '/home',
                   redirect: { name: 'index' }
               }, */
            {
                path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/notfound/notfound.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login/login.vue')
    },
    {
        path: '/',
        redirect: { name: 'index' }
    }
]

// 普通用户的路由
export const CommonRoutes: RouteRecordRaw[] = [
    {
        path: 'index',
        name: 'index',
        component: () => import("../views/index/index.vue"),
    },
    {
        path: '/usercenter',
        name: 'usercenter',
        component: () => import("../views/usercenter/usercenter.vue"),
    },
    {
        path: '/addnew',
        name: 'addnew',
        component: () => import("../views/news/addnew.vue"),
    },
    {
        path: '/editnew/:nid',
        name: 'editnew',
        component: () => import("../views/news/newedit.vue"),
    },
    {
        path: '/addproducts',
        name: 'addproducts',
        component: () => import("../views/product/addproduct.vue"),
    },
    {
        path: '/productlist',
        name: 'productlist',
        component: () => import("../views/product/productlist.vue"),
    },
    {
        path: '/editproduct/:pid',
        name: 'editproduct',
        component: () => import('../views/product/productedit.vue')
    }
]


// 管理员独有的路由
export const AdminRoutes: RouteRecordRaw[] = [
    {
        path: '/adduser',
        name: 'addnuser',
        component: () => import("../views/user/adduser.vue"),
    },
    {
        path: '/userlist',
        name: 'userlist',
        component: () => import("../views/user/userlist.vue"),
    },

]

