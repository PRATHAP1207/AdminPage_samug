import { all, call, put, takeEvery } from 'redux-saga/effects'
import { userTreeConstant, Graph } from '../../constant/ActionTypes'
import axios from 'axios'
import {
    API_URL,
    API_URL_LOGIN,
    GETMEMBER,
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
    GETALLCOUNTRY,
    GETCOUNTRYDATA,
} from '../../constant/Common'
import { NotificationManager } from 'react-notifications'
import Moment from "moment";
const localStorageToken = localStorage.getItem('tokenId');
function changeDateFormat(dates) {
    const newDate = new Date(dates)
    //console.log(newDate.toLocaleDateString());
    // return newDate.toLocaleDateString();
    return Moment(newDate).format('YYYY-MM-DD')
}
function* getDetailsMember(payload) {
     console.log("getSagaDetails",payload)
    let form = new FormData()
    form.append('mode', payload.payload.Details.searchRoleInTree)
    form.append('searchId', payload.payload.Details.searchdetails)
    var res = yield axios
        .post(API_URL.api + GETMEMBER, form, {
            headers: {
                //  "Content-Type": "application/x-www-form-urlencoded",
                'access-control-allow-credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${
                    (payload.payload.loginToken.loginTokenCreated == '' && payload.payload.loginToken.loginTokenCreated) ||
                    localStorageToken
                }`,
                Accept: 'application/json',
                //"Access-Control-Allow-Origin": "http://localhost:3000/"
                'Access-Control-Allow-Headers': 'Authorization',
            },
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
        if (res.status === 401) {

            NotificationManager.error("Unauthorized Access");
            yield put({
              type: userTreeConstant.TREE_ERROR,
              payload: { error: "Something went wrong" },
            });
            return;
          }
   // console.log('getscsdcsdcsdc', res.data.response.data.details.parent)
    if (res.status === 200) {
        if (
            res.data.response.status === 1 &&
            res.data.response.data.details.parent != null &&
            res.data.response.data.details.parent != ''
        ) {
            yield put({
                type: userTreeConstant.GET_MEMBER_DETAILS_SUCCESS,
                payload: res.data.response.data.details,
            })
        } else {
            NotificationManager.error('it is not a member/it is Root')
            yield put({
                type: userTreeConstant.ERROR_IN_SEARCH,
                payload: '',
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            // type: employeeConstant.EMPLOYEE_ERROR,
            // payload: { error: "Something went wrong" },
        })
    }
}

function* getDetailsForMemberInTree() {
    yield takeEvery(userTreeConstant.GETDETAILSFORTREE, getDetailsMember)
}

function* getMemberparent(payload) {
    console.log("csdcs",payload)
    if (payload.payload.event.id != '1') {
        let form = new FormData()
        form.append('mode', '1')
        form.append('searchId',payload.payload.event.id)
        var res = yield axios
            .post(API_URL.api + GETMEMBER, form, {
                headers: {
                    //  "Content-Type": "application/x-www-form-urlencoded",
                    'access-control-allow-credentials': true,
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: `Bearer ${
                        (payload.payload.loginToken.loginTokenCreated == '' && payload.payload.loginToken.loginTokenCreated) ||
                        localStorageToken
                    }`,
                    Accept: 'application/json',
                    //"Access-Control-Allow-Origin": "http://localhost:3000/"
                    'Access-Control-Allow-Headers': 'Authorization',
                },
            })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response
            })
            if (res.status === 401) {

                NotificationManager.error("Unauthorized Access");
                yield put({
                  type: userTreeConstant.TREE_ERROR,
                  payload: { error: "Something went wrong" },
                });
                return;
              }
        // console.log("getscsdcsdcsdc",res.data.response.data.details);
        if (res.status === 200) {
            if (res.data.response.status === 1) {
                yield put({
                    type: userTreeConstant.GET_MEMBER_DETAILS_SUCCESS,
                    payload: res.data.response.data.details,
                })
            } else {
                yield put({
                    //   type: employeeConstant.EMPLOYEE_ERROR,
                    //   payload: { error: res.data.response.message },
                })
            }
        } else {
            NotificationManager.error(res.message)
            yield put({
                // type: employeeConstant.EMPLOYEE_ERROR,
                // payload: { error: "Something went wrong" },
            })
        }
    } else {
        NotificationManager.error('Which is the Root Further Cant Move')
        yield put({
            type: userTreeConstant.ERROR_IN_SEARCH,
            payload: '',
        })
    }
}
function* getTableData(payload) {
    const prop = payload.payload
    let form = new FormData()
    form.append('countryUid', prop.CountryChange)
    form.append('mode', prop.optionChange)
    form.append('year', prop.Year)
    form.append('month', prop.month)
    form.append('fromdate', changeDateFormat(prop.fromInputDate))
    form.append('todate', changeDateFormat(prop.toInputDate))
    var res = yield axios
        .post(API_URL.api + GETALLCOUNTRY, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
        if (res.status === 401) {

            NotificationManager.error("Unauthorized Access");
            yield put({
              type: userTreeConstant.TREE_ERROR,
              payload: { error: "Something went wrong" },
            });
            return;
          }
    if (res.status === 200) {
        //  console.log(res)
        if (res.data.response.status === 1) {
           //  console.log("response 200",res.data.response)
            // sessionStorage.setItem("tableListData",JSON.stringify(res.data.response));
            localStorage.setItem(
                'storageTableListData',
                JSON.stringify(res.data.response)
            )
            yield put({
                type: Graph.DISPLAY_TABLE_LIST,
                payload: res.data.response,
            })
        } else {
            yield put({
                type: Graph.COUNTRY_ERROR,
                payload: { error: res.data.response.message },
            })
        }

    } else {
        NotificationManager.error(res.message)
        yield put({
            type: Graph.COUNTRY_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* getCountry(payload) {
    //  console.log("saga country",payload)

    let form = new FormData()
    form.append('userId', payload.payload.userId)
    var res = yield axios
        .post(API_URL.api + GETCOUNTRYDATA, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
        if (res.status === 401) {

            NotificationManager.error("Unauthorized Access");
            yield put({
              type: userTreeConstant.TREE_ERROR,
              payload: { error: "Something went wrong" },
            });
            return;
          }
    if (res.status === 200) {
        if (res.data.response.status === 1) {
            //   console.log("response 200 first",res.data.response.data)
            yield put({
                type: Graph.DISPLAY_COUNTRY_LIST,
                payload: res.data.response.data,
            })
        } else {
            yield put({
                type: Graph.COUNTRY_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: Graph.COUNTRY_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* getmemberFromParent() {
    yield takeEvery(userTreeConstant.GET_MEMBER_FROM_PARENT, getMemberparent)
}
function* actionCountry() {
    yield takeEvery(Graph.GET_COUNTRY_LIST, getCountry)
}
function* tableDataGraph() {
    yield takeEvery(Graph.GET_TABLE_LIST, getTableData)
}
export default function* rootSaga() {
    yield all([
        getDetailsForMemberInTree(),
        getmemberFromParent(),
        actionCountry(),
        tableDataGraph(),
    ])
}
