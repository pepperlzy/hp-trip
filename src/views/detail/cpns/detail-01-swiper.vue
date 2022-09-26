<template>
    <div class="swiper">
        <van-swipe class="swiper-list" :autoplay="3000" indicator-color="white">
           <template v-for="(item, index) in swiperData ">
             <van-swipe-item class="item">
                <img :src="item.url" alt="">
             </van-swipe-item>
           </template>
           <template #indicator="{ active, total }">
                <!-- <div class="indicator">{{ active }}/{{ swiperData.length }}-{{ total }}</div> -->
                <div class="indicator">

                    <template v-for="(value, key, index) in swiperGroup" :key="key"> 
                        <span class="item"
                                :class="{ active: swiperData[active]?.enumPictureCategory == key }">
                            <span class="text">{{ getName(value[0].title) }}</span>
                            <span class="count" v-if="swiperData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swiperData[active]) }}/{{ value.length }}
                            </span>
                        </span>    
                    </template>
                </div>
           </template>
        </van-swipe>
    </div>
</template>

<script setup>
    const props = defineProps({
        swiperData:{
            type: Array,
            default: () => []
        }
    })
    // 数据类型转换
    const swiperGroup = {}
    // 1. 两次循环
    // for(const item of props.swiperData){
    //     swiperGroup[item.enumPictureCategory] = []
    // }
    // for(const item of props.swiperData){
    //     const valueArry = swiperGroup[item.enumPictureCategory]
    //     valueArry.push(item)
    // }
    // 方法二
    for(const item of props.swiperData){
        let valueArry = swiperGroup[item.enumPictureCategory]
        if(!valueArry){
            valueArry = []
            swiperGroup[item.enumPictureCategory] = valueArry
        }
        valueArry.push(item)
    }
    console.log(swiperGroup)

    const nameReg =/【(.*?)】/i
    const getName = (name) =>{
        // return name.replace("：", "").replace("【", "").replace("】","")
        const results = nameReg.exec(name)
        return results[1]
    }

    const getCategoryIndex = (item) =>{
        const valueArry = swiperGroup[item.enumPictureCategory]
        return valueArry.findIndex(data => data === item) + 1
    }
</script>

<style lang="less" scoped>
    .swiper{
        
        .swiper-list{
           
            .item{
                img{
                    width: 100%;
                }
            }
        }
        .indicator{
            position: absolute;
            right: 5px;
            bottom: 5px;
            display: flex;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            .item{
                margin: 0 5px;
            }
            .active{
                background-color: #fff;
                color: #000;
                padding: 0 5px;
                border-radius: 5px;
            }
        }
    }
</style>