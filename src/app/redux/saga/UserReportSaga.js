import { all, call, put, takeEvery } from "redux-saga/effects";
import { UserDetail } from "../../constant/ActionTypes";
import axios from "axios";
import {
  API_URL,
  GETDHANTYPE,
  API_URL_LOGIN,
  GETMEMBER,
  GETSTATE,
  GETCITY,
  GETCOUNTRYTABLEDHAN,
  GETCOUNTRYLIST,
  headers,
  GETCOUNTRYDATA,
  GETCOUNTRY,
  GETCURRENCYDATEWISE,
  headers1,
  SAVE_EMP,
  EMP_LST,
  EMP_EDIT,
  EMP_RM,
  EMP_EMAIL_CHECK,
  GETDHANDATEWISE,
  GETCURRENCYDATA,
  loginheaders,

} from "../../constant/Common";

import { NotificationManager } from "react-notifications";
import Moment from "moment";

function changeDateFormat(dates) {
    const newDate = new Date(dates);
    //console.log(newDate.toLocaleDateString());
    // return newDate.toLocaleDateString();
    return Moment(newDate).format("YYYY-MM-DD");
  }
function* getUserAppDetails(payload) {
//   console.log("saga currency from", payload)
   const prop = payload.payload
   let form = new FormData();
   form.append('countryUid', prop.country)
   form.append('fromDate', changeDateFormat(prop.fromDate))
   form.append('toDate', changeDateFormat(prop.toDate))
   form.append('reportType','2')
   var res = yield axios
     .post(API_URL.api + GETDHANTYPE, form, {
       headers: headers,
     })
     .then((response) => {
       return response;
     })
     .catch((err) => {
       return err.response;
     });
   if (res.status === 401) {
     NotificationManager.error("Unauthorized Access");
     return;
   }
   if (res.status === 200) {
     if(res.data.status === 1){
     if (res.data.response.status === 1) {
     //  console.log("response 200 dhan", res.data.response.data)
       localStorage.setItem("UserSamugLoginDetails",JSON.stringify(res.data.response.data));
       yield put({
         type: UserDetail.DISPLAY_USER_DATA,
         payload: res.data.response.data,
       });
     } 
    }}
 }
 function* userAppUsing() {
   yield takeEvery(UserDetail.GET_USER_DATA, getUserAppDetails);
 }
 
  export default function* rootSaga() {
    yield all([
      userAppUsing()
    ]);
  }