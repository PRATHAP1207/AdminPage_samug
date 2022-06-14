import { all, call, put, takeEvery } from "redux-saga/effects";
import { Mode } from "../../constant/ActionTypes";
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
  GETDHANTYPE,
  GETCOUNTRY,
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
  








 function* getDhanTypeData(payload) {
  //console.log("sagadhan", payload.payload.country)
  const prop = payload.payload
  let form = new FormData();
  form.append('countryUid', prop.country)
  form.append('fromDate', changeDateFormat(prop.fromDhanDate))
  form.append('toDate', changeDateFormat(prop.toDhanDate))
  form.append('reportType','1')
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
      yield put({
        type: Mode.DHAN_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
   // console.log("response 200 dhan table", res.data.response.data)
    localStorage.setItem("DhanType", JSON.stringify(res.data.response.data));
    yield put({
      type: Mode.DISPLAY_DHAN_SWIPE_DATA,
      payload: res.data.response.data.details,
    });

  } else {
    NotificationManager.error(res.message);
    yield put({
      type: Mode.COUNTRY_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}

function* dhanType() {
  yield takeEvery(Mode.GET_DHAN_SWIPE_DATA, getDhanTypeData);
}
  export default function* rootSaga() {
    yield all([
     dhanType()
    ]);
  }