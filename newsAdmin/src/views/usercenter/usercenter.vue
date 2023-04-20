<!---->
<template>
    <div class="flex h-full">
        <div class="bg-light-main h-full w-1/4">
            <el-card shadow="hover" class="text-center">
                <img :src="avatar" alt="" class="text-center" />
                <p>{{ user.userInfo.username }}</p>
                <p>{{ role }}</p>
            </el-card>
        </div>
        <div class="ml-5 bg-light-main h-full w-3/4">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" status-icon
                class="mt-9 m-auto w-4/5">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" />
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select v-model="gender" placeholder="选择">
                        <el-option label="男" value="0" />
                        <el-option label="女" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="ruleForm.introduction" type="textarea" />
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <UploadAvatar :avatar="ruleForm.avatar" @avatarChange="handleChange" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateForm(ruleFormRef)">
                        更新
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { userStore } from '@/store/user';
import type { FormInstance, FormRules } from 'element-plus'
import UploadAvatar from '@/components/UploadAvatar/UploadAvatar.vue'
import http from '@/util/http';
import upload from '@/util/upload';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const ruleFormRef = ref<FormInstance>()
const user = userStore()

interface userForm {
    username: string,
    gender: number,
    introduction: string,
    avatar: string,
    file: any
}

const ruleForm = ref({
    username: user.userInfo.username,
    gender: user.userInfo.gender,
    introduction: user.userInfo.introduction,
    avatar: user.userInfo.avatar,
    file: null
} as userForm)

const avatar = computed(() => {
    return user.userInfo.avatar ? 'http://localhost:3000' + user.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const role = computed(() => {
    return user.userInfo.role == 0 ? '管理员' : user.userInfo.role == 1 ? 'VIP用户' : '普通用户'
})
const gender = computed(() => {
    return user.userInfo.gender == 0 ? '男' : '女'
})

const rules = reactive<FormRules>({
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    gender: [{ required: true, message: '选择性别', trigger: 'blur' }],
    introduction: [{ required: true, message: '个人简介不能为空', trigger: 'blur' }],
    avatar: [{ required: true, message: '选择头像', trigger: 'blur' }],
})


// 每次选择完图片之后的回调
const handleChange = (file: any) => {
    console.log(file);
    ruleForm.value.avatar = URL.createObjectURL(file)
    ruleForm.value.file = file
}

const getuserinfo = () => {
    http.get('getuserifo').then((res) => {
        console.log(res, '87');
        const { id, username, role, introduction, gender, avatar } = res.data.data
        user.getuserInfo(id, username, role, introduction, gender, avatar)
    })
}

const updateForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const result = await upload('upload', ruleForm.value)
            console.log(result);
            if (result.code == 200) {
                getuserinfo()
                ElMessage.success(result.message)
            } else {
                ElMessage.error(result.message)
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang='scss' scoped>
:deep(.el-form-item__label) {
    @apply text-primary
}
</style>