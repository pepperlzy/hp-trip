import { defineStore } from "pinia";

// city -> id 
const useCityStore = defineStore("city", {
    // state对象
    state: () => ({
        cities:[]
    }),
    // actions网络请求
    actions:{

    }
})

export default useCityStore