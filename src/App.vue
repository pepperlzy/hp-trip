<template>
  <div class="app">
      <!-- name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
   <!-- !route.meta.hideTabbar跳转到其他页面底部导航栏隐藏 -->
   <tab-bar v-show="!route.meta.hideTabbar"/>
   <!-- <tab-bar/> -->
    <loading />
 
  </div>

 
</template>

<script setup>
    import TabBar from "@/components/tab-bar/tab-bar.vue"
    import { useRoute } from "vue-router";
    import Loading from "@/components/loading/loading.vue"
    const route = useRoute()

    
</script>



<style scoped>

</style>
