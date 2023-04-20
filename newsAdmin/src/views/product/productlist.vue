<!---->
<template>
    <div class="h-full bg-light-main w-full">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="productName" label="产品名称" />
            <el-table-column prop="productBrief" label="简要描述" />
            <el-table-column label="更新时间">
                <template #default="scope">
                    {{ scope.row.editTime }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm title="确认删除嘛？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" circle :icon="Delete" type="danger"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang='ts' setup>
import http from '@/util/http';
import { reactive, ref, toRefs, onMounted } from 'vue'
import { Edit, Delete, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

interface pinfo {
    pid: string,
    productBrief: string,
    productName: string,
    editTime: string,
    isPublish: number
}

const tableData = ref<Array<pinfo>>()

onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    // 函数体
    http.get('/getproductlist').then(res => {
        // console.log(res);
        tableData.value = res.data.data
    })
}


//删除回调
const handleDelete = async (item: pinfo) => {
    // 函数体
    // console.log(item);
    await http.delete(`/delproduct/${item.pid}`).then((res) => {
        // console.log(res)\]
        const { code, message } = res.data
        if (code === 200) {
            ElMessage.success(message)
        } else {
            ElMessage.error(message)
        }
    })
    await getTableData()
}

const router = useRouter()
const handleEdit = (item: pinfo) => {
    // 函数体
    // 跳转到/news-message/editnews/:id
    router.push(`/productedit/${item.pid}`)
}
</script>

<style lang='scss' scoped></style>