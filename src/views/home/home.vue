<template>
    <div class="home" ref="homeRef">
        <home-nav-bar/>
        <div class="banner">
            <img src="../../assets/img/home/banner1.webp" alt="">
        </div>
        <!-- <home-search-box :hot-suggests="hotSuggests"/> -->
        <home-search-box :hot-suggests="hotSuggests"/>
        <home-categories />
        <!-- 搜索框显示设置 -->
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar :start-date="'09.20'" :end-date="'09.21'"></search-bar>
        </div>
        <home-content />
        <!-- <button @click="moreBtnClick"> 加载更多</button> -->
        
    </div>
</template>

<script setup>
    import HomeNavBar from "./componets/home_nav_bar.vue"
    import HomeSearchBox from "./componets/home-search-box.vue"
    import hYRequest from "../../service/request/index"
    import { onActivated, onMounted, onUnmounted, ref, watch } from "vue";
    import useHomeStore from "@/stores/modules/home";
    import HomeCategories from "./componets/home-categories.vue"
    import HomeContent from "./componets/home-content.vue"
    import useScroll from "@/hooks/useScroll"
    import SearchBar from "@/components/search-bar/search-bar.vue"
    import { computed } from "@vue/reactivity";
    
    components:{
        HomeNavBar,
        HomeSearchBox,
        HomeContent,
        SearchBar
    }
  
    //    发送网络请求
    // 1.热门建议
    // const hotSuggests = ref([])
  
    // hYRequest.get({
    //     url: "/home/hotSuggests"
    // }).then(res =>{
    //     hotSuggests.value = res.data
    // })
    // 方式二：
     const homeStore = useHomeStore()
     homeStore.fetchHotSuggestData()
     homeStore.fetchCategoriesData()
    //  let currentPage = 1
    //  homeStore.fetchHouseList(currentPage)
     homeStore.fetchHouseList()
    
    // 热门建议
    const categories = ref([])
    hYRequest.get({
        url: "/home/categories"
    }).then(res =>{
        categories.value = res.data
    })
    // const moreBtnClick = () =>{
    //     console.log("加载更多")
    //     // currentPage++
    //     // homeStore.fetchHouseList(currentPage)
    //     homeStore.fetchHouseList()
    // }
    // 监听页面滚动
        // 方法1
            // 当离开页面应该移除页面监听
            // 如果别的页面也设置了类似的监听，会编写重复代码
            // const scrollListenerHander = () =>{
            //     const clientHeight = document.documentElement.clientHeight
            //     const scrollTop = document.documentElement.scrollTop
            //     // 整个文档高度
            //     const scrollHeight = document.documentElement.scrollHeight
            //     // console.log(clientHeight,scrollTop, scrollHeight)
            //     if(clientHeight + scrollTop >= scrollHeight){
            //         homeStore.fetchHouseList()
            //     }
            // }
            // // 挂载时添加监听事件
            // onMounted(() => {
            //     window.addEventListener("scroll",scrollListenerHander)
            // })
            // // 卸载时移除监听
            // onUnmounted(() =>{
            //     window.removeEventListener("scroll", scrollListenerHander)
            // })
        // 方法2封装
            // useScroll(() => {homeStore.fetchHouseList()})
        // 方法3
    const homeRef = ref()
    const { isreachBottom, scrollTop } = useScroll(homeRef)
    // const { isreachBottom, scrollTop } = useScroll()
                watch(isreachBottom, (newValue) => {
                    if(newValue){
                            homeStore.fetchHouseList().then(() => {
                            isreachBottom.value = false
                        })
                    }
                })
    // 搜索框显示设置
        // const isShowSearchBar =ref(false)
        // watch(scrollTop, (newTop) => {
        //     isShowSearchBar.value = newTop > 100 
        // })
        // 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
    const isShowSearchBar = computed(() => {
        return scrollTop.value >= 360
        console.log("搜索框出现")
    })
    // 跳转回home时, 保留原来的位置
    onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
    })
 
</script>

<style lang="less" scoped>
  .home{
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    margin-bottom: 60px;
    .banner{
        width: 100%;
        height: 180px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .search-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        height: 45px;
        padding: 16px 15px 10px;
        background-color: #fff;
    }
  }
   
</style>