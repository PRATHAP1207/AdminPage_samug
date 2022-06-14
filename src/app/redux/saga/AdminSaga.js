import { all, call, put, takeEvery } from 'redux-saga/effects'
import { adminConstant } from 'app/constant/ActionTypes'
import axios from 'axios'
import {
    API_URL,
    API_URL_LOGIN,
    GETCOUNTRY,
    headers,
    headers1,
    ROL_LIST,
    loginheaders,
    ROL_UP,
    ROL_STS,
} from '../../constant/Common'
import { NotificationManager } from 'react-notifications'
import Moment from 'moment'
const localStorageToken = localStorage.getItem('tokenId')
function* getRoleList(payload) {
    let prop = payload.payload
    const form = new FormData()
    form.append('status', prop.listStatus)
    form.append('userId', prop.userId)
    var res = yield axios
        .post(API_URL.api + ROL_LIST, form, {
            headers: {
                //  "Content-Type": "application/x-www-form-urlencoded",
                'access-control-allow-credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${
                    (prop.loginTokenCreated == '' && prop.loginTokenCreated) ||
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

    if (res.status == 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: adminConstant.ADMIN_ERROR_UNAUTH,
            payload: { error: 'Something went wrong' },
        })
        return
    }

    if (res.status === 200) {
        if (res.data.response.status === 1) {
            yield put({
                type: adminConstant.ADMIN_ROLE_LIST_RESPONSE,
                payload: res.data.response.data.roles,
            })
        } else {
            yield put({
                type: adminConstant.ADMIN_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: adminConstant.ADMIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* updateRoleMenu(payload) {
    let prop = payload.payload
    const form = new FormData()
    form.append('selectedRoles', prop.selectedRoles)
    form.append('roleName', prop.roleName)
    form.append('roleId', prop.rolesId)
    form.append('status', prop.listStatus)
    form.append('userId', prop.userId)
    var res = yield axios
        .post(API_URL.api + ROL_UP, form, {
            headers: {
                //  "Content-Type": "application/x-www-form-urlencoded",
                'access-control-allow-credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${
                    (prop.loginTokenCreated == '' && prop.loginTokenCreated) ||
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

    if (res.status == 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: adminConstant.ADMIN_ERROR_UNAUTH,
            payload: { error: 'Something went wrong' },
        })
        return
    }

    if (res.status === 200) {
        if (res.data.response.status === 1) {
            NotificationManager.success('Successfully Updated')
            yield put({
                type: adminConstant.ADMIN_NEW_RESPONSE,
                payload: res.data.response.data.roles,
            })
        } else {
            yield put({
                type: adminConstant.ADMIN_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: adminConstant.ADMIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* adminRolesStatus(payload) {
    let prop = payload.payload
    const form = new FormData()
    form.append('roleId', prop.roleId)
    form.append('status', prop.status)
    form.append('userId', prop.userId)
    var res = yield axios
        .post(API_URL.api + ROL_STS, form, {
            headers: {
                //  "Content-Type": "application/x-www-form-urlencoded",
                'access-control-allow-credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                Authorization: `Bearer ${
                    (prop.loginTokenCreated == '' && prop.loginTokenCreated) ||
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

    if (res.status == 401) {
        NotificationManager.error('Unauthorized Access')
        yield put({
            type: adminConstant.ADMIN_ERROR_UNAUTH,
            payload: { error: 'Something went wrong' },
        })
        return
    }

    if (res.status === 200) {
        if (res.data.response.status === 1) {
            yield put({
                type: adminConstant.ADMIN_NEW_RESPONSE,
                payload: res.data.response.data.roles,
            })
        } else {
            yield put({
                type: adminConstant.ADMIN_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: adminConstant.ADMIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* adminMenuRequestWatcher() {
    yield takeEvery(adminConstant.ADMIN_ROLE_LIST_REQUEST, getRoleList)
}
function* adminRoleUpdateWatcher() {
    yield takeEvery(adminConstant.ADMIN_NEW_REQUEST, updateRoleMenu)
}
function* adminRolesStatusWatcher() {
    yield takeEvery(adminConstant.ADMIN_ROLES_STATUS_REQUEST, adminRolesStatus)
}
export default function* rootSaga() {
    yield all([
        adminMenuRequestWatcher(),
        adminRoleUpdateWatcher(),
        adminRolesStatusWatcher(),
    ])
}
