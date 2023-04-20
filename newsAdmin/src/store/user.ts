import { defineStore } from 'pinia'
import { ref } from 'vue'

import { uinfo } from '@/util/types/userType'

export const userStore = defineStore('user', () => {
    const userInfo = ref({} as uinfo)
    // 是否为首次登录
    const firstLogin = ref<boolean>(true)

    const getuserInfo = (id: number,
        username: string,
        role: number,
        introduction: string,
        gender: number,
        avatar: string,
        menu: []
    ) => {
        userInfo.value = { id, username, role, introduction, gender, avatar, menu }
    }
    const changeLogin = () => {
        firstLogin.value = !firstLogin.value
    }

    return {
        userInfo,
        getuserInfo,
        firstLogin,
        changeLogin
    }
},
    {
        persist: {
            paths: ['userInfo']
        }
    }
)


