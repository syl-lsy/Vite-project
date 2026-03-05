<template>
    <div class="container">
        <h1>hello vite Vue</h1>
        <input type="text" placeholder="请输入内容" @input="debounceHandleInput" v-model="inputRef">
        <button @click="() => { count++ }">count is {{ count }}</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { debounce } from 'lodash-es'
const count = ref(0)
const inputRef = ref('')
const handleInput = () => {
    console.log(inputRef.value)
}
const debounceHandleInput = debounce(handleInput, 500)

</script>

<style scoped></style>