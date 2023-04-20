<!---->
<template>
    <div class="flex flex-col justify-center h-full">
        <div
            class="lg:w-1/2 lg:h-1/2 lg:m-auto lg:mb-auto md:h-3/4 flex flex-col justify-center md:w-1/2 md:m-auto sm:w-full sm:h-full xs:h-full xs:w-full  bg-purple-400">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="w-3/4 m-auto">
                <div class="text-2xl text-center text-primary mb-3">登录平台</div>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="验证码" prop="code" class="flex">
                    <el-input v-model="ruleForm.code" class="!w-1/2" maxlength="4" />
                    <div class="cursor-pointer ml-3" @click="getCode()" v-html="captcha"></div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import http from '@/util/http'

import { userStore } from '../../store/user'

const user = userStore()

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    username: '',
    password: '',
    code: '',
})

const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入你的用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' },],
})


const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            http.post('/login', ruleForm).then(res => {
                const { code } = res.data
                const { message, id, username, gender, introduction, avatar, role, menu } = res.data.data
                if (code == 401) {
                    ElMessage.error(message)
                } else if (code == 403) {
                    ElMessage.error(message)
                } else if (code == 404) {
                    ElMessage.error(message)
                } else {
                    ElMessage.success(message)
                    user.getuserInfo(id, username, role, introduction, gender, avatar, menu)
                    router.push({ name: 'home' })
                }
            })
        } else {
            ElMessage.error('登录错误')
            return false
        }
    })
}

const captcha = ref<SVGAElement>()
// 获取验证码
const getCode = async () => {
    await http.get('/captcha').then((res) => {
        captcha.value = res.data
    })
}

onMounted(() => {
    getCode()
})

</script>

<style lang='scss' scoped></style>