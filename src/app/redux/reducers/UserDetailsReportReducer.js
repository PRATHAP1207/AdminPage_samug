import { UserDetail } from 'app/constant/ActionTypes'
import { startCase } from 'lodash'

const initialState = {
    loader: false,
    country: [],
    CountryError: "",
    fromDate: new Date(),
    fromDateError: "",
    toDate: new Date(),
    excelData:[],
    toDateError: "",
    userId: JSON.parse(localStorage.getItem('user_id')),
    removeCountry: [],
    userData:[],
    accountId:"",
    startTime:"",
    endTime:""

}
const UserDetailsReportReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case UserDetail.DHAN_TYPE: {
            return {
                ...state,
                payload

            }
        }
        case UserDetail.INPUT_CHANGE_COUNTRY: {
            return {
                ...state,
              country:payload.value.map((id)=>id.id)
            }
        }
        case UserDetail.REMOVE_COUNTRY: {
            return {
                ...state,
                country: payload.map((id)=>id.id)
            }
        }
        case UserDetail.INPUT_CHANGE_DATE:{
            return{
                ...state,
                [payload.props]: payload.value,
                [payload.error]: "",
            }
        }
        case UserDetail.GET_USER_DATA:{
            return{
                ...state,
                loader:true
            }
        }
        case UserDetail.DISPLAY_USER_DATA:{
          //  console.log('redudersssssss',payload)
            return{
                ...state,
                userData:payload
            }
        }
        case UserDetail.GET_EXCEL:{
            return{
                ...state,
                excelData:payload
            }
        }
        case UserDetail.RESET_SAMUG_USER:{
            return{
                ...state,
                country: [],
                fromDate:new Date(),
                toDate:new Date(),
            }
        }
        default: {
            return { ...state }
        }
    }
}
export default UserDetailsReportReducer