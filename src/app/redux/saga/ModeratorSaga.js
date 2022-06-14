import { all, call, put, takeEvery } from "redux-saga/effects";
import { moderatorConstant } from "../../constant/ActionTypes";
import axios from "axios";
import {
  API_URL,
  API_URL_LOGIN,
  GETCOUNTRY,
  headers,
  headers1,
  MOD_LIST,
  USR_POST,
  MOD_STS,
} from "../../constant/Common";
import { NotificationManager } from "react-notifications";
import Moment from "moment";
import {useNavigate} from "react-router-dom"
function* getCountryList() {
  let form = new FormData();
  form.append("mode", "1");
  var res = yield axios
    .post(API_URL.api + GETCOUNTRY, form, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status == 401) {
    NotificationManager.error("Unauthorized Access");
    yield put({
      type: moderatorConstant.MODERATOR_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: moderatorConstant.MODERATOR_COUNTRY_SUCCESS,
        payload: res.data.response.data.details,
      });
    } else {
      yield put({
        type: moderatorConstant.MODERATOR_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: moderatorConstant.MODERATOR_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
  }
}
function* getModeratorList(payload) {
  let prop = payload.payload;
  let form = new FormData();
  form.append("reportType", prop.reportType);
  form.append("countryId", prop.countryId);
  form.append("fromDate", changeDateFormat(prop.fromDate));
  form.append("searchId", prop.searchId);
  form.append("toDate", changeDateFormat(prop.toDate));
  var res = yield axios
    .post(API_URL.api + MOD_LIST, form, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status == 401) {
    NotificationManager.error("Unauthorized Access");
    yield put({
      type: moderatorConstant.MODERATOR_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response) {
      if (res.data.response.status === 1) {
        yield put({
          type: moderatorConstant.MODERATOR_LIST_RESPONSE,
          payload: res.data.response.data.details,
        });
      } else {
        yield put({
          type: moderatorConstant.MODERATOR_ERROR,
          payload: { error: res.data.response.message },
        });
      }
    } else {
      NotificationManager.error(res.message);
      yield put({
        type: moderatorConstant.MODERATOR_ERROR_STATUS,
        payload: { error: "Something went wrong" },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: moderatorConstant.MODERATOR_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
  }
}
function* moderatorViewRequest(payload) {
  let prop = payload.payload;
//console.log("wfwfefefwefw",prop);
  if (prop.mode == 1) {
    //Post
    // yield call(history.push, "/emp/empLst");
  } else {
    //need to call API Based on user or zamug
    let form = new FormData();
    form.append("accountId", prop.rowData.uid);
    form.append("mode", prop.rowData.mode);
    form.append("pageNo", prop.pageSize);
    form.append("requestTime", prop.requestTime);
    var res = yield axios
      .post(API_URL.api + USR_POST, form, {
        headers: headers,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err.response;
      });

    if (res.status == 401) {
      NotificationManager.error("Unauthorized Access");
      yield put({
        type: moderatorConstant.MODERATOR_ERROR_STATUS,
        payload: { error: "Something went wrong" },
      });
      return;
    }

    if (res.status === 200) {
      if (res.data.response.status === 1) {
        yield put({
          type: moderatorConstant.MODERATOR_RECORD_VIEW_RESPONSE,
          payload: res.data.response.data,
        });
        payload.payload.navigation('/mod/prof')
       // yield call(history.push, "/mod/prof");
      } else {
        yield put({
          type: moderatorConstant.MODERATOR_ERROR,
          payload: { error: res.data.response.message },
        });
      }
    } else {
      NotificationManager.error(res.message);
      yield put({
        type: moderatorConstant.MODERATOR_ERROR_STATUS,
        payload: { error: "Something went wrong" },
      });
    }
  }
}

function* UpdateModeratorStatus(payload) {
//  console.log(payload);
  let accountId = payload.payload.accountId;
  let remarks = payload.payload.remarks;
  let mode = payload.payload.mode;
  let userId = payload.payload.userId;
  let types = payload.payload.types;
  let form = new FormData();
  form.append("accountId", accountId);
  form.append("userId", userId);
  form.append("mode", mode);
  form.append("requestType", types);
  form.append("remarks", remarks);
  var res = yield axios
    .post(API_URL.api + MOD_STS, form, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status == 401) {
    NotificationManager.error("Unauthorized Access");
    yield put({
      type: moderatorConstant.MODERATOR_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response) {
      if (res.data.response.status === 1) {
        NotificationManager.success("Successfully updated");
        yield put({
          type: moderatorConstant.MODERATOR_STATUS_RESPONSE,
          payload: res.data.response.data.details,
        });
        if (types == 1) {
        } else {
          //history.goBack();
        }
      } else {
        yield put({
          type: moderatorConstant.MODERATOR_ERROR,
          payload: { error: res.data.response.message },
        });
      }
    } else {
      NotificationManager.error(res.message);
      yield put({
        type: moderatorConstant.MODERATOR_ERROR_STATUS,
        payload: { error: "Something went wrong" },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: moderatorConstant.MODERATOR_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
  }
}

function changeDateFormat(dates) {
  const newDate = new Date(dates);
  //console.log(newDate.toLocaleDateString());
  // return newDate.toLocaleDateString();
  return Moment(newDate).format("YYYY-MM-DD");
}
function* actionModeratorCountryWatcher() {
  yield takeEvery(moderatorConstant.MODERATOR_COUNTRY_REQUEST, getCountryList);
}
function* actionModeratorListWatcher() {
  yield takeEvery(moderatorConstant.MODERATOR_LIST_REQUEST, getModeratorList);
}
function* actionModeratorViewWatcher() {
  yield takeEvery(
    moderatorConstant.MODERATOR_RECORD_VIEW_REQUEST,
    moderatorViewRequest
  );
}
function* actionModeratorLoadModeWatcher() {
  yield takeEvery(
    moderatorConstant.MODERATOR_LOAD_MORE_REQUEST,
    moderatorViewRequest
  );
}
function* actionModeratorStatusWatcher() {
  yield takeEvery(
    moderatorConstant.MODERATOR_STATUS_REQUEST,
    UpdateModeratorStatus
  );
}
export default function* rootSaga() {
  yield all([
    actionModeratorCountryWatcher(),
    actionModeratorListWatcher(),
    actionModeratorViewWatcher(),
    actionModeratorLoadModeWatcher(),
    actionModeratorStatusWatcher(),
  ]);
}
