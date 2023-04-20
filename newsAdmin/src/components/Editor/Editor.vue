<template>
    <div>
        <div class="border-1 border-solid border-gray-500 mt-2.5">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" />
            <Editor :defaultConfig="editorConfig" v-model="valueHtml" style="height: 320px; overflow-y: hidden"
                @onCreated="handleCreated" @onChange="handleChange" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ref, shallowRef, onBeforeUnmount, defineEmits, defineProps, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps({ content: String })
const emit = defineEmits(['event'])
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref('');
const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };


// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: any) => {
    // console.log('created', editor);
    editorRef.value = editor; // 记录 editor 实例，重要！
    if (props.content) {
        // valueHtml.value = `${props.content}`
        // editorRef.value.dangerouslyInsertHtml(`${props.content}`)
        // console.log(editor);
        // console.log(`我执行了${props.content}`);
        valueHtml.value = `${props.content}`
        // console.log(valueHtml.value);
    }
};
const handleChange = (editor: { getHtml: () => any; }) => {
    // console.log('change:', editor.getHtml());
    // 子传父
    emit("event", editor.getHtml())
};
</script>
