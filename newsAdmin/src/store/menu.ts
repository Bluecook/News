import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { userStore } from './user';
import { menuType } from '@/util/types/userType'

export const useMenuStore = defineStore('menu', () => {
    const user = userStore().userInfo
    const MenuCollapse = ref<boolean>(false)

    const changeMenuCollapse = () => {
        MenuCollapse.value = !MenuCollapse.value
    }
    const menus = ref(user.menu)

    return {
        MenuCollapse,
        changeMenuCollapse,
        menus,
    }
},
    {
        persist: true,
    }
)