import { all, call, put, takeEvery, getContext } from 'redux-saga/effects'
import { employeeConstant } from '../../constant/ActionTypes'
import axios from 'axios'
import {
    API_URL,
    API_URL_LOGIN,
    GETCOUNTRY,
    GETSTATE,
    GETCITY,
    headers,
    headers1,
    SAVE_EMP,
    EMP_LST,
    EMP_EDIT,
    EMP_RM,
    EMP_EMAIL_CHECK,
    loginheaders,
} from '../../constant/Common'
import { NotificationManager } from 'react-notifications'

import { LOCATION_CHANGE, push } from 'react-router-redux';

//const history = useHistory();
function* getCountryList(payload) {
    let form = new FormData()
    form.append('mode', '1')
    var res = yield axios
        .post(API_URL.api + GETCOUNTRY, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    if (res.status === 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
            payload: { error: 'Something went wrong' },
        })
        return
    }
    if (res.status === 200) {
        if (res.data.response.status === 1) {
            yield put({
                type: employeeConstant.EMPLOYEE_COUNTRY_SUCCESS,
                payload: res.data.response.data.details,
            })
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* getStateList(prop) {
    let form = new FormData()
    form.append('uid', prop.payload.countryId)
    form.append('mode', '2')
    var res = yield axios
        .post(API_URL.api + GETSTATE, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    if (res.status === 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
            payload: { error: 'Something went wrong' },
        })
        return
    }
    if (res.status === 200) {
        if (res.data.response.status == 1) {
            yield put({
                type: employeeConstant.EMPLOYEE_STATE_SUCCESS,
                payload: res.data.response.data.details,
            })
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}

function* getCityList(prop) {
    let form = new FormData()
    form.append('uid', prop.payload.stateId)
    form.append('mode', '3')
    var res = yield axios
        .post(API_URL.api + GETCITY, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    if (res.status === 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
            payload: { error: 'Something went wrong' },
        })
        return
    }
    if (res.status === 200) {
        if (res.data.response.status == 1) {
            yield put({
                type: employeeConstant.EMPLOYEE_CITY_SUCCESS,
                payload: res.data.response.data.details,
            })
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* getDesignation() {
  //  console.log('saga emp')
    let form = new FormData()
    form.append('mode', '4')
    var res = yield axios
        .post(API_URL.api + GETCITY, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    if (res.status === 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
            payload: { error: 'Something went wrong' },
        })
        return
    }
    if (res.status === 200) {
        if (res.data.response.status == 1) {
            yield put({
                type: employeeConstant.EMPLOYEE_DESIGNATION_SUCCESS,
                payload: {
                    designation: res.data.response.data.details,
                    roleList: res.data.response.data.roleList,
                },
            })
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}

function* employeeUpdate(payload) {
    let prop = payload.payload
    let form = new FormData()
    form.append('formMode', prop.formModes)
    form.append('employeeId', prop.employeeId)
    form.append('employeeName', prop.employeeName)
    form.append('designation', prop.designationId)
    //  form.append("emailId", prop.emailId);
    form.append('contactNo', prop.contactNo)
    form.append('altContactNo', prop.altContactNo)
    form.append('gender', prop.gender)
    form.append('dob', changeDateFormat(prop.dob))
    form.append('address1', prop.address1)
    form.append('address2', prop.address2)
    form.append('countryId', prop.countryId)
    form.append('stateId', prop.stateId)
    form.append('cityId', prop.cityId)
    form.append('postBox', prop.pincode)
    form.append('employeeImage', prop.employeeImage)
    form.append('employeeMode', prop.employeeMode)
    form.append('userRoles', prop.roleId)
    if (prop.formModes == 1) {
        form.append('emailId', prop.emailId)
        form.append('accessCountry', prop.accessCountry)
        if (prop.webLoginStatus == true) {
            form.append('webLoginStatus', 1)
        } else {
            form.append('webLoginStatus', 0)
        }
    }

    form.append('formToken', Math.random())
    if (navigator.onLine) {
        var res = yield axios
            .post(API_URL.api + SAVE_EMP, form, {
                headers: headers,
            })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
        if (res.status === 401) {
            NotificationManager.error('Unauthorized Access')
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
                payload: { error: 'Something went wrong' },
            })
            return
        }
        if (res.status === 200) {
            if (res.data.response.status === 1) {
                if (res.data.response.data.employeeId > 0) {
                    NotificationManager.success(
                        'Employee Successfully Updated!!!'
                    )
                    yield put({
                        type: employeeConstant.EMPLOYEE_SAVE_SUCCESS,
                        payload: res.data.response.data.employeeId,
                    })
                    if (prop.formModes == 1) {
                      //  yield call(history.push, '/emp/empLst')
                    } else {
                        //yield call(history.goBack());
                       // yield call(history.push, '/emp/empLst')
                    }
                } else {
                    yield put({
                        type: employeeConstant.EMPLOYEE_ERROR,
                        payload: { error: res.data.response.message },
                    })
                }
            } else {
                yield put({
                    type: employeeConstant.EMPLOYEE_ERROR,
                    payload: { error: res.data.response.message },
                })
            }
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: 'Something went wrong' },
            })
        }
    } else {
        //offline
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Check Your Internet' },
        })
    }
}
function* getEmployeeList(prop) {
   // console.log("Getting the Data");
    // React Navigation
   // yield put(push('/'));
    const form = new FormData()
    form.append('status', prop.payload.listStatus)
    var res = yield axios
        .post(API_URL.api + EMP_LST, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })

    if (res.status === 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
            payload: { error: 'Something went wrong' },
        })
        return
    }
    if (res.status === 200) {
       /// console.log(res.data.status);
        if (res.data.response.status === 1) {
            yield put({
                type: employeeConstant.EMP_LIST_SUCCESS,
                payload: res.data.response.data.employeeList,
            })
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}

function* getEmployeeEditDetails(prop) {
   // console.log("getting the EMployee",prop);
      let form = new FormData();
      form.append("employeeId", prop.payload.rowData.employeeId);
      form.append("mode", 1);
      if (navigator.onLine) {
        var res = yield axios
          .post(API_URL.api + EMP_EDIT, form, {
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
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: "Something went wrong" },
          });
          return;
        }
      //  console.log("")
        if (res.status === 200) {
          if (res.data.response.status === 1) {
            yield put({
              type: employeeConstant.EMPLOYEE_EDIT_SUCCESS,
              payload: res.data.response.data,
            });
             
            prop.payload.navigation('/emp/newEmp')
          } else {
            yield put({
              type: employeeConstant.EMPLOYEE_ERROR,
              payload: { error: res.data.response.message },
            });
          }
        } else {
          yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: "Something went wrong" },
          });
        }
      } else {
        yield put({
          type: employeeConstant.EMPLOYEE_ERROR,
          payload: { error: "Something went wrong" },
        });
      }
    }

