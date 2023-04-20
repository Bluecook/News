
<!---->
<template>
    <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script lang="ts" setup>
import { defineEmits, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus'

interface PropType {
    avatar: string
}
const props = defineProps<PropType>()
const emit = defineEmits(['avatarChange'])
const handleChange = (file: UploadFile) => {
    emit('avatarChange', file.raw)
}

const uploadAvatar = computed(() =>
    props.avatar.includes("blob") ? props.avatar : 'http://localhost:3000' + props.avatar
)
</script>

<style lang="scss" scoped>
:deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>