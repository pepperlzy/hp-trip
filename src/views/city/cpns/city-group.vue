<template>
  <div class="group">
        <van-index-bar :sticky="false" :index-list="indexList">
            <van-index-anchor index="热门"/>
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities" :key="index">
                    <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
                </template>
            </div>
        
            <template v-for="(group, index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)"/>
                </template>
            </template>
        </van-index-bar>
    <!-- <template v-for="(group,index) in groupData.cities" :key="index">
        <div class="group-item">
            <h2 class="title">{{ group.group }}</h2>
            <div class="list">
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <div>{{ city.cityName }}</div>
                </template>
            </div>
     </div>
    </template> -->
  </div>
     
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

    
    const props = defineProps({
        groupData: {
            type: Object,
            default: () =>({})
        }
    })
    // 动态索引
    const indexList = computed(() => {
       const list = props.groupData.cities.map(item => item.group)
       list.unshift("#")
       return list
    })
    // 监听城市的点击
    const router = useRouter()
    const cityStore = useCityStore()
    const cityClick = (city) => {
        // console.log("cityClick", city)
        // 选中当前城市
        cityStore.currentCity = city
        // 返回上一级
        router.back()
    }
</script>

<style lang="less" scoped>
    .list{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 10px;
        padding-right: 25px;
        .city{
            width: 70px;
            height: 28px;
            border-radius: 14px;
            background-color: #89d2d0;
            font-size: 12px;
            color: #fff;
            text-align: center;
            line-height: 28px;
            margin: 10px 0;
        }
    }
</style>