<!---->
<template>
    <div class="bg-light-main w-full">
        <el-table :data="userlist" class="w-full">
            <el-table-column prop="username" label="用户名" />
            <el-table-column label="头像">
                <template #default="scope">
                    <div v-if="scope.row.avatar">
                        <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :size="50"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色">
                <template #default="scope">
                    <el-tag type="danger" v-if="scope.row.role === -1">管理员</el-tag>
                    <el-tag type="success" v-else-if="scope.row.role === 1">VIP用户</el-tag>
                    <el-tag type="success" v-else>普通用户</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确认删除嘛？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" :disabled="isdel" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang='ts' setup>
import http from '@/util/http';
import { computed, ref, onMounted } from 'vue'
import { userStore } from "@/store/user"

interface Ulist {
    username: string,
    avatar: string,
    role: number
}

const user = userStore()
const isdel = computed((): boolean => {
    return user.userInfo.role == 0 ? false : true
})

const handleEdit = (row: Ulist) => {
    console.log(row)
}
const handleDelete = (row: Ulist) => {
    console.log(row)
}

const userlist = ref<Array<Ulist>>([])


const getUserlits = async () => {
    await http.get('/getUserlits').then((res) => {
        // console.log(res);
        userlist.value = res.data.data
    })
}

onMounted(async () => {
    await getUserlits()
})
</script>

<style lang='scss' scoped></style>