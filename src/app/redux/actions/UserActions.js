import history from "../Store";
import { loginConstant, userConstant } from "app/constant/ActionTypes";
//import jwtAuthService from "../../services/jwtAuthService";

export const SET_USER_DATA = "USER_SET_DATA";
export const REMOVE_USER_DATA = "USER_REMOVE_DATA";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const userAction = {
  logoutUser,
  profileDialogOpen,
  profileDialogClose,
};
function profileDialogOpen() {
  return { type: userConstant.PROFILE_DIALOG_OPEN, payload: {} };
}
function profileDialogClose() {
  return { type: userConstant.PROFILE_DIALOG_CLOSE, payload: {} };
}
export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      data: user,
    });
  };
}

function logoutUser() {
  return { type: loginConstant.SIGNOUT, payload: {} };
  /*return (dispatch) => {
    //jwtAuthService.logout();
    localStorage.clear();
    history.push({
      pathname: "/session/signin",
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };*/
}
