<!---->
<template>
    <el-form ref="newsrFormRef" :model="newsForm" :rules="newsFormRules" label-width="120px" class="demo-ruleForm"
        status-icon>
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <Editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content" />
        </el-form-item>
        <el-form-item label="类别" prop="category">
            <el-select v-model="newsForm.category" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <UploadAvatar :avatar="newsForm.cover ? newsForm.cover : ''" @avatarChange="handleAvatar" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">修改新闻</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Editor from '../../components/Editor/Editor.vue'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar.vue';
import upload from '../../util/upload';
import http from '@/util/http';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'
const newsrFormRef = ref()
const router = useRouter()
const route = useRoute()

interface updateNews {
    nid: string | string[],
    category: number,
    content: string,
    cover: string,
    title: string,
    file: any
}
const newsForm = ref({} as updateNews)
const newsFormRules = {
    title: [
        { required: true, message: "请输入标题", trigger: 'blur' }
    ],
    content: [
        { required: true, message: "请输入内容", trigger: 'blur' }
    ],
    category: [
        { required: true, message: "请选择内容", trigger: 'blur' }
    ]
    , cover: [
        { required: true, message: "请上传图片", trigger: 'blur' }
    ]
}

const options = [
    { label: '最新动态', value: 0 },
    { label: '典型案例', value: 1 },
    { label: '通知公告', value: 2 },
]

// 每次editor内容改变的回调
const handleChange = (data: any) => {
    // 函数体
    newsForm.value.content = data
}


const handleAvatar = (file: any) => {
    // 函数体
    newsForm.value.cover = URL.createObjectURL(file)
    newsForm.value.file = file
}


const submitForm = () => {
    // 函数体
    newsrFormRef.value.validate(async (valid: any) => {
        // 函数体
        if (valid) {
            // console.log(newsForm);
            // 后台
            const { message } = await upload('/uploadNew', newsForm.value)
            ElMessage.success(message)
            router.push('/newlist')
        }
    })
}

onMounted(async () => {
    // 函数体
    await http.get(`/getnewslist/${route.params.nid}`).then((res) => {
        // console.log(res)
        const { category, content, cover, title } = res.data.data[0]
        Object.assign(newsForm.value, {
            nid: route.params.nid,
            category,
            content,
            title,
            cover,
            file: null
        })
        // console.log(newsForm.value);

    })
})

</script>

<style scoped lang="scss">
.el-form {
    margin-top: 20px;
}
</style>