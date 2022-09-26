<template>
    <div class="city top-page">
       <div class="top">
        <van-search 
            v-model="Searchvalue" 
            shape="round"
            show-action
            placeholder="城市/区域/位置" 
            @cancel="cancelClick"
            />

        <!-- tab切换 -->
        <van-tabs v-model:active="tabActive" color="#57c3c2">
            <!-- 方法1 -->
            <!-- <van-tab :title="allCity?.cityGroup?.title"></van-tab>
            <van-tab :title="allCity?.cityGroupOverSea?.title"></van-tab> -->
            <!-- 方法2 -->
            <!-- <template v-for="(value, key, index) in allCity" :key="key">
                <van-tab :title="value.title"></van-tab>
            </template> -->
            <!-- 方法三 -->
            <template v-for="(value, key, index) in allCities" :key="key">
                <van-tab :title="value.title" :name="key"></van-tab>
            </template>
        </van-tabs>
       </div>
       <div class="content">
            
            <!-- <city-group :group-data="currentGroup" /> -->

            <template v-for="(value, key, index) in allCities">
                 <!-- <h2 v-show="tabActive === key">{{ value.title }}</h2> -->
                <city-group v-show="tabActive === key" :group-data="value" />

            </template>
       </div>

       
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import hYRequest from '@/service/request'
    import {getCityAll} from '@/service'
    import  useCityStore  from "@/stores/modules/city";
    import { storeToRefs } from 'pinia';
    import { computed } from '@vue/reactivity';
    import CityGroup from "./cpns/city-group.vue"

    components:{
        CityGroup
    }
    
    const router =useRouter()

    // 双向绑定对应的值
    const Searchvalue = ref("")
    // 点击取消返回上一级
    const cancelClick = () => {
        router.back()
    }


    // tab切换
    const tabActive = ref()

    // hYRequest.get({
    //     URL: "/city/list"
    // }).then(res =>{
    //     console.log(res)
    // })
    // 网络请求，请求城市数据

        /**
     * 这个位置发送网络请求有两个缺点:
     *   1.如果网络请求太多, 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
     *   2.如果页面封装了很多的子组件, 子组件需要这些数据, 我们必须一步步将数据传递过去(props)
     */
    // 方法1
    // const allCity = ref()
    // 方法2
    // const allCity = ref({})
    // getCityAll().then(res =>{
    //     // console.log(res)
    //     allCity.value = res.data
    // })
    // 方法3 推荐
    const cityStore = useCityStore()
    cityStore.fetchAllCitiesData()
    const { allCities } = storeToRefs(cityStore)
    
    // 获取选中标签后的数据
    // tabActive 默认绑定的是索引，通过:name可以将tabActive绑定为对象
    // 2.根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
    const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
    .city{
        .top{
            position: relative;
            z-index: 9;
        }
        // .content{
        //     margin-top: 98px;
        // }
        .content{
            height: calc(100vh - 98px);
            overflow-y: auto;
        }
    }
</style>