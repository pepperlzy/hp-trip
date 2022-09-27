# hp-trip

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 项目搭建步骤

### 创建项目

1. 进入项目文件夹

2. 收到安装依赖 npm install

3. npm run dev

4. 建立开发相关文件夹

5. npm install normalize.css 并在入口文件引入 import "normalize.css"

6. 搭建自己的公共样式，在main.js中引入

7. 安装路由 npm install vue-router

   ![1663804684391](./src/assets/img/screenshot/7-1.png)

   ![1663804728244](./src/assets/img/screenshot/7-2.png)

8. 安装pinia npm install pinia

![1663804813023](./src/assets/img/screenshot/8-1.png)

![1663804859546](./src/assets/img/screenshot/8-2.png)



> 分模块化

![1663805147150](./src/assets/img/screenshot/8-3.png)



9. 编写tab-bar组件

   安装less --> npm install less -D

   ![1663806889422](./src/assets/img/screenshot/9-1.png)

   运行不了将target: "es5" 注释·

   ![1663808990174](./src/assets/img/screenshot/9-2.png)

抽取代码

![1663810810779](./src/assets//img/screenshot/9-3.png)



tab-bar.js

```
<template>
    <div class="tab-bar">
        <template v-for="(item, index) in tabbarDate">
            <div class="tab-bar-item" 
                :class="{ active: currentIndex === index}"
                @click="itemClick(index, item)">
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)"/>
            <img v-else="currentIndex === index" :src="getAssetURL(item.imageActive)"/>
            <span class="text">{{ item.text }}</span>
        </div>
        </template>
    </div>
</template>

<script setup>
    import tabbarDate from '../../assets/data/tabbar.js'

    import { getAssetURL } from "@/utils/get_asset_img";
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const currentIndex = ref(0)

    const router = useRouter()
   const itemClick = (index, item) =>{
        currentIndex.value = index
        router.push(item.path)
    }
```

10. vant---ui框架的使用

   安装  npm install vant,配置相关设置

11. 安装day.js库



###  防抖、节流库

https://underscorejs.org/

## 项目效果图

首页

![1664237839619](./src/assets/img/screenshot/10-1.png)



收藏

![1664237899772](./src/assets/img/screenshot/10-2.png)



订单

![1664237964099](./src/assets/img/screenshot/10-3.png)

消息

![1664237997415](./src/assets/img/screenshot/10-4.png)