function* getEmployeeProfileEditDetails(prop) {
    let form = new FormData()
    form.append('employeeId', prop.payload)
    form.append('mode', 2)
    if (navigator.onLine) {
        var res = yield axios
            .post(API_URL.api + EMP_EDIT, form, {
                headers: headers,
            })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
        if (res.status === 401) {
            NotificationManager.error('Unauthorized Access')
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
                payload: { error: 'Something went wrong' },
            })
            return
        }
        if (res.status === 200) {
            if (res.data.response.status === 1) {
                yield put({
                    type: employeeConstant.EMPLOYEE_PROFILE_EDIT_SUCCESS,
                    payload: res.data.response.data,
                })
               // yield call(history.push, '/emp/profEdit')
            } else {
                yield put({
                    type: employeeConstant.EMPLOYEE_ERROR,
                    payload: { error: res.data.response.message },
                })
            }
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: 'Something went wrong' },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}

function* employeeActiveInactive(prop) {
    let form = new FormData()
    form.append('employeeId', prop.payload.employeeId)
    form.append('userId', localStorage.getItem('user_id'))
    form.append('status', prop.payload.status)
    if (navigator.onLine) {
        var res = yield axios
            .post(API_URL.api + EMP_RM, form, {
                headers: headers,
            })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
        if (res.status === 401) {
            NotificationManager.error('Unauthorized Access')
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
                payload: { error: 'Something went wrong' },
            })
            return
        }
        if (res.status === 200) {
            if (res.data.response.status === 1) {
                yield put({
                    type: employeeConstant.EMPLOYEE_ACTIVEINACTIVE_SUCCESS,
                    payload: res.data.response.data.employeeList,
                })
            } else {
                yield put({
                    type: employeeConstant.EMPLOYEE_ERROR,
                    payload: { error: res.data.response.message },
                })
            }
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: 'Something went wrong' },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* employeeEmailCheck(payload) {
    let prop = payload.payload
    let form = new FormData()
    form.append('employeeId', prop.employeeId)
    form.append('userId', localStorage.getItem('user_id'))
    form.append('emailId', prop.emailId)
    if (navigator.onLine) {
        var res = yield axios
            .post(API_URL.api + EMP_EMAIL_CHECK, form, {
                headers: headers,
            })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
        if (res.status === 401) {
            NotificationManager.error('Unauthorized Access')
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR_REQUEST,
                payload: { error: 'Something went wrong' },
            })
            return
        }
        if (res.status === 200) {
            if (res.data.response.status === 1) {
                if (res.data.response.data.status == 1) {
                    yield put({
                        type: employeeConstant.EMPLOYEE_EMAIL_CHECK_RESPONSE,
                        payload: res.data.response.data.status,
                    })
                } else {
                    NotificationManager.error('Email Already Registered')
                    yield put({
                        type: employeeConstant.EMPLOYEE_EMAIL_CHECK_ERROR,
                        payload: { error: res.data.response.message },
                    })
                }
            } else {
                NotificationManager.error('Email Already Registered')
                yield put({
                    type: employeeConstant.EMPLOYEE_EMAIL_CHECK_ERROR,
                    payload: { error: res.data.response.message },
                })
            }
        } else {
            yield put({
                type: employeeConstant.EMPLOYEE_ERROR,
                payload: { error: 'Something went wrong' },
            })
        }
    } else {
        yield put({
            type: employeeConstant.EMPLOYEE_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function changeDateFormat(dates) {
    const newDate = new Date(dates)
    //console.log(newDate.toLocaleDateString());
    return newDate.toLocaleDateString()
}
function* actionEmployeeCountryWatcher() {
    yield takeEvery(employeeConstant.EMPLOYEE_COUNTRY_REQUEST, getCountryList)
}
function* actionEmployeeStateWatcher() {
    yield takeEvery(employeeConstant.EMPLOYEE_STATE_REQUEST, getStateList)
}
function* actionEmployeeCityWatcher() {
    yield takeEvery(employeeConstant.EMPLOYEE_CITY_REQUEST, getCityList)
}
function* actionEmployeeDesignationWatcher() {
    yield takeEvery(
        employeeConstant.EMPLOYEE_DESIGNATION_REQUEST,
        getDesignation
    )
}
function* actionEmployeeUpdateWatcher() {
    yield takeEvery(employeeConstant.EMPLOYEE_SAVE_REQUEST, employeeUpdate)
}
function* actionEmployeeListWatcher() {
    yield takeEvery(employeeConstant.EMP_LIST_REQUEST, getEmployeeList)
}
function* actionEmployeeProfileEditWatcher() {
    yield takeEvery(
        employeeConstant.EMPLOYEE_PROFILE_EDIT_REQUEST,
        getEmployeeProfileEditDetails
    )
}
function* actionEmployeeEditWatcher() {
    yield takeEvery(
        employeeConstant.EMPLOYEE_EDIT_REQUEST,
        getEmployeeEditDetails
    )
}
function* actionEmployeeActiveInactiveWatcher() {
    yield takeEvery(
        employeeConstant.EMPLOYEE_ACTIVEINACTIVE_REQUEST,
        employeeActiveInactive
    )
} //
function* actionEmployeeEmailCheckWatcher() {
    yield takeEvery(
        employeeConstant.EMPLOYEE_EMAIL_CHECK_REQUEST,
        employeeEmailCheck
    )
}
export default function* rootSaga() {
    yield all([
        actionEmployeeCountryWatcher(),
        actionEmployeeStateWatcher(),
        actionEmployeeCityWatcher(),
        actionEmployeeDesignationWatcher(),
        actionEmployeeUpdateWatcher(),
        actionEmployeeListWatcher(),
        actionEmployeeEditWatcher(),
        actionEmployeeProfileEditWatcher(),
        actionEmployeeActiveInactiveWatcher(),
        actionEmployeeEmailCheckWatcher(),
    ])
}
