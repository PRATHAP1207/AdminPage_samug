import { loginConstant, userConstant } from "app/constant/ActionTypes";
import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  USER_LOGGED_OUT,
} from "../actions/UserActions";

const initialState = {
  profileDialog: false,
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case loginConstant.SIGNOUT: {
      return { ...state };
    }
    case userConstant.PROFILE_DIALOG_OPEN: {
      return {
        ...state,
        profileDialog: true,
      };
    }
    case userConstant.PROFILE_DIALOG_CLOSE: {
      return {
        ...state,
        profileDialog: false,
      };
    }
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state,
      };
    }
    case USER_LOGGED_OUT: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
