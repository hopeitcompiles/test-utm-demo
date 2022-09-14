const API_VERSION='api/v1/'
const HOST=`https://www.api.pinkytest.com/`
const BASE_URL=`${HOST}${API_VERSION}`
const BASE_APP_URL=`${BASE_URL}app/`
const BASE_IMAGE_URL=`${BASE_APP_URL}image/`

const loginUrl=()=> {
  return `${HOST}login`;
}
const baseUrl=()=> {
    return BASE_URL;
  }
const baseImgUrl=()=> {
  return BASE_IMAGE_URL;
}
const baseAppUrl=()=> {
  return BASE_APP_URL;
}
export {baseUrl,baseImgUrl,baseAppUrl,loginUrl}