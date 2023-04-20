<template>
    <div>
        <el-page-header content="编辑产品" icon="" title="产品管理" />
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px" class="mt-8"
            status-icon>
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="productForm.productName" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="productBrief">
                <el-input type="textarea" v-model="productForm.productBrief" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="productDescription">
                <el-input type="textarea" v-model="productForm.productDescription" />
            </el-form-item>
            <el-form-item label="产品图片" prop="productCover">
                <UploadAvatar :avatar="productForm.productCover ? productForm.productCover : ''"
                    @avatarChange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">更新产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>

import { reactive, ref, onMounted } from 'vue'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar.vue';
import upload from '../../util/upload';
import { useRouter, useRoute } from 'vue-router'
import http from '@/util/http';

interface productType {
    productName: string,
    productBrief: string,
    productDescription: string,
    productCover: string,
    file: Blob | MediaSource
}

const productFormRef = ref()
const productForm = ref({} as productType)

const productFormRules = reactive({
    productName: [
        { required: true, message: '请输入产品名称', trigger: 'blur' },
    ],
    productBrief: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    productCover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
    productDescription: [
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ]

})

const handleChange = (file: Blob | MediaSource) => {
    // 函数体
    productForm.value.productCover = URL.createObjectURL(file)
    productForm.value.file = file
}
const router = useRouter()
const submitForm = () => {
    // 函数体
    productFormRef.value.validate(async (valid: any) => {
        // 函数体
        if (valid) {
            // console.log(productForm);
            await upload("/updateProduct", productForm.value)
            router.push('/productlist')
        }
    })
}

onMounted(() => {
    // 函数体
    getData()
})

const route = useRoute()
const getData = async () => {
    // 函数体
    http.get(`/getproduct/${route.params.pid}`).then(res => {
        // console.log(res);
        Object.assign(productForm.value, res.data.data)
    })
}
</script>

<style lang="scss" scoped></style>  