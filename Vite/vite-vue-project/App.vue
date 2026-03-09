<template>
    <div class="container">
        <h1>hello vite Vue</h1>
        <input type="text" placeholder="请输入内容" @input="debounceHandleInput" v-model="inputRef">
        <button @click="() => { count++ }">count is {{ count }}</button>
        <span :class="$content.text">你好</span>
    </div>
    <ImageShow />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import $content from './src/assets/common.module.scss';
import { debounce } from 'lodash-es';
import ImageShow from '@/views/imageView.vue';
const count = ref(0)
const inputRef = ref('')
const handleInput = () => {
    console.log(inputRef.value)
}
const debounceHandleInput = debounce(handleInput, 500)

</script>

<style lang="scss">
    .container {
        @include text-center;

    }
</style>