<template>
    <div class="detail top-page">
        <van-nav-bar
            title="房屋详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe> -->
        <!-- 轮播部分 -->
        <div class="main" v-if="mainPart">
            <detail-swiper :swiper-data="mainPart.topModule.housePicture?.housePics"/>
            <detail-infos :top-infos="mainPart.topModule"/>
            <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
            <detail-landlord :landlord="mainPart.dynamicModule.landlordModule"/>
            <detail-comment :comment="mainPart.dynamicModule.commentModule"/>
            <detail-notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
            <detail-map :position="mainPart.dynamicModule.positionModule"/>
            <detail-intro :price-intro="mainPart.introductionModule"/>
        </div>

        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">来一场所走就走的旅行吧</div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from "@/service/index"
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import DetailSwiper from "./cpns/detail-01-swiper.vue"
import DetailInfos from "./cpns/detail-02-infos.vue"
import DetailFacility from "./cpns/detail-03-facility.vue"
import DetailLandlord from "./cpns/detail-04-landlord.vue"
import DetailComment from "./cpns/detail-05-comment.vue"
import DetailNotice from "./cpns/detail-06-notice.vue"
import DetailMap from "./cpns/detail-07-map.vue"
import DetailIntro from "./cpns/detail-08-intro.vue"

const route = useRoute()
const router = useRouter()
const houseId = route.params.id
const onClickLeft = () => {
    router.back()
}

// 发送网络请求跟数据
const detailInfos = ref({})
// 对得到的数据精选拆解
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
    // console .log(res)
    detailInfos.value = res.data
})

</script>

<style lang="less" scoped>
    
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>