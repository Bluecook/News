<!---->
<template>
    <div>
        <el-page-header>
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: './page-header.html' }">
                        homepage
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>route 1</el-breadcrumb-item>
                    <el-breadcrumb-item>route 2</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </el-page-header>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs } from 'vue'
</script>

<style lang='scss' scoped></style>