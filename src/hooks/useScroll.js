import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from "underscore";


// 方法2
// reachBottomCB接收传过来的回调函数
// export default function useScroll(reachBottomCB){
//     const scrollListenerHander = () =>{
//         const clientHeight = document.documentElement.clientHeight
//         const scrollTop = document.documentElement.scrollTop
//         // 整个文档高度
//         const scrollHeight = document.documentElement.scrollHeight
//         // console.log(clientHeight,scrollTop, scrollHeight)
//         if(clientHeight + scrollTop >= scrollHeight){
//             // homeStore.fetchHouseList()
//             console.log("滚动到底部了")
//             if (reachBottomCB) reachBottomCB()
//         }
//     }
//     // 挂载时添加监听事件
//     onMounted(() => {
//         window.addEventListener("scroll",scrollListenerHander)
//     })
//     // 卸载时移除监听
//     onUnmounted(() =>{
//         window.removeEventListener("scroll", scrollListenerHander)
//     })
// }
// 方法3
export default function useScroll(elRef){
    let el = window
    const isreachBottom = ref(false)
    const clientHeight =ref(0)
    const scrollTop = ref(0)
    const scrollHeight =ref(0)
    // 执行频率高，防抖、节流throttle
    const scrollListenerHander = throttle(() =>{
        if (el === window) {
            clientHeight.value = document.documentElement.clientHeight
            scrollTop.value = document.documentElement.scrollTop
            // 整个文档高度
            scrollHeight.value = document.documentElement.scrollHeight
            // console.log(clientHeight,scrollTop, scrollHeight)
        } else {
            clientHeight.value = el.clientHeight
            scrollTop.value = el.scrollTop
            scrollHeight.value = el.scrollHeight
        }
        if(clientHeight.value + scrollTop.value >= scrollHeight.value){
            // homeStore.fetchHouseList()
            console.log("滚动到底部了")
           isreachBottom.value = true
        }
    }, 100)
    // 挂载时添加监听事件
    onMounted(() => {
        if (elRef) el = elRef.value
        el.addEventListener("scroll",scrollListenerHander)
    })
    // 卸载时移除监听
    onUnmounted(() =>{
        el.removeEventListener("scroll", scrollListenerHander)
    })

    return { isreachBottom, clientHeight, scrollTop, scrollHeight }
}
// export default function useScroll(){
//     const isreachBottom = ref(false)
//     const clientHeight =ref(0)
//     const scrollTop = ref(0)
//     const scrollHeight =ref(0)
//     // 执行频率高，防抖、节流throttle
//     const scrollListenerHander = throttle(() =>{
//         clientHeight.value = document.documentElement.clientHeight
//         scrollTop.value = document.documentElement.scrollTop
//         // 整个文档高度
//         scrollHeight.value = document.documentElement.scrollHeight
//         // console.log(clientHeight,scrollTop, scrollHeight)
//         if(clientHeight.value + scrollTop.value >= scrollHeight.value){
//             // homeStore.fetchHouseList()
//             console.log("滚动到底部了")
//            isreachBottom.value = true
//         }
//     }, 100)
//     // 挂载时添加监听事件
//     onMounted(() => {
//         window.addEventListener("scroll",scrollListenerHander)
//     })
//     // 卸载时移除监听
//     onUnmounted(() =>{
//         window.removeEventListener("scroll", scrollListenerHander)
//     })

//     return { isreachBottom, clientHeight, scrollTop, scrollHeight }
// }