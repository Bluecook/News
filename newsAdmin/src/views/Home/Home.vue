<!---->
<template>
    <div class="flex h-screen w-full  bg-light-bg">
        <div class="h-full">
            <Menu></Menu>
        </div>
        <div class="h-full ml-5 mr-5 w-full">
            <HeaderTop></HeaderTop>
            <!-- <PageHeader></PageHeader> -->
            <div class="mt-5 overflow-y-auto mainbox">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import HeaderTop from '@/components/HeaderTop/HeaderTop.vue';
import Menu from '../Menu/Menu.vue';
import PageHeader from '@/components/PageHeader/PageHeader.vue';

</script>

<style lang='scss' scoped>
.mainbox {
    height: calc(100% - 84px);
}

.mainbox::-webkit-scrollbar {
    display: none;
}
</style>