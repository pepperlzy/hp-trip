import { getCityAll } from "@/service";
import { defineStore } from "pinia";

// city -> id 
const useCityStore = defineStore("city", {
    // state对象
    state: () => ({
        allCities: {},
        currentCity: {cityName: "广东"}
    }),
    // actions网络请求
    actions:{
        async fetchAllCitiesData(){
            const res = await getCityAll()
            this.allCities = res.data
        }
    }
})

export default useCityStore