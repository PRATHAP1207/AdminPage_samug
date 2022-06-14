import { all, call, put, takeEvery } from "redux-saga/effects";
import { couponConstant } from "app/constant/ActionTypes";
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
  
 function* getCouponItem(payload){
  const prop = payload.payload
  let form = new FormData();
  form.append('countryId', prop.countryIdList)
  form.append('fromDate', changeDateFormat(prop.startDateList))
  form.append('toDate', changeDateFormat(prop.endDateList))
  form.append('status',prop.statusChange)
  var res = yield axios
    .post(API_URL.api + COUPONLIST, form, {
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
      yield put({
        type:couponConstant.COUPON_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
  //  console.log("response 200 dhan table", res.data.response.data)
    // localStorage.setItem("DhanType", JSON.stringify(res.data.response.data));
    yield put({
      type:couponConstant.DISPLAY_COUPON_LIST,
      payload: res.data.response.data.couponList,
    });

  } else {
    NotificationManager.error(res.message);
    // yield put({
    //   type: Mode.COUNTRY_ERROR,
    //   payload: { error: "Something went wrong" },
    // });
  }
}
  
 function* saveCouponItem(payload){
     //console.log("working in saga",payload);
  const prop = payload.payload.CouponData
  let form = new FormData();
  form.append('countryId', prop.countryId)
  form.append('couponMode', prop.couponMode)
  form.append('couponValue', prop.couponValue)
  form.append('discountType', prop.couponType)
  form.append('maxCount', prop.maxCount)
  form.append('userMode', 1)
  form.append('userId', prop.userId)
  form.append('couponLength', prop.lengthofCoupon)
  form.append('couponPrefix', prop.prefixCoupon)
  form.append('couponSuffix', prop.sufixCoupon)
  form.append('couponLetters', prop.lowerCase)
  form.append('couponMixedCase', prop.alphabet)
  form.append('couponNumbers', prop.numberEnable)
  form.append('couponMask', prop.couponMask)
  form.append('startDate', changeDateFormat(prop.startDate))
  form.append('endDate', changeDateFormat(prop.endDate))
  var res = yield axios
    .post(API_URL.api + SAVECOUPON, form, {
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
        yield put({
          type:couponConstant.COUPON_ERROR,
          payload: { error: "Something went wrong" },
        });
        return;
      }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
    NotificationManager.success("SuccessFully Added");
  
  //  console.log("response 200 dhan table", res.data.response.data)
    // localStorage.setItem("DhanType", JSON.stringify(res.data.response.data));
    yield put({
      type:couponConstant.DISPLAY_COUPON_STATUS,
      payload: res.data.response.data.couponList,
    });
    payload.payload.navigation('/CouponTableList');
    }
  } else {
    NotificationManager.error(res.message);
    // yield put({
    //   type: Mode.COUNTRY_ERROR,
    //   payload: { error: "Something went wrong" },
    // });
  }
}

function* getCouponList() {
  yield takeEvery(couponConstant.GET_COUPON_LIST, getCouponItem);
}
function* saveCoupon() {
    yield takeEvery(couponConstant.COUPON_SAVE_DATA, saveCouponItem);
  }
  

  export default function* rootSaga() {
    yield all([
        getCouponList(),
        saveCoupon()
    ]);
  }