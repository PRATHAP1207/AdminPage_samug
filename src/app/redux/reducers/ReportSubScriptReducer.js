import { reportSubscript } from 'app/constant/ActionTypes'
export const REPORT_SUBSCRIPT_INITIAL_STATE = {
    loader: false,
    countryIdList:"",
    optionChange:"",
    startDateList:new Date(),
    endDateList:new Date(),
    reportTypeStatusChange:"",

    countryIdListError:"",
    optionChangeError:"",
    startDateListError:'',
    endDateListError:"",
    reportTypeStatusChangeError:'',
}
export default (state = REPORT_SUBSCRIPT_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case reportSubscript.INPUT_CHANGE_SUBSCRIBE: {
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
            }
        }
        case reportSubscript.GET_SUBSCRIBE_LIST_SHOW:
            return{
                ...state,
                loader:true,
            }
        default:
            return state
    }
}
