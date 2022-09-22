<template>
    <div class="tab-bar">
        <template v-for="(item, index) in tabbarDate">
            <div class="tab-bar-item" 
                :class="{ active: currentIndex === index}"
                @click="itemClick(index, item)">
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)"/>
            <img v-else="currentIndex === index" :src="getAssetURL(item.imageActive)"/>
            <span class="text">{{ item.text }}</span>
        </div>
        </template>
    </div>
</template>

<script setup>
    import tabbarDate from '../../assets/data/tabbar.js'

    import { getAssetURL } from "@/utils/get_asset_img";
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const currentIndex = ref(0)

    const router = useRouter()
   const itemClick = (index, item) =>{
        currentIndex.value = index
        router.push(item.path)
    }
    console.log(tabbarDate);

    // 获取图片
    // const getAssetURL = (image) =>{
    //     return new URL(`../../assets/img/${image}`, import.meta.url).href
    // }
</script>

<style lang="less" scoped>
    .tab-bar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 60px;
        display: flex;
        border-top: 1px solid #f3f3f3;

        .tab-bar-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }
        .active{
            // color: #57c3c2;
            color: var(--primary-color);
        }
        .tab-bar-item img{
            width: 32px;
            height: 32px;
        }
    }
   
</style>