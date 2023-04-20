<!---->
<template>
    <div>
        <el-form ref="newUsersRef" :model="newUsers" :rules="rules" label-width="100px" status-icon
            class="mt-9 m-auto w-4/5">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="newUsers.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="newUsers.password" type="password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="newUsers.role" placeholder="选择">
                    <el-option label="管理员" value="-1" />
                    <el-option label="VIP用户" value="0" />
                    <el-option label="普通用户" value="1" />
                </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="newUsers.gender" placeholder="选择">
                    <el-option label="男" value="0" />
                    <el-option label="女" value="1" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input v-model="newUsers.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <UploadAvatar :avatar="newUsers.avatar ? newUsers.avatar : ''" @avatarChange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addForm(newUsersRef)">
                    添加用户
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import UploadAvatar from '@/components/UploadAvatar/UploadAvatar.vue'
import upload from '@/util/upload';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { nuser } from '@/util/types/userType'
const newUsersRef = ref<FormInstance>()

const newUsers = ref({} as nuser)

// 每次选择完图片之后的回调
const handleChange = (file: any) => {
    // console.log(file);
    newUsers.value.avatar = URL.createObjectURL(file)
    newUsers.value.file = file
}

const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    role: [{ required: true, message: '角色不能为空', trigger: 'blur' }],
    gender: [{ required: true, message: '性别不能为空', trigger: 'blur' }],
    introduction: [{ required: true, message: '个人简介不能为空', trigger: 'blur' }],
    avatar: [{ required: true, message: '头像不能为空', trigger: 'blur' }],
}

const addForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            // console.log(newUsers);
            let { code, message } = await upload('/adduser', newUsers.value)
            // console.log(result)
            if (code !== 200) {
                ElMessage.error(message)
            } else {
                ElMessage.success(message)
                formEl.resetFields()
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang='scss' scoped></style>