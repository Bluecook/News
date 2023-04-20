<!---->
<template>
    <el-menu :default-active="route.fullPath" :collapse="useMenu.MenuCollapse" :unique-opened="true" :router="true"
        class="h-full">
        <el-menu-item v-for="item in menus" :key="item.path" :index="`/${item.path}`">
            <IconFont :name="item.name"></IconFont>
            <span>{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu v-for="item in menulists" :key="item.title" :index="`/${item.path}`" v-admin="[roleValue, item.path]">
            <template #title>
                <IconFont :name="item.name" class="mr-1"></IconFont>
                <span>{{ item.title }}</span>
            </template>
            <template v-for="items in item.children" :key="items.path">
                <el-menu-item v-if="!items.params" :index="`/${items.path}`">{{
                    items.title
                }}</el-menu-item>
            </template>

        </el-sub-menu>

    </el-menu>
</template>

<script lang='ts' setup>
import { computed, ref, toRefs } from 'vue'
import { useMenuStore } from '@/store/menu'

import { useRoute } from 'vue-router';

const route = useRoute()
const useMenu = useMenuStore()

// console.log(route.fullPath);


const menus = ref(useMenu.menus.slice(0, 2))

const menulists = ref(useMenu.menus.slice(2, useMenu.menus.length + 1));
// console.log(useMenu.menus)

const roleValue = computed(() => {
    const { role } = JSON.parse(localStorage.getItem('user') as string).userInfo
    return role
})
</script>

<style lang='scss' scoped>
.el-menu {
    border: none;
    @apply bg-light-menu;
}

:deep(.el-menu-item) {
    @apply text-primary;

    &:hover {
        @apply bg-light-hoverMenu;
    }



}

:deep(.is-active) {
    color: rgb(192, 132, 255) !important;
}

:deep(.el-sub-menu__title) {
    @apply text-primary;

    &:hover {
        @apply bg-light-hoverMenu;
    }
}

.el-sub-menu {
    :deep(.el-menu) {
        @apply bg-light-menu;
    }
}
</style>