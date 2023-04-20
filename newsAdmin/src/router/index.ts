import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'

import { AdminRoutes } from './routers'
import { userStore } from '@/store/user'

import { menuType } from '@/util/types/userType'

const routes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'home',
        component: () => import("../views/Home/Home.vue"),
        children: [
            {
                path: '/home',
                redirect: { name: 'index' }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login/login.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

function flattenMenu(menu: Array<menuType>) {
    let result: Array<menuType> = [];
    menu.forEach(item => {
        if (item.children) {
            result = result.concat(flattenMenu(item.children));
        } else {
            result.push(item);
        }
    });
    return result;
}



// 动态添加路由
const configRouter = (menu: Array<menuType>) => {

    const flatMenu = flattenMenu(menu)
    if (!router.hasRoute('home')) {
        // console.log('问问');
        router.addRoute(
            {
                path: '/home',
                name: 'home',
                component: () => import("../views/Home/Home.vue"),
                children: [
                    {
                        path: '/home',
                        redirect: { name: 'index' }
                    },
                ]
            }
        )
    }
    // console.log(flatMenu)
    flatMenu.forEach((item: menuType) => {
        router.addRoute('home', {
            path: `/${item.params ? item.path + '/:' + item.params : item.path}`,
            name: item.path,
            component: () => import(`../views/${item.child ? item.child : item.path}/${item.path}.vue`)
        })
    })
    router.addRoute('home', {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../components/notfound/notfound.vue')
    })
}



router.beforeEach((to, from, next) => {
    const user = userStore()
    // console.log(user.userInfo.role);.userInfo
    const token = localStorage.getItem('token')
    // console.log(!token);
    // console.log(router.getRoutes())
    if (to.name !== 'login') {
        // 如果token不存在并且路由不是'/login',重定向到'/login'页面
        if (token) {
            if (user.firstLogin) {
                router.removeRoute('home')
                configRouter(user.userInfo.menu)
                user.changeLogin()
                next({ path: to.fullPath })
            } else {
                next()
            }
        } else {
            next({ name: 'login' })
        }
    } else {
        // token存在
        if (token) {
            next({ name: '/index' })
        }
        else {
            next()
        }

    }
})

export default router