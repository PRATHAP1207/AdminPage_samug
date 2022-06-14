import { moderatorConstant } from 'app/constant/ActionTypes'

export const MODERATOR_INITIAL_STATE = {
    loader: false,
    messageError: false,
    messageSuccess: false,
    messageWarning: false,
    moderatorList: [],
    countryList: [],
    countryId: 101,
    reportType: 1,
    fromDate: new Date(),
    toDate: new Date(),
    dateEnable: false,
    viewData: '',
    userZamugDatails: '',
    userZamugPostList: [],
    pageSize: 0,
    requestTime: 0,
    baseUrl: '',
    searchId: '',
    videoCdnUrl: '',
    cdnUrl: '',
}

export default (state = MODERATOR_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case moderatorConstant.MODERATOR_STATUS_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case moderatorConstant.MODERATOR_STATUS_RESPONSE:
            return {
                ...state,
                loader: false,
            }
        case moderatorConstant.MODERATOR_LOAD_MORE_REQUEST:
            return {
                ...state,
                loader: true,
            }
        case moderatorConstant.MODERATOR_RECORD_VIEW_RESPONSE:
            let posts = state.userZamugPostList
            if (payload.zamugPost != '') {
                var abc = state.userZamugPostList.concat(payload.zamugPost)
                posts = abc.map((person, index) => person)
            }
           // console.log(posts)
            return {
                ...state,
                loader: false,
                userZamugDatails:
                    payload.userDetails != ''
                        ? payload.userDetails
                        : state.userZamugDatails,
                userZamugPostList: posts,
                /* payload.zamugPost != ""
            ? state.userZamugPostList.concat(payload.zamugPost)
            : state.userZamugPostList,*/

                // [...state.userZamugPostList, ...payload.zamugPost],
                /* state.userZamugPostList.length != 0
            ? [...state.userZamugPostList, ...payload.zamugPost]
            : payload.zamugPost,*/
                pageSize: payload.nextPage,
                requestTime: payload.requestTime,
                baseUrl: payload.baseUrl,
                videoCdnUrl: payload.videoCdnUrl,
                cdnUrl: payload.cdnUrl,
            }
        case moderatorConstant.MODERATOR_RECORD_VIEW_REQUEST:
            return {
                ...state,
                loader: true,
                viewData: payload,
                userZamugPostList: [],
                pageSize: 0,
                requestTime: 0,
                userZamugDatails: '',
            }
        case moderatorConstant.MODERATOR_ERROR:
            return {
                ...state,
                loader: false,
            }
           
            case moderatorConstant. MODERATOR_ERROR_STATUS:
                localStorage.clear();
                window.location.reload();
                return {
                    ...state,
                    loader: false,
                }
        case moderatorConstant.MODERATOR_COUNTRY_REQUEST:
            return {
                ...state,
                loader: true,
                countryList: [],
                messageError: false,
                messageSuccess: false,
                messageWarning: false,
            }
        case moderatorConstant.MODERATOR_COUNTRY_SUCCESS:
            return {
                ...state,
                loader: false,
                messageError: false,
                messageSuccess: false,
                messageWarning: false,
                countryList: payload.map((val) => {
                    return { label: val.name, value: val.id }
                }),
            }
        case moderatorConstant.MODERATOR_RESET:
            return {
                ...state,
                loader: false,
                messageError: false,
                messageSuccess: false,
                messageWarning: false,
                moderatorList: [],
                countryList: [],
                countryId: 101,
                reportType: 1,
                fromDate: new Date(),
                toDate: new Date(),
                searchId: '',
            }
        case moderatorConstant.MODERATOR_INPUT_CHANGE:
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
                loader: false,
                messageError: false,
                messageSuccess: false,
                messageWarning: false,
            }
        case moderatorConstant.MODERATOR_LIST_REQUEST:
            return {
                ...state,
                loader: true,
                moderatorList: [],
            }
        case moderatorConstant.MODERATOR_LIST_RESPONSE:
            return {
                ...state,
                loader: false,
                moderatorList: payload,
            }
        default:
            return state
    }
}
