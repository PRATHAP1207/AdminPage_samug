import { all, call, put, takeEvery } from 'redux-saga/effects'
import { FilesUpload } from '../../constant/ActionTypes'
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
    SAMUGUSERLIST,
    SAMUGFILEUPLOAD,
} from '../../constant/Common'
import { NotificationManager } from 'react-notifications'
import Moment from 'moment'

function* getSamugUserListRequest(payload) {
    //  console.log("saga country",payload)

    let form = new FormData()
    form.append('userId', 0)
    var res = yield axios
        .post(API_URL.api + SAMUGUSERLIST, form, {
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
        // yield put({
        //   type: employeeConstant.EMPLOYEE_ERROR,
        //   payload: { error: "Something went wrong" },
        // });
        return
    }
    if (res.status === 200) {
        if (res.data.response.status === 1) {
            //   console.log("response 200 first",res.data.response.data)
            yield put({
                type: FilesUpload.SAMUGUSER_LIST_REQSPONSE,
                payload: res.data.response.data,
            })
        } else {
            yield put({
                type: FilesUpload.SAMUGUSER_ERROR,
                payload: { error: res.data.response.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: FilesUpload.SAMUGUSER_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* saveSamugFileRequest(pay) {
    let payload = pay.payload
    //console.log(payload)
    // return;
    let personalTag = payload.postPersonalTag.map((item, i) => {
        return { tagId: parseInt(item.id), tagName: item.name }
    })
    let postExclusive = payload.postExclusive.map((item, i) => {
        return { tagId: parseInt(item.id), tagName: item.name }
    })
    let postZamugTag = payload.postZamugTag.map((item, i) => {
        return { tagId: parseInt(item.id), tagName: item.name }
    })

    let form = new FormData()
    form.append('userId', payload.userId)
    form.append('countryUid', payload.countryUid)
    form.append('accountType', payload.accountType)
    form.append('postStatus', payload.postStatus)
    form.append('postDetails', payload.postDetails)
    form.append('postPersonalTag', JSON.stringify(personalTag))
    form.append('postExclusive', JSON.stringify(postExclusive))
    form.append('postZamugTag', JSON.stringify(postZamugTag))
    form.append(
        'postFilesThumbnail',
        JSON.stringify(payload.postFilesThumbnail)
    )
    for (let i = 0; i < payload.employeeImage.length; i++) {
        form.append(`employeeImage[${i}]`, payload.employeeImage[i])
    }
    //form.append('employeeImage', payload.employeeImage)
    var res = yield axios
        .post(API_URL.api + SAMUGFILEUPLOAD, form, {
            headers: headers1,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })
    if (res.status === 401) {
        NotificationManager.error('Unauthorized Access')
        // yield put({
        //   type: employeeConstant.EMPLOYEE_ERROR,
        //   payload: { error: "Something went wrong" },
        // });
        return
    }
    if (res.status === 200) {
        //if (res.data.response.status === 1) {
        //   console.log("response 200 first",res.data.response.data)
        NotificationManager.success('Successfully Updated')
        yield put({
            type: FilesUpload.SAMUG_FILE_UPLOAD_CLOSE,
            payload: {},
        })

        yield put({
            type: FilesUpload.SAMUG_FILE_UPLOAD_RESPONSE,
            payload: {},
        })
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: FilesUpload.SAMUGUSER_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* getSamugUserList() {
    yield takeEvery(FilesUpload.SAMUGUSER_LIST_REQUEST, getSamugUserListRequest)
}
function* saveSamugFile() {
    yield takeEvery(FilesUpload.SAMUG_FILE_UPLOAD_REQUEST, saveSamugFileRequest)
}
export default function* rootSaga() {
    yield all([getSamugUserList(), saveSamugFile()])
}
