import { all, call, put, takeEvery } from "redux-saga/effects";
import { Dhan } from "../../constant/ActionTypes";
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
  headers1,
  SAVE_EMP,
  EMP_LST,
  EMP_EDIT,
  EMP_RM,
  EMP_EMAIL_CHECK,
  GETDHANDATEWISE,
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


function* getCountryData(payload) {
 // console.log("saga country from", payload.payload.userId)
  let form = new FormData();
  form.append("userId", payload.payload.userId);
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
        type: Dhan.DHAN_REPORT_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
     // console.log("response 200 dhan", res.data.response.data)
      yield put({
        type: Dhan.DISPLAY_COUNTRY_LIST_DATA,
        payload: res.data.response.data,
      });
    } else {
      yield put({
        type: Dhan.COUNTRY_ERROR,
        payload: {},
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: Dhan.COUNTRY_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}
function* actionCountryList() {
  yield takeEvery(Dhan.GET_COUNTRY_LIST_DATA, getCountryData);
}

//dhan table and graph data
function* getdhanTableGraph(payload) {
 // console.log("sagadhan", payload)
  const prop = payload.payload
  let form = new FormData();
  form.append('countryUid', payload.payload.countryChange)
  form.append('fromdate', changeDateFormat(prop.fromCountryDate))
  form.append('todate', changeDateFormat(prop.toCountryDate))
  var res = yield axios
    .post(API_URL.api + GETCOUNTRYTABLEDHAN, form, {
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
        type: Dhan.DHAN_REPORT_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
  //  console.log("response 200 dhan table", res.data)
    // sessionStorage.setItem("tableListData",JSON.stringify(res.data.response));
    localStorage.setItem("dhanTableListData", JSON.stringify(res.data));
    yield put({
      type: Dhan.DISPLAY_DHAN_TABLEGRAPH_DATA,
      payload: res.data,
    });

  } else {
    NotificationManager.error(res.message);
    yield put({
      type: Dhan.COUNTRY_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}

function* dhanTabledata() {
  yield takeEvery(Dhan.GET_DHAN_TABLEGRAPH_DATA, getdhanTableGraph);
}
//datewise user details dhan
function* getdhanDatewise(payload) {
  const prop = payload.payload
  let form = new FormData();
  form.append('countryUid', payload.payload.countryChange)
  form.append('date', prop.userDhanDate)
  var res = yield axios
    .post(API_URL.api + GETDHANDATEWISE, form, {
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
        type: Dhan.DHAN_REPORT_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
   // console.log("response 200 dhan datewise", res)
    localStorage.setItem("datewisUserDhan", JSON.stringify(res));
    yield put({
      type: Dhan.DISPLAY_DATE_DHAN,
      payload: res,
      
    }
   );

  } else {
    NotificationManager.error(res.message);
    yield put({
      type: Dhan.COUNTRY_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}
function* datewiseDhan() {
  yield takeEvery(Dhan.GET_DATE_DHAN, getdhanDatewise);
}


export default function* rootSaga() {
  yield all([
    actionCountryList(),
    dhanTabledata(),
    datewiseDhan()
  ]);
}