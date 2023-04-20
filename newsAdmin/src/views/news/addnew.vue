<!---->
<template>
    <div class="bg-light-main">
        <el-form ref="newsRef" :model="newsForm" label-width="80" :rules="rules" class="w-4/5 m-auto pb-5 pt-5">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <Editor @event="handleChange"></Editor>
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-input v-model="newsForm.category" />
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <UploadAvatar @avatarChange="coverChange" :avatar="newsForm.cover ? newsForm.cover : ''"></UploadAvatar>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addForm(newsRef)">添加新闻</el-button>
                <!-- <button @click=")">清空编辑器内容</button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import Editor from '@/components/Editor/Editor.vue'
import upload from '@/util/upload';
import UploadAvatar from '@/components/UploadAvatar/UploadAvatar.vue';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router';
const router = useRouter()

interface newsType {
    title: string,
    content: string,
    category: string,
    cover: string,
    file: any
}

const newsForm = ref({} as newsType)

const newsRef = ref<FormInstance>()
// 每次editor内容改变的回调
const handleChange = (data: any) => {
    // 函数体
    newsForm.value.content = data
}

// 每次选择完图片之后的回调
const coverChange = (file: any) => {
    // console.log(file);
    newsForm.value.cover = URL.createObjectURL(file)
    newsForm.value.file = file
}

const rules = {
    title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
    content: [{ required: true, message: '新闻内容不能为空', trigger: 'blur' }],
    category: [{ required: true, message: '选择新闻类型', trigger: 'blur' }],
    cover: [{ required: true, message: '选择你的新闻封面', trigger: 'blur' }],
}

const addForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            // console.log(newsForm.value);
            let { code, message } = await upload('/addnews', newsForm.value)
            if (code !== 200) {
                ElMessage.error(message)
            } else {
                ElMessage.success(message)
                formEl.resetFields()
                router.push('/newlist')
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang='scss' scoped></style>