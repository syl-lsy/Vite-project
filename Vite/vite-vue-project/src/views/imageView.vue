<template>
    <div class="season">
        <button class="btn-primary" @click="handleChange" value="spring">春</button>
        <button class="btn-primary" @click="handleChange" value="summer">夏</button>
        <button class="btn-primary" @click="handleChange" value="autumn">秋</button>
        <button class="btn-primary" @click="handleChange" value="winter">冬</button>
    </div>
    <div class="card">
        <!-- 使用url导入 -->
        <img :src="url" alt="season" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
const season = ref('spring');
const handleChange = (e: Event) => {
    season.value = (e.target as HTMLButtonElement).value;
};
const url = computed(() => {
    const href = new URL(`/src/assets/image/${season.value}.jpg`, import.meta.url).href;
    console.log(href);
    return href
})
</script>

<style scoped lang="scss">
    .season {
        padding-top: 30px;
        background-size: cover;
        background-position: center;
        transition: background-image 0.5s ease-in-out;
    }

    .btn-primary {
        background-color: #00a0e9;
        border-color: #00a0e9;
        color: #fff;
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 5px;
        margin: 0 10px;
        cursor: pointer;
        outline: none;
        border: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

        &:hover {
            background-color: #008cc4;
            border-color: #008cc4;
        }

        &:focus {
            background-color: #0077b3;
            border-color: #0077b3;
        }
    }

    .card {
        display: inline-block;
        margin: 16px;
        width: 50%;
        border-radius: 5px;
        border: 1px solid #ddd;
        box-shadow: 0 0 3rem -1rem rgba(0, 0, 0, 0.5);
        transition: transform 0.3s;

        img {
            max-width: 100%;
            object-fit: cover;
        }

        &:hover {
            transform: translateY(-0.5rem) scale(1.0125);
            box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);
        }
    }
</style>