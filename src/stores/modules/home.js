import { getHomeCategoriesData, getHomeHotSuggests, getHomeHouseListData } from "@/service";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    // 定义当前页面默认为1
    currentPage: 1,
    houselist:[]
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData(){
        const res = await getHomeCategoriesData()
        this.categories = res.data
        // console.log(res)
    },
    // 传递currentPage每次请求houslist数量增加
    async fetchHouseList(currentPage){
        const res = await getHomeHouseListData(this.currentPage)
        this.houselist.push(...res.data)
        // 每次拿完数据+1
        this.currentPage++
        // console.log(res)
        // console.log("fetchHouseListData",res)

    }
  }
})

export default useHomeStore

