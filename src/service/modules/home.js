import hyRequest from '../request'


export function getHomeHotSuggests() {
  return hyRequest.get({ 
    url: "/home/hotSuggests" 
  })
}

export function getHomeCategoriesData(){
  return hyRequest.get({
    url: "/home/categories"
  })
}

export function getHomeHouseListData(currentPage){
  return hyRequest.get({
    url: "/home/houselist",
    params:{
      page: currentPage
    }
  })
}