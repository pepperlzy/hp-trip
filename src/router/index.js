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
    ]
})

// 导出路由
export default router