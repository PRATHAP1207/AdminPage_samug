import { all, call, put, takeEvery } from "redux-saga/effects";
import { reportSubscript } from "app/constant/ActionTypes";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import Moment from "moment";
import {
    API_URL,
    COUPONLIST,
    headers,
    SAVECOUPON,
  
  } from "../../constant/Common";

function changeDateFormat(dates) {
    const newDate = new Date(dates);
    //console.log(newDate.toLocaleDateString());
    // return newDate.toLocaleDateString();
    return Moment(newDate).format("YYYY-MM-DD");
  }
  
//  function* getListOfSubscribe(payload){
//   const prop = payload.payload
//   let form = new FormData();
//   form.append('countryId', prop.countryIdList)
//   form.append('fromDate', changeDateFormat(prop.startDateList))
//   form.append('toDate', changeDateFormat(prop.endDateList))
//   form.append('status',prop.statusChange)
//   var res = yield axios
//     .post(API_URL.api + COUPONLIST, form, {
//       headers: headers,
//     })
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       return err.response;
//     });
//     if (res.status === 401) {
//       NotificationManager.error("Unauthorized Access");
//       yield put({
//         type:couponConstant.COUPON_ERROR,
//         payload: { error: "Something went wrong" },
//       });
//       return;
//     }
//   if (res.status === 200) {
//     yield put({
//       type:couponConstant.DISPLAY_COUPON_LIST,
//       payload: res.data.response.data.couponList,
//     });

//   } else {
//     NotificationManager.error(res.message);
//     // yield put({
//     //   type: Mode.COUNTRY_ERROR,
//     //   payload: { error: "Something went wrong" },
//     // });
//   }
// }

// function* getSubsrcibedList() {
//   yield takeEvery(reportSubscript.GET_SUBSCRIBE_LIST_SHOW, getListOfSubscribe);
// }

  

  export default function* rootSaga() {
    yield all([
    //    getSubsrcibedList(),
        
    ]);
  }