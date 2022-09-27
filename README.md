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

   ![1663804684391](https://user-images.githubusercontent.com/109357565/192409252-18dd1564-374a-42af-af5e-24e1291bc4e1.png)

   ![1663804728244](https://user-images.githubusercontent.com/109357565/192410081-0644ace1-2d70-43eb-93c7-09fa9978b75f.png)

8. 安装pinia npm install pinia

![1663804813023](https://user-images.githubusercontent.com/109357565/192410097-06b46ac8-1998-4b8c-9a5a-2f288ecd754f.png)

![1663804859546](https://user-images.githubusercontent.com/109357565/192410112-a8e8a951-a3a2-476b-9fa5-6a4c7a4be424.png)



> 分模块化

![1663805147150](https://user-images.githubusercontent.com/109357565/192410124-4aaaa253-f1a6-4db8-8dbc-2bbf34f963a0.png)



1. 编写tab-bar组件

   安装less --> npm install less -D

   ![1663806889422](https://user-images.githubusercontent.com/109357565/192410124-4aaaa253-f1a6-4db8-8dbc-2bbf34f963a0.png)

   运行不了将target: "es5" 注释·

   ![1663808990174](https://user-images.githubusercontent.com/109357565/192410136-d352e003-e7b8-40f5-a9f7-358dd787df41.png)

抽取代码

![1663810810779](https://user-images.githubusercontent.com/109357565/192410172-07ec8690-0a30-4379-bbca-4cab5e48a683.png)



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

1.  vant---ui框架的使用

   安装  npm install vant,配置相关设置

11. 安装day.js库



###  防抖、节流库

https://underscorejs.org/

## 项目效果图

首页

![1664237839619](https://user-images.githubusercontent.com/109357565/192410228-b88f76dd-7076-4bd6-8542-8fa0488a1bf8.png)



收藏

![1664237899772](https://user-images.githubusercontent.com/109357565/192410302-ae017881-5a67-4b89-8f55-dd2a9b95266a.png)



订单

![1664237964099](https://user-images.githubusercontent.com/109357565/192410312-0c35185b-5ce2-467f-9e4d-a1dae97c7a89.png)

消息

![1664237997415](https://user-images.githubusercontent.com/109357565/192410435-0018e51b-3218-4a25-8600-9ea168b3e45e.png)