import { adminConstant } from 'app/constant/ActionTypes'
import { loginConstant } from "../../constant/ActionTypes";
export const ADMIN_INITIAL_STATE = {
    loader: false,
    roleName: '',
    rolesBackUp:localStorage.getItem('tokenId'),
    rolesList: [],
    menuList: [],
    statusUpdate:"",
    sessionLoginToken:"",
    listStatus: '1',
    popupStatus: false,
    rolesId: 0,
    selectedRoles: [],
}
export default (state = ADMIN_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case adminConstant.ADMIN_ROLES_STATUS_REQUEST: {
            return { ...state, loader: true }
        }
        case adminConstant.ADMIN_ROLES_STATUS_RESPONSE: {
            return {
                ...state,
                loader: false,
                rolesList: payload.roleList,
                menuList: payload.menuList,
             
                popupStatus: false,

            }
        }
        case adminConstant.ADMIN_EDIT_POPUP: {
         
            return {
                ...state,
                rolesId: payload.uid,
                roleName: payload.rolesName,
                selectedRoles:
                    payload.menuDetails != ''
                        ? payload.menuDetails.split(',')
                        : [],
                popupStatus: true,
            }
        }
        case adminConstant.ADMIN_NEW_REQUEST: {
            return { ...state, loader: true, popupStatus: true }
        }
        case adminConstant.ADMIN_POPUP_CLOSE: {
            return { ...state, loader: false, popupStatus: false }
        }
        case adminConstant.ADMIN_NEW_POPUP: {
            return {
                ...state,
                loader: false,
                popupStatus: true,
                rolesId: payload.rolesId,
                roleName:"",
                selectedRoles:[],
            }
        }
        case adminConstant.ADMIN_ERROR: {
            return { ...state, loader: false }
        }
        
        case adminConstant.ADMIN_ERROR_UNAUTH: {
           // localStorage.clear();
          //  window.location.reload();
            return { ...state, loader: false }
        }

        case adminConstant.ADMIN_ROLE_LIST_REQUEST: {
            return { ...state, loader: true, rolesList: [], menuList: [] }
        }
        case adminConstant.ADMIN_ROLE_LIST_RESPONSE: {
            return {
                ...state,
                loader: false,
                rolesList: payload.roleList,
                menuList: payload.menuList,
                
               
            }
        }
        case adminConstant.ADMIN_NEW_RESPONSE: {
            return {
                ...state,
                loader: false,
                rolesList: payload.roleList,
                menuList: payload.menuList,
                popupStatus: false,
            }
        }
        //
        case adminConstant.ADMIN_INPUT_CHANGE:
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
                loader: false,
            }
        case adminConstant.ADMIN_ROLE_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case adminConstant.ADMIN_ROLE_RESPONSE:
            return {
                ...state,
                loader: false,
                menuList: payload.menu,
            }
            case loginConstant.LOGIN_SUCCESS: {
                return {
                  ...state,
                  success: true,
                  loading: false,
                  sessionLoginToken: payload.loginToken,
                
                };
              }
        default:
            return state
    }
}
