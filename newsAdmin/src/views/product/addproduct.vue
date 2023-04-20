<!---->
<template>
    <div class="bg-light-main h-full">
        <el-form ref="productRef" :model="productForm" label-width="100" :rules="rules" class="w-4/5 m-auto pb-5 pt-5">
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model="productForm.productName" />
            </el-form-item>
            <el-form-item label="产品简要名称" prop="productBrief">
                <el-input v-model="productForm.productBrief" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="productDescription">
                <el-input v-model="productForm.productDescription" type="textarea" />
            </el-form-item>
            <el-form-item label="产品图片 " prop="productCover">
                <UploadAvatar @avatarChange="coverChange"
                    :avatar="productForm.productCover ? productForm.productCover : ''"></UploadAvatar>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addProduct(productRef)">添加新闻</el-button>
                <!-- <button @click=")">清空编辑器内容</button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css';
import http from '@/util/http';
import upload from '@/util/upload';

interface productType {
    productName: string,
    productBrief: string,
    productDescription: string,
    productCover: string,
    file: any
}

const productForm = ref({} as productType)

const productRef = ref()

const rules = {
    productName: [{ required: true, message: '产品名称不能为空', trigger: 'blur' }],
    productBrief: [{ required: true, message: '产品简要不能为空', trigger: 'blur' }],
    productDescription: [{ required: true, message: '产品详细描述不能为空', trigger: 'blur' }],
    productCover: [{ required: true, message: '产品不能为空', trigger: 'blur' }]
}


// 每次选择完图片之后的回调
const coverChange = (file: any) => {
    // console.log(file);
    productForm.value.productCover = URL.createObjectURL(file)
    productForm.value.file = file
}

const addProduct = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            // console.log(productForm.value);
            const { code, message } = await upload('/addproduct', productForm.value)
            if (code === 200) {
                formEl.resetFields()
                ElMessage.success(message)
            } else {
                ElMessage.error("添加错误")
            }

        } else {
            ElMessage.error("添加错误")
        }
    })
}
</script>

<style lang='scss' scoped></style>