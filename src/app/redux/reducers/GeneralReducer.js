import { generalConstant } from "app/constant/ActionTypes";


export const GENERAL_INITIAL_STATE = {
  alertMessage: "",
  showSuccessAlert: false,
  showErrorAlert: false,
  showInfoAlert: false,
  showWarningAlert: false,
  loading: false,
};

export default (state = GENERAL_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case generalConstant.GET_ERROR:
      return { ...state, loading: false };
    case generalConstant.GET_ERROR_MESSAGE:
      return {
        ...state,
        showErrorAlert: true,
        showSuccessAlert: false,
        showInfoAlert: false,
        showWarningAlert: false,
        alertMessage: payload,
      };
    case generalConstant.GET_INFO_MESSAGE:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: true,
        showWarningAlert: false,
        alertMessage: payload,
      };
    case generalConstant.GET_SUCCESS_MESSAGE:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: true,
        showInfoAlert: false,
        showWarningAlert: false,
        alertMessage: payload,
      };
    case generalConstant.GET_WARNING_MESSAGE:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        showWarningAlert: true,
        alertMessage: payload,
      };
    case generalConstant.CLEAR_ALL_MESSAGE:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        showWarningAlert: false,
        alertMessage: "",
      };
    default:
      return state;
  }
};
