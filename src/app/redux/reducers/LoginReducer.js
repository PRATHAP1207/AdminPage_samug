import { loginConstant } from "../../constant/ActionTypes";
const initialState = {
  success: false,
  loading: false,
  userId: 0,
  error: {
    username: null,
    password: null,
  },
  alertMessage: "",
  menuNumber:"",
  QrcodeGeneration:"",
  showMessage: false,
  initURL: "",
  userDetails: null,
  sessionLoginId: "0",
  loginTokenCreated:"",
  sessionLoginToken: "xcv",
  sessionName: "Guest",
  sessionUsername: "Guest",
  sessionEmpId: "0",
  sessionUserCompany: "Syneins",
  sessionEmpPath: "assets/images/avatar.png",
  sessionLoginStatus: false,
  tempPassword: "",
  confirmPassword: "",
  newPassword: "",
  tempPasswordError: "",
  confirmPasswordError: "",
  newPasswordError: "",
  messageError: false,
  messageSuccess: false,
  messageWarning: false,
  messages: "",
  username: "",
  password:"",
  authCode:"",
  passwordDialog: false,
  jwtToken: "",
  menuDetails: "",
  loginMenudetails:"",
};

const LoginReducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case loginConstant.DIALOG_CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        messages: "",
      };
    }

    case loginConstant.DIALOG_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        messageError: false,
        messageSuccess: true,
        messageWarning: false,
        messages: payload.error,
        passwordDialog: false,
        confirmPassword: "",
        newPassword: "",
      };
    }
    case loginConstant.DIALOG_CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        messageError: true,
        messageSuccess: false,
        messageWarning: false,
        messages: payload.error,
      };
    }
    case loginConstant.CHANGE_PASSWORD_OPEN: {
      return { ...state, passwordDialog: true };
    }
    case loginConstant.CHANGE_PASSWORD_CLOSE: {
      return { ...state, passwordDialog: false };
    }
    case loginConstant.LOGIN_REQUEST: {
    //  console.log("Login Reducer",payload)
      return {
        ...state,
        loading: true,
        payload: payload,
      };
    }
    case loginConstant.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        payload: payload,
        loading: true,
      };
    case loginConstant.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: payload,
        loading: false,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        messages: "",
      };
    case loginConstant.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        payload: payload,
        loading: true,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        messages: "",
      };
    case loginConstant.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loading: false,
        userId: 0,
        tempPassword: "",
        confirmPassword: "",
        newPassword: "",
        tempPasswordError: "",
        confirmPasswordError: "",
        newPasswordError: "",
      };
    case loginConstant.CHANGE_PASSWORD:
      return {
        ...state,
        isLoading: false,
        userId: payload.userId,
        loading: false,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        messages: "",
      };
    case loginConstant.LOGIN_INPUT_CHANGE:
      return {
        ...state,
        isLoading: false,
        [payload.prop]: payload.value,
        [payload.error]: "",
      };
    case loginConstant.LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case loginConstant.LOGIN_SUCCESS: {
      console.log("LoginDetails",payload);
      return {
        ...state,
        success: true,
        loading: false,
        userDetails: payload,
        sessionLoginId: payload.loginId,
        loginTokenCreated:payload.response.data.token,
        loginMenudetails:payload.response.data.menuDetails,
        menuNumber:payload.response.data.menuUid,

        sessionLoginToken: payload.loginToken,
        sessionName: payload.name,
        sessionUsername: payload.username,
        sessionEmpId: payload.employeeId,
        sessionEmpPath: payload.profileImage,
        sessionLoginStatus: true,
        menuDetails: payload.menuDetails,
      };
    }
    case loginConstant.UPDATE_USER_DATA_DETAILS: {
      return {
        ...state,
        success: true,
        loading: false,
        userDetails: payload,
        sessionLoginId: payload.loginId,
        sessionLoginToken: payload.loginToken,
        sessionName: payload.name,
        sessionUsername: payload.username,
        sessionEmpId: payload.employeeId,
        sessionEmpPath: payload.profileImage,
        sessionLoginStatus: true,
        jwtToken: payload.token,
        userId: payload.loginId,
      };
    }
    case loginConstant.RESET_PASSWORD: {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case loginConstant.LOGIN_ERROR: {
      return {
        success: false,
        loading: false,
        error: payload.error,

        messageError: true,
        messageSuccess: false,
        messageWarning: false,
        messages: payload.error,
      };
    }
    case loginConstant.LOGIN_REQUEST_AUTHGET:
      return{
        ...state,
           loading:true,
           payload:payload

      }
      case loginConstant.SUCCESS_AUTHENTICATION:
        return{
          ...state,

          loading:false,
          QrcodeGeneration:payload
        }
        case loginConstant.GET_USER_DETAILS_AUTH:
          return{
            ...state,
            loading:true,
          }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
