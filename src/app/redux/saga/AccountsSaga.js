import { all, call, put, takeEvery } from "redux-saga/effects";
import { accountsConstant } from "../../constant/ActionTypes";
import axios from "axios";
import {
  API_URL,
  API_URL_LOGIN,
  GETCOUNTRY,
  headers,
  headers1,
  ACC_DETAILS,
  ACC_BAL,
  PAY_OUT,
  BANK_KYC_LST,
  BANK_KYC_APP,
} from "../../constant/Common";
import { NotificationManager } from "react-notifications";
import Moment from "moment";
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
      type: accountsConstant.ACCOUNTS_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: accountsConstant.ACCOUNTS_COUNTRY_SUCCESS,
        payload: res.data.response.data.details,
      });
    } else {
      yield put({
        type: accountsConstant.ACCOUNTS_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}

function* getAccountsDetailsList(payload) {
  let prop = payload.payload;
  const form = new FormData();
  form.append("userId", prop.login.userId);
  form.append("countryId", prop.countryId);
  form.append("fromDate", changeDateFormat(prop.fromDate));
  form.append("toDate", changeDateFormat(prop.toDate));
  form.append("reportType", prop.reportType);

  var res = yield axios
    .post(API_URL.api + ACC_DETAILS, form, {
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
      type: accountsConstant.ACCOUNTS_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: accountsConstant.ACCOUNTS_DETAILS_LIST_RESPONSE,
        payload: res.data.response.data.details,
      });
    } else {
      yield put({
        type: accountsConstant.ACCOUNTS_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}
function* getAccountBalance(payload) {
  let prop = payload.payload;
  const form = new FormData();

  form.append("userId", prop.login.userId);
  form.append("countryId", prop.countryId);
  var res = yield axios
    .post(API_URL.api + ACC_BAL, form, {
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
      type: accountsConstant.ACCOUNTS_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: accountsConstant.ACCOUNTS_DETAILS_LIST_RESPONSE,
        payload: res.data.response.data.details,
      });
    } else {
      yield put({
        type: accountsConstant.ACCOUNTS_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}
function* savePayout(payload) {
  let prop = payload.payload;
  const form = new FormData();
 // console.log(prop.selectedAmount)
  if(prop.selectedAmount<=0){
    NotificationManager.error("Amount Can't be zero");
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
      payload: { error: "Amount Can't be zero" },
    });
    return
  }
  form.append("userId", prop.login.userId);
  form.append("countryId", prop.countryId);
  form.append("payout", JSON.stringify(prop.payoutSelected));
  form.append("totalAmount", prop.selectedAmount);
  form.append("reportType", prop.reportType);
  form.append("fromDate", changeDateFormat(prop.fromDate));
  form.append("toDate", changeDateFormat(prop.toDate));
  var res = yield axios
    .post(API_URL.api + PAY_OUT, form, {
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
      type: accountsConstant.ACCOUNTS_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: accountsConstant.ACCOUNTS_PAYOUT_RESPONSE,
        payload: res.data.response.data.details,
      });
      NotificationManager.success("Successfully updated");
    } else {
      NotificationManager.error(res.data.response.message);
      yield put({
        type: accountsConstant.ACCOUNTS_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    
    NotificationManager.error(res.message);
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}
function* bankKycList(payload) {
  let prop = payload.payload;
  const form = new FormData();
  form.append("userId", prop.login.userId);
  form.append("countryId", prop.countryId);
  form.append("reportType", prop.reportType);
  form.append("fromDate", changeDateFormat(prop.fromDate));
  form.append("toDate", changeDateFormat(prop.toDate));
  var res = yield axios
    .post(API_URL.api + BANK_KYC_LST, form, {
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
      type: accountsConstant.ACCOUNTS_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: accountsConstant.ACCOUNTS_BANK_KYC_LIST_RESPONSE,
        payload: res.data.response.data.details,
      });
    } else {
      yield put({
        type: accountsConstant.ACCOUNTS_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
      payload: { error: "Something went wrong" },
    });
  }
}

function* bankKycApproval(payload) {
  let prop = payload.payload;

  const form = new FormData();

 // console.log("Prop :", prop.status);
  if (prop.mode == 1) {
    //Table Data
    let data = prop.data;
    let abc = prop.props.result;
    form.append("userId", abc.login.userId);
    form.append("countryId", abc.countryId);
    form.append("approveKyc", JSON.stringify(data));
    form.append("reportType", abc.reportType);
    form.append("fromDate", changeDateFormat(abc.fromDate));
    form.append("toDate", changeDateFormat(abc.toDate));
    form.append("remarks", prop.remarks);
    form.append("status", prop.status);
  } else if (prop.mode == 2) {
    //Popup
    let data = prop.data;

    form.append("userId", data.login.userId);
    form.append("countryId", data.countryId);
    form.append("approveKyc", JSON.stringify(data.popupViewData));
    form.append("reportType", data.reportType);
    form.append("fromDate", changeDateFormat(data.fromDate));
    form.append("toDate", changeDateFormat(data.toDate));
    form.append("remarks", prop.remarks);
    form.append("status", prop.status);
  }
  var res = yield axios
    .post(API_URL.api + BANK_KYC_APP, form, {
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
      type: accountsConstant.ACCOUNTS_ERROR_STATUS,
      payload: { error: "Something went wrong" },
    });
    return;
  }
  if (res.status === 200) {
    if (res.data.response.status === 1) {
      yield put({
        type: accountsConstant.ACCOUNTS_BANK_KYC_APPROVAL_RESPONSE,
        payload: res.data.response.data.details,
      });
      NotificationManager.success("Successfully updated");
    } else {
      NotificationManager.error(res.data.response.message);
      yield put({
        type: accountsConstant.ACCOUNTS_ERROR,
        payload: { error: res.data.response.message },
      });
    }
  } else {
    NotificationManager.error(res.message);
    yield put({
      type: accountsConstant.ACCOUNTS_ERROR,
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
function* actionAccountsCountryWatcher() {
  yield takeEvery(accountsConstant.ACCOUNTS_COUNTRY_REQUEST, getCountryList);
}
function* actionAccountsDetailsListWatcher() {
  yield takeEvery(
    accountsConstant.ACCOUNTS_DETAILS_LIST_REQUEST,
    getAccountsDetailsList
  );
}
function* actionAccountsBalanceWatcher() {
  yield takeEvery(accountsConstant.ACCOUNTS_BALANCE_REQUEST, getAccountBalance);
}
function* actionAccountsPayoutWatcher() {
  yield takeEvery(accountsConstant.ACCOUNTS_PAYOUT_REQUEST, savePayout);
}
function* actionAccountsBankKycListWatcher() {
  yield takeEvery(accountsConstant.ACCOUNTS_BANK_KYC_LIST_REQUEST, bankKycList);
} //
function* actionAccountsBankKycApprovalWatcher() {
  yield takeEvery(
    accountsConstant.ACCOUNTS_BANK_KYC_APPROVAL_REQUEST,
    bankKycApproval
  );
}
export default function* rootSaga() {
  yield all([
    actionAccountsCountryWatcher(),
    actionAccountsDetailsListWatcher(),
    actionAccountsBalanceWatcher(),
    actionAccountsPayoutWatcher(),
    actionAccountsBankKycListWatcher(),
    actionAccountsBankKycApprovalWatcher(),
  ]);
}
