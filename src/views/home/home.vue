<template>
    <div class="home">
        <home-nav-bar/>
        <div class="banner">
            <img src="../../assets/img/home/banner1.webp" alt="">
        </div>
        <div class="location">
           <div class="city">广州</div>
           <div class="postion">
                <span class="text">我的位置</span>
                <img src="../../assets/img/home/icon_location.png" alt="">
           </div>
        </div>
    </div>
</template>

<script setup>
    import HomeNavBar from "./componets/home_nav_bar.vue"
    components:{
        HomeNavBar
    }
</script>

<style lang="less" scoped>
   .banner{
        width: 100%;
        height: 180px;
        img{
            width: 100%;
            height: 100%;
        }
   }
   .location{
        display: flex;
        align-items: center;
        height: 40px;
        .city{
            flex: 1;
        }
        .postion{
            display: flex;
            align-items: center;
            width: 100px;
            justify-content: space-around;
            img{
                width: 20px;
                height: 20px;
            }
        }
   }
</style>