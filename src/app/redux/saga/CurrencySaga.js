import { all, call, put, takeEvery } from "redux-saga/effects";
import { Currency } from "../../constant/ActionTypes";
import axios from "axios";
import {
  API_URL,
  API_URL_LOGIN,
  GETMEMBER,
  GETSTATE,
  GETCITY,
  GETCOUNTRYTABLEDHAN,
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
function* getCountryList(payload) {
  //  console.log("saga country from", payload)
    let form = new FormData();
    form.append("userId",payload.payload.userId);
    var res = yield axios
      .post(API_URL.api + GETCOUNTRYDATA, form, {
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
          type: Currency.CURRENCY_ERROR,
          payload: { error: "Something went wrong" },
        });
        return;
      }
    if (res.status === 200) {
      if (res.data.response.status === 1) {
      //  console.log("response 200 dhan", res.data.response.data)
      localStorage.setItem("CountryList",JSON.stringify(res.data.response.data))
        yield put({
          type: Currency.DISPLAY_COUNTRY_LIST_CURR,
          payload: res.data.response.data,
        });
      } else {
        yield put({
          type: Currency.COUNTRY_ERROR,
          payload: {},
        });
      }
     }
     // else {
    //   NotificationManager.error(res.message);
    //   yield put({
    //     type: Currency.COUNTRY_ERROR,
    //     payload: { error: "Something went wrong" },
    //   });
    // }
  }
  function* CountryList() {
    yield takeEvery(Currency.GET_COUNTRY_LIST_CURR, getCountryList);
  }
//get currency table data
function* getCurrencyTable(payload) {
 // console.log("saga currency from", payload)
  const prop = payload.payload
  let form = new FormData();
  form.append('countryUid', prop.curCountryIds)
  form.append('fromDate', changeDateFormat(prop.fromDate))
  form.append('toDate', changeDateFormat(prop.toDate))
  var res = yield axios
    .post(API_URL.api + GETCURRENCYDATA, form, {
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
        type: Currency.CURRENCY_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
    if(res.data.status === 1){
    if (res.data.response.status === 1) {
     // console.log("response 200 dhan", res)
      localStorage.setItem("currencyDetails",JSON.stringify(res.data.response.data));
      yield put({
        type: Currency.DISPLAY_TABLE_CURRENCY,
        payload: res.data.response.data,
      });
    } else {
      yield put({
        type: Currency.COUNTRY_ERROR,
        payload: {},
      });
    }
   }}
   // else {
  //   NotificationManager.error(res.message);
  //   yield put({
  //     type: Currency.COUNTRY_ERROR,
  //     payload: { error: "Something went wrong" },
  //   });
  // }
}
function* CurrencyTableData() {
  yield takeEvery(Currency.GET_TABLE_CURRENCY, getCurrencyTable);
}
//get datewise table data currency
function* getCurrencyDateData(payload) {
//  console.log("saga currency from", payload.payload.curCountryIds)
   const prop = payload.payload
   let form = new FormData();
   form.append('countryUid', prop.curCountryIds)
   form.append('date', prop.saveDateCurrency)
   var res = yield axios
     .post(API_URL.api + GETCURRENCYDATEWISE, form, {
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
        type: Currency.CURRENCY_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
   if (res.status === 200) {
     if(res.data.status === 1){
     if (res.data.response.status === 1) {
     // console.log("response 200 dhan", res.data.response.data)
      // localStorage.setItem("currencyDatewiseData",JSON.stringify(res.data.response.data));
       yield put({
         type: Currency.DATEWISE_CURRENCY_DATA,
         payload: res.data.response.data,
       });
     } else {
       yield put({
         type: Currency.COUNTRY_ERROR,
         payload: {},
       });
     }
    }}
    // else {
   //   NotificationManager.error(res.message);
   //   yield put({
   //     type: Currency.COUNTRY_ERROR,
   //     payload: { error: "Something went wrong" },
   //   });
   // }
 }
 function* CurrencyDatewiseData() {
   yield takeEvery(Currency.GET_CURRENCY_DATEWISE_DATA, getCurrencyDateData);
 }
 
  export default function* rootSaga() {
    yield all([
      CountryList(),
      CurrencyTableData(),
      CurrencyDatewiseData()
    ]);
  }