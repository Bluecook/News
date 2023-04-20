<script lang="ts" setup>
defineProps<{ name: string }>();
</script>
<template>
    <i role="img" style="line-height: 1" class="ml-1 mr-1">
        <svg fill="currentColor" style="vertical-align: top" width="1em" height="1em" aria-hidden="true">
            <use :xlink:href="`#${name}`"></use>
        </svg>
    </i>
</template>