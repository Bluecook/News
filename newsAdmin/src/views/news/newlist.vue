<!---->
<template>
    <div>
        <el-table :data="newsData" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="category" label="分类">
                <template #default="scope">
                    {{ categoryFormat(scope.row.category) }}
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <template #default="scope">
                    {{ scope.row.editTime }}
                </template>
            </el-table-column>
            <el-table-column label="是否审核完成">
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublish" :disabled="isaudit" :active-value="1" :inactive-value="0"
                        @change="handleaudit(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="是否展示">
                <template #default="scope">
                    <el-switch v-model="scope.row.showNews" :active-value="1" :inactive-value="0"
                        @change="handleSwitchChange(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" circle :icon="Star" type="success"
                        @click="handlePreview(scope.row)"></el-button>
                    <el-button size="small" circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm title="确认删除嘛？删了无法撤回" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" circle :icon="Delete" type="danger"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog title="预览新闻" width="50%" v-model="dialogVisible">
        <div>
            <h2>{{ previewData.title }}</h2>
            <p style="margin-top: 5px;">{{ previewData.editTime }}</p>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="previewData.content" class="htmlContent"></div>
        </div>
    </el-dialog>
</template>

<script lang='ts' setup>
import http from '@/util/http';
import { computed, ref, toRefs, onMounted } from 'vue'
import { userStore } from '@/store/user';
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'

interface news {
    category: number,
    editTime: string,
    isPublish: number,
    nid: string,
    content: string,
    showNews: number,
    title: string
}
interface previewType {
    title: string, editTime: string, content: string
}
const user = userStore()
const newsData = ref<Array<news>>([])
const previewData = ref({} as previewType)
const dialogVisible = ref<boolean>(false)
const isaudit = computed(() => {
    return user.userInfo.role == 0 ? false : true
})


onMounted(() => {
    getTableDate()
})

const getTableDate = async () => {
    // 函数体
    await http.get('/getnewslist').then((res) => {
        // console.log(res);
        newsData.value = res.data.data
    })

}

// 格式化分类信息
const categoryFormat = (category: number) => {
    // 函数体
    const arr = ['最新动态', '典型案例', '通告公共']
    return arr[category]
}

const handleSwitchChange = async (item: news) => {
    // console.log(item.showNews);

    // 函数体
    http.put('/shownew', { nid: item.nid, showNews: item.showNews }).then((res) => {
        // console.log(res);
        const { message } = res.data
        ElMessage.success(message)
    })
}

const handleaudit = async (item: news) => {
    await http.put('/audit', { nid: item.nid, isPublish: item.isPublish }).then((res) => {
        const { message } = res.data
        ElMessage.success(message)
    })
}

//预览回调
const handlePreview = (data: previewType) => {
    // 函数体
    previewData.value = data
    dialogVisible.value = true
    // console.log(data);

}

//删除回调
const handleDelete = async (item: news) => {
    // 函数体
    // console.log(item.nid);
    await http.delete(`/delnew/${item.nid}`).then(res => {
        const { code, message } = res.data
        if (code == 200) {
            ElMessage.success(message)
            getTableDate()
        }
    })
}

const router = useRouter()
// 编辑修改新闻
const handleEdit = (item: news) => {
    // 函数体
    // console.log(item);
    router.push(`/newedit/${item.nid}`)
}
</script>

<style lang='scss' scoped></style>