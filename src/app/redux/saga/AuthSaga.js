import { all, call, fork, put, takeEvery, apply } from 'redux-saga/effects'
import { loginConstant, generalConstant } from '../../constant/ActionTypes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    API_URL_LOGIN,
    API_URL,
    LOGIN_API,
    PASS_UP,
    headers,
    headers1,
    FWT_PASS,
    CANG_PASS,
    LOGIN_AUTH,
    generalFunction,
    loginheaders,
} from '../../constant/Common'
import { LOGIN_ERROR } from '../../constant/ErrorConstant'
//import { reactLocalStorage } from "reactjs-localstorage";
import { NotificationManager } from 'react-notifications'
function* userSignProcess(prop) {
   // console.log('sagauser', prop)
    let data = prop.payload
    const form = new FormData()
    form.set('username', data['username'])
    form.set('password', data['password'])
    var res = yield axios
        .post(API_URL_LOGIN.api + LOGIN_API, form, {
            headers: loginheaders,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })

    if (res.status === 200) {
       // history.push('/')
        res = res.data.response
        if (res.status === 1) {
            localStorage.setItem('user_id', res.data.loginId)
            localStorage.setItem('tokenId', res.data.token)
            localStorage.setItem('auth_user', JSON.stringify(res.data))
            sessionStorage.setItem('tokenId', res.data.token)
          //  console.log('sagaput', res.data)
            yield put({
                type: loginConstant.LOGIN_SUCCESS,
                payload: res.data,
            })
        } else if (res.status === 100) {
            yield put({
                type: loginConstant.CHANGE_PASSWORD,
                payload: res.data,
            })
          //  yield call(history.push, '/sess/cngPass')
        } else {
            NotificationManager.error(res.message)
            yield put({
                type: loginConstant.LOGIN_ERROR,
                payload: { error: res.message },
            })
        }
    } else {
        NotificationManager.error(res.message)
        yield put({
            type: loginConstant.LOGIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* passwordUpdate(prop) {
    let data = prop.payload
  //  console.log(data)

    const form = new FormData()
    form.set('tempPassword', data['tempPassword'])
    form.set('newPassword', data['newPassword'])
    form.set('confirmPassword', data['confirmPassword'])
    form.set('userId', data['userId'])
    var res = yield axios
        .post(API_URL_LOGIN.api + PASS_UP, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })

    if (res.status === 200) {
        res = res.data.response

        if (res.status === 1) {
            yield put({
                type: loginConstant.CHANGE_PASSWORD_SUCCESS,
                payload: { error: res.message },
            })
         //   yield call(history.push, '/session/signin')
        } else {
            yield put({
                type: loginConstant.LOGIN_ERROR,
                payload: { error: res.message },
            })
        }
    } else {
        yield put({
            type: loginConstant.LOGIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}

function* forgetPasswordUpdate(prop) {
    let data = prop.payload
    const form = new FormData()
    form.set('username', data['username'])

    var res = yield axios
        .post(API_URL_LOGIN.api + FWT_PASS, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })

    if (res.status === 200) {
        res = res.data.response

        if (res.status === 1) {
            yield put({
                type: loginConstant.CHANGE_PASSWORD_SUCCESS,
                payload: { error: res.message },
            })
          //  yield call(history.push, '/session/signin')
        } else {
            yield put({
                type: loginConstant.LOGIN_ERROR,
                payload: { error: res.message },
            })
        }
    } else {
        yield put({
            type: loginConstant.LOGIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
    }
}
function* dialogPassUp(prop) {
    let data = prop.payload
    const form = new FormData()
    form.set('confirmPassword', data['confirmPassword'])
    form.set('newPassword', data['newPassword'])
    form.set('userId', data['userId'])
    var res = yield axios
        .post(API_URL.api + CANG_PASS, form, {
            headers: headers,
        })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err.response
        })

    if (res.status === 200) {
        res = res.data.response

        if (res.status === 1) {
            yield put({
                type: loginConstant.DIALOG_CHANGE_PASSWORD_SUCCESS,
                payload: { error: res.message },
            })
            NotificationManager.success(res.message)
        } else {
            yield put({
                type: loginConstant.DIALOG_CHANGE_PASSWORD_ERROR,
                payload: { error: res.message },
            })
            NotificationManager.error(res.message)
        }
    } else {
        yield put({
            type: loginConstant.LOGIN_ERROR,
            payload: { error: 'Something went wrong' },
        })
        NotificationManager.error('Something went wrong')
    }
}
function* signout() {
   // console.log('Signout called')
    localStorage.clear()
  //  yield call(history.push, '/', '')
}


function* getTwoFactorAuthentication(props) {
      let form = new FormData();
      form.append("username",props.payload.username);
      form.append("password",props.payload.password);
      var res = yield axios
    .post(API_URL_LOGIN.api + LOGIN_AUTH, form, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
    console.log("get Auth COde",res);
    if (res.status === 401) {
      NotificationManager.error("Unauthorized Access");
      yield put({
        type:loginConstant.AUTH_ERROR,
        payload: { error: "Something went wrong" },
      });
      return;
    }
  if (res.status === 200) {
  // console.log("response 200 dhan table", res.data.response.status)
       if (res.data.response.status == 1) {
         yield put({
          type:loginConstant.SUCCESS_AUTHENTICATION,
          payload:res.data.response.data.qrCode,
         });
         props.payload.navigation('/session/LoginConfirm');
        }
         else if (res.data.response.status == 2){
            NotificationManager.error("Please Enter Valid Details");
            //props.payload.navigation('/session/LoginConfirm')
         }
        else {
            NotificationManager.error("Please Check the Details");
           // props.payload.navigation('/session/signin')
       }
 //  props.payload.navigation('/session/LoginConfirm')
  } else {
    NotificationManager.error("Unauthorized User");
    // yield put({
    //   type: loginConstant.COUNTRY_ERROR,
    //   payload: { error: "Something went wrong" },
    // });
  }
  
}



// function* getTwoFactorAuthentication(props) {
//      try {
//        let form = new FormData();
//        form.append("username",props.payload.username);
//        form.append("password",props.payload.password);
//        var response = yield axios
//          .request({
//            method: "post",
//            url: "https://content.bitsmind.com/Login/loginPage",
//            data:form,
//            headers: "",
          
//          })
//          .then((res) => {
//             console.log("ACTIVE", res);
//            return res;
//          })
//          .catch((err) => console.log(err));
//          console.log("dvdv",response);
//         if (response.status === 200) {
//        if (response.data.data.status == 1) {
//          yield put({
//           type:loginConstant.SUCCESS_AUTHENTICATION,
//           payload:response.data.data.qrCode,
//          });
//          props.payload.navigation('/session/LoginConfirm')
         
//         } else if (response.data.data.status == 2){
//         props.payload.navigation('/session/LoginConfirm')
//          }
//         else {
//             NotificationManager.error("Unauthorized User");
//             props.payload.navigation('/session/signin')
//        }
//     }else{
//         NotificationManager.error("Please ENter Valid Details");
//     }
//      } catch (error) {
//        console.log(error);
//      }
//    }


   function* getDetailsAfterAuth(props) {
       console.log("WelcomeTO saga",props);
    try {
      let form = new FormData();
      form.append("username",props.payload.userDetails.username);
      form.append("password",props.payload.userDetails.password);
      form.append("code",props.payload.userDetails.authCode);
      var response = yield axios
        .request({
          method: "post",
          url: "https://content.bitsmind.com/Login/confirm_google_auth",
          data:form,
          headers: "",
         
        })
        .then((res) => {
           console.log("ACTIVE", res);
          return res;
        })
        .catch((err) => console.log(err));
        console.log("dvdv",response);
       if (response.status === 200) {
        localStorage.setItem(
            'tokenId',
            response.data.userdetails.loginToken
        )
        props.payload.navigation('/');
   }else{
       NotificationManager.error("Please ENter Valid Details");
   }
    } catch (error) {
      console.log(error);
    }
  }
function* actionLoginRequestWatcher() {
   // console.log('ssdvdsvdsvdsvssvsvvsvs')
    yield takeEvery(loginConstant.LOGIN_REQUEST, userSignProcess)
}
function* actionChangePasswordRequestWatcher() {
    yield takeEvery(loginConstant.CHANGE_PASSWORD_REQUEST, passwordUpdate)
}
function* actionForgetPasswordWatcher() {
    yield takeEvery(loginConstant.FORGET_PASSWORD_REQUEST, forgetPasswordUpdate)
}
function* actionSignOutWatcher() {
    yield takeEvery(loginConstant.SIGNOUT, signout)
}
function* actionDialogChangePasswordWatcher() {
    yield takeEvery(loginConstant.DIALOG_CHANGE_PASSWORD_REQUEST, dialogPassUp)
}

function* getTwoFactorAuthenticationCode() {
    yield takeEvery(loginConstant.LOGIN_REQUEST_AUTHGET, getTwoFactorAuthentication)
}

function* getUserDetailsAuth() {
    yield takeEvery(loginConstant.GET_USER_DETAILS_AUTH, getDetailsAfterAuth)
}

export default function* rootSaga() {
    yield all([
        actionLoginRequestWatcher(),
        actionChangePasswordRequestWatcher(),
        actionForgetPasswordWatcher(),
        actionSignOutWatcher(),
        actionDialogChangePasswordWatcher(),
        getTwoFactorAuthenticationCode(),
        getUserDetailsAuth(),
    ])
}
