import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),

    // 配置映射关系：path -> component 
    routes: [
        {
            path: "/",
            // 重定向到home
            redirect: "home"
        },
        {
            path: "/home",
            component: () => import("../views/home/home.vue")
        },
        {
            path: "/favor",
            component: () => import("../views/favor/favor.vue")
        },
        {
            path: "/order",
            component: () => import("../views/order/order.vue")
        },
        {
            path: "/message",
            component: () => import("../views/message/message.vue")
        },
        {
            path: "/city",
            component: () => import("@/views/city/city.vue"),
            // 隐藏tabbar底部导航
            // meta:{
            //     hideTabbar: true
            // }
        },
        {
            path: "/search",
            component: () => import("@/views/search/search.vue"),
            // 隐藏tabbar底部导航
            meta:{
                hideTabbar: true
            }
        },
        {
            path: "/detail/:id",
            component: () => import("@/views/detail/detail.vue"),
        },
        {
            path: "/search",
            component: () => import("@/views/search/search.vue"),
            meta: {
              hideTabBar: true, // 是否隐藏首页的tabbar; 默认为 false
            },
        }
      
    ]
})

// 导出路由
export default router