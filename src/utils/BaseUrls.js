const BASE_URL='http://192.168.0.110:5000/'
const BASE_APP_URL=`${BASE_URL}app/`
const BASE_USER_IMAGE_URL=`${BASE_APP_URL}image/`


const baseUrl=()=> {
    return BASE_URL;
  }
const baseUserImgUrl=()=> {
  return BASE_USER_IMAGE_URL;
}
const baseAppUrl=()=> {
  return BASE_APP_URL;
}
export {baseUrl,baseUserImgUrl,baseAppUrl}