const API_VERSION='api/v1/'
const BASE_URL=`https://www.stomproject-environment.eba-8tasijbn.us-east-1.elasticbeanstalk.com/`
const BASE_APP_URL=`${BASE_URL}app/`
const BASE_IMAGE_URL=`${BASE_APP_URL}image/`


const baseUrl=()=> {
    return BASE_URL;
  }
const baseImgUrl=()=> {
  return BASE_IMAGE_URL;
}
const baseAppUrl=()=> {
  return BASE_APP_URL;
}
export {baseUrl,baseImgUrl,baseAppUrl}