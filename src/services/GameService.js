import { getElementsAsPageableList } from "../utils/ApiClient"
import { baseImgUrl } from "../utils/BaseUrls"
const default_path='games'
const gameImageUrl=baseImgUrl()+'game/'

const getGameList=(page)=> {
  return getElementsAsPageableList(page,'public/'+default_path)
}

export {getGameList,gameImageUrl}
