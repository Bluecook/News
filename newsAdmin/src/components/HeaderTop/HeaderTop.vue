<!---->
<template>
    <div class="flex h-16 items-center justify-between w-full">
        <div>
            <IconFont @click="useMenu.changeMenuCollapse" v-if="useMenu.MenuCollapse" name="icon-toggle-left"></IconFont>
            <IconFont @click="useMenu.changeMenuCollapse" v-if="!useMenu.MenuCollapse" name="icon-toggle-right"></IconFont>
        </div>
        <div class="mr-3 flex items-center justify-between">
            <div class="mr-3">
                <el-switch v-model="theme" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="handletheme" />
            </div>

            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :size="42" :src="circleUrl" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="router.push('/usercenter')">
                            <IconFont name="icon-user"></IconFont>
                            <span class="ml-2">个人中心</span>
                        </el-dropdown-item>
                        <el-dropdown-item @click="logout">
                            <IconFont name="icon-sign-out"></IconFont>
                            <span class="ml-2">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menu'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { userStore } from '@/store/user';
// const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const useMenu = useMenuStore()

const theme = ref(true)
const router = useRouter()
const user = userStore()

const circleUrl = computed(() => {
    return user.userInfo.avatar ? 'http://localhost:3000' + user.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const handletheme = (val: boolean) => {
    const classList = document.documentElement.classList
    if (!val) {
        classList.add('theme-dark')
    } else {
        classList.remove('theme-dark')
    }
}
const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    user.changeLogin()
    router.push('/login')
}
</script>

<style lang='scss' scoped></style>