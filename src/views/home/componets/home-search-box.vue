<template>
    <div class="sarch-box">
            <!-- 位置信息 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="postion">
                    <span class="text" @click="postionClick">我的位置</span>
                    <img src="../../../assets/img/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期信息 -->
        <div class="date-range section" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
                <div class="stay">共{{ stayCount }}晚</div>
            </div>
        
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
        <van-calendar 
                    v-model:show="showCalendar" 
                    type="range"
                    color="#89d2d0"
                    :round="false"
                    @confirm="onConfirm" />
        </div>

        <!-- 价格/人数选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

          <!-- 热门建议 -->
        <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div 
          class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
        </div>

        <!-- 开始搜素 -->
        <div class="section search-btn">
             <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
</template>

<script setup>
    import useCityStore from '@/stores/modules/city';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { formatMonthDay, getDiffDays} from '@/utils/format_date'
    import useHomeStore from '@/stores/modules/home'
    import useMainStore from '@/stores/modules/main';
    import { computed } from '@vue/reactivity';

    // defineProps({
    //   hotSuggests: {
    //     type: Object,
    //     default: () => [],
    //   },
    // });

    const router = useRouter()


    const cityClick = () =>{
        console.log("cityClick")
        router.push("/city")
    }
    // 获取位置信息
    const postionClick = () =>{
        // console.log("postionClick")
        navigator.geolocation.getCurrentPosition(res =>{
            console.log("获取位置成功", res)
        }, err =>{
            console.log("获取位置失败", err)
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
    }

    // 当前城市
        const cityStore = useCityStore()
        const { currentCity } = storeToRefs(cityStore)

    // 日期范围的处理
    // const nowDate = new Date()
    // const startDate = ref(formatMonthDay(nowDate))
    // const newDate = nowDate.setDate(nowDate.getDate() + 1)
    // const endDate = ref(formatMonthDay(newDate))
    // const nowDate = new Date()
    // const newDate = new Date()
    // newDate.setDate(nowDate.getDate() + 1)
    const mainStore =  useMainStore()
    const { startDate, endDate } = storeToRefs(mainStore)

    const startDateStr = computed(() => formatMonthDay(startDate.value))
    const endDateStr = computed(() => formatMonthDay(endDate.value))
    const stayCount = ref(getDiffDays(startDate.value, endDate.value))
    
    const showCalendar = ref(false)
    // const onConfirm = (value) => {
    //     // 设置日期
    //     const selectStartDate = value[0]
    //     const selectEndDate = value[1]
    //     startDate.value = formatMonthDay(selectStartDate)
    //     endDate.value = formatMonthDay(selectEndDate)
    //     stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    //     // 隐藏日期
    //     showCalendar.value = false
    // }
    const onConfirm = (value) => {
        // 设置日期
        const selectStartDate = value[0]
        const selectEndDate = value[1]
        mainStore.startDate = selectStartDate
        mainStore.endDate = selectEndDate
        stayCount.value = getDiffDays(selectStartDate, selectEndDate)
        // 隐藏日期
        showCalendar.value = false
    }
    // 热门建议
        // 定义Props
    // defineProps({
    //     hotSuggests: {
    //         type: Array,
    //         default: ()=>[]
    //     }
    // })
    const homeStore = useHomeStore()
    const { hotSuggests } = storeToRefs(homeStore)

    // 监听搜索按钮点击
    // const searchBtnClick = () =>{
    //     router.push({
    //         path: "/search",
    //         // 同时将参数传到search页面
    //         query:{
    //             startDate: startDate.value,
    //             endDate: endDate.value,
    //             currentCity: currentCity.value.cityName
    //         }
    //     })
    // }

const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      address: "广州",
      cityId: 45,
      startDate: "07-23",
      endDate: "07-24",
    },
  });
};
</script>

<style lang="less" scoped>
    .location{
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        .city{
            flex: 1;
        }
        .postion{
            display: flex;
            align-items: center;
            width: 100px;
            justify-content: space-between;
            img{
                width: 20px;
                height: 20px;
            }
        }
   }
   .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
        font-size: 12px;
        color: #999;
        }

        .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
        }
    }
}
.sarch-box{
    --van-calendar-popup-height: 100%;
}
.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}
.hot-suggests {
  margin: 10px 0;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}
.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

</style>