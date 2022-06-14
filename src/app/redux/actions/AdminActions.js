import { adminConstant } from "app/constant/ActionTypes";
export const adminAction = {
  adminInputChange,
  adminRoleListRequest,
  adminReset,
  openNewPopUp,
  openEditPopUp,
  newRoleUpdate,
  closePopup,
  rolesActiveInactive,
};
//ADMIN_NEW_POPUP
//ADMIN_EDIT_POPUP
//ADMIN_NEW_REQUEST
//ADMIN_NEW_RESPONSE
function rolesActiveInactive(payload) {
  return { type: adminConstant.ADMIN_ROLES_STATUS_REQUEST, payload: payload };
}
function closePopup() {
  return { type: adminConstant.ADMIN_POPUP_CLOSE, payload: {} };
}
function newRoleUpdate(payload) {
  return { type: adminConstant.ADMIN_NEW_REQUEST, payload: payload };
}
function openEditPopUp(payload) {
  return { type: adminConstant.ADMIN_EDIT_POPUP, payload: payload };
}
function openNewPopUp(payload) {
 // console.log(payload);

  return { type: adminConstant.ADMIN_NEW_POPUP, payload: {} };
}
function adminReset() {
  return { type: adminConstant.ADMIN_RESET, payload: {} };
}
function adminRoleListRequest(payload) {
  return {
    type: adminConstant.ADMIN_ROLE_LIST_REQUEST,
    payload: payload,
  };
}
function adminInputChange({ prop, value, error }) {
  return {
    type: adminConstant.ADMIN_INPUT_CHANGE,
    payload: { prop, value, error },
  };
}
