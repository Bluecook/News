<!---->
<template>
    <el-empty description="404页面走丢了">
        <el-button type="primary" @click="router.push('/index')">返回首页</el-button>
    </el-empty>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style lang='scss' scoped></style>