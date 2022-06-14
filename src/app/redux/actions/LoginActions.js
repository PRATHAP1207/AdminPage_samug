import { setUserData } from "./UserActions";

import { loginConstant } from "../../constant/ActionTypes";

export const loginAction = {
  updateUserData,
  userLogin,
  loginInputChange,
  resetPassword,
  changePasswordRequest,
  forgetPassword,
  signout,
  changePasswordDialogOpen,
  changePasswordDialogClose,
  dialogChangePasswordRequest,
  userLoginAuthenticator,
  getUserInformation


};
function updateUserData(payload) {
  var pay = JSON.parse(payload);
  return {
    type: loginConstant.UPDATE_USER_DATA_DETAILS,
    payload: pay,
  };
}
function dialogChangePasswordRequest({ newPassword, confirmPassword, userId }) {
  if (newPassword === confirmPassword) {
    return {
      type: loginConstant.DIALOG_CHANGE_PASSWORD_REQUEST,
      payload: { newPassword, confirmPassword, userId },
    };
  } else {
    return {
      type: loginConstant.DIALOG_CHANGE_PASSWORD_ERROR,
      payload: { message: "Password Mismatch" },
    };
  }
}
function changePasswordDialogOpen() {
  return { type: loginConstant.CHANGE_PASSWORD_OPEN, payload: {} };
}
function changePasswordDialogClose() {
  return { type: loginConstant.CHANGE_PASSWORD_CLOSE, payload: {} };
}
function signout() {
  return { type: loginConstant.SIGNOUT, payload: {} };
}
function forgetPassword(payload) {
  return { type: loginConstant.FORGET_PASSWORD_REQUEST, payload: payload };
}
function changePasswordRequest(payload) {
  return { type: loginConstant.CHANGE_PASSWORD_REQUEST, payload: payload };
}
function loginInputChange({ prop, value, error }) {
  return {
    type: loginConstant.LOGIN_INPUT_CHANGE,
    payload: { prop, value, error },
  };
}
function userLogin(payload) {
 // console.log("loginAction",payload)
  return { type: loginConstant.LOGIN_REQUEST, payload: payload };
}

function userLoginAuthenticator(payload) {
  //console.log("loginAction",payload)
   return { type: loginConstant.LOGIN_REQUEST_AUTHGET, payload: payload };
 }

 function getUserInformation(props){
   return{
     type:loginConstant.GET_USER_DETAILS_AUTH,
     payload:props
   }
 }
/*export function loginWithEmailAndPassword1({ email, password }) {
  return (dispatch) => {
    dispatch({
      type: loginConstant.LOGIN_LOADING,
    });

    jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserData(user));

        history.push({
          pathname: "/",
        });

        return dispatch({
          type: loginConstant.LOGIN_SUCCESS,
        });
      })
      .catch((error) => {
        return dispatch({
          type: loginConstant.LOGIN_ERROR,
          payload: error,
        });
      });
  };
}
*/

function resetPassword({ email }) {
  return { type: loginConstant.RESET_PASSWORD, payload: email };
}
/*export function firebaseLoginEmailPassword({ email, password }) {
  return (dispatch) => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user,
            })
          );

          history.push({
            pathname: "/",
          });

          return dispatch({
            type: loginConstant.LOGIN_SUCCESS,
          });
        } else {
          return dispatch({
            type: loginConstant.LOGIN_ERROR,
            payload: "Login Failed",
          });
        }
      })
      .catch((error) => {
        return dispatch({
          type: loginConstant.LOGIN_ERROR,
          payload: error,
        });
      });
  };
}*/


