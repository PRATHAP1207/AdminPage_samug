import { Dhan } from 'app/constant/ActionTypes'

const initialState = {
  loader: false,
  fromCountryDate:new Date(),
  fromCountryDateError:"",
  toCountryDate:new Date(),
  toCountryDateError:"",
  DisplayCountry:[],
  excelDhanDetails:[],
  countryName:"",
  countryData:[],
  optionChange:"",
  DhanCalculation:[],
  optionChangeError:"",
  countryId:"",
  dhanGeneratedSave:"",
  dhanUsedSave:"",
  DhanGraphData:[],
  DhanCountryList:[],
  CountryError:'',
  removeCountryDhan:[],
  userId:JSON.parse(localStorage.getItem('user_id')),
  dhanTableGraphData:[],
  country:[],
  countryChange:[],
  tableDhan:[],
  userDhanDate:"",
  date:[],
  dhanGeneration:[],
  dhanUsed:[],
  displayPieChart:[],
  datewiseUserDetails:[]

}
const DhanReportReducer = function (state = initialState, { type, payload }) {
  switch (type) {
    case Dhan.CHANGE_THE_VALUE: {
      return {
        ...state,
        [payload.props]: payload.value,
        [payload.error]: "",
      }
    }
    case Dhan.GET_COUNTRY_LIST_DATA:{
      //console.log("moving",payload)
      return{
      ...state,
      loader:true,
      countryId: 0,
      }
    }
    case Dhan.DISPLAY_COUNTRY_LIST_DATA:{
    //  console.log("reducer dhan country list",payload)
      return{
        ...state,
        loader:false,
        DisplayCountry:payload
      }
    }
    case Dhan.GET_DETAIL_PDF_EXCEL:{
      return{
        ...state,
        DhanGraphData:payload
      }
    }
    case Dhan.REMOVE_COUNTRY_LIST_DHAN:{
      return{
        ...state,
        countryChange:payload.map((id)=>id.id)
      }
    }
    case Dhan.GET_DHAN_TABLEGRAPH_DATA:{
      return{
        ...state,
       loader:true,
      }
    }
    case Dhan.COUNTRY_INPUT_CHANGE:{
    //  console.log("countryyyy",payload.value.map((id)=>id))
     // console.log("countryy",payload.value.map((id)=>id.id))
      return{
        ...state,
        countryData:payload.value.map((id)=>id),
        countryChange:payload.value.map((id)=>id.id),
        countryName:payload.value.map((id)=>id.name)
      }
    }
    case Dhan.DISPLAY_DHAN_TABLEGRAPH_DATA:{
     // console.log("displaydhantable reducer",payload)
     // console.log("displaydhantable reducer",payload.data)
      return{
        ...state,
        dhanTableGraphData:payload.data1,
        splitData:payload.splitData,
        tableDhan:payload.data,
        DhanCalculation:payload.data.map((id)=>id.detail)
      }
    }
    case Dhan.GET_DATE_DHAN:{
      return{
        ...state,
        loader:true
      }
    }
    case Dhan.DISPLAY_DATE_DHAN:{
      return{
        ...state,
        datewiseUserDetails:payload.data.response.data.details,
      }
    }
    case Dhan.SEND_DATE_TO_API:{
     // console.log("reducerdate",payload)
      return{
        ...state,
        userDhanDate:payload
      }
    }
    case Dhan.GET_PIECHART_DATA:{
      return{
        ...state,
        loader:true
      }
    }
    case Dhan.DISPLAY_PIECHART_DATA:{
      return{
        ...state,
        loader:false,
        displayPieChart:payload
      }
    }
    case Dhan.PIE_INPUT_CHANGE:{
      return{
        ...state,
        [payload.props]: payload.value,
        [payload.error]: "",
      }
    }
    case Dhan.SAVE_DHAN_GEN:{
      return{
        ...state,
        dhanGeneratedSave:payload
      }
    }
    case Dhan.SAVE_DHAN_USED:{
      return{
        ...state,
        dhanUsedSave:payload
      }
    }
    case Dhan.GET_EXCEL_DHAN:{
      return{
        ...state,
        excelDhanDetails:payload
      }
    }
    case Dhan.RESET_DHAN_DATA:{
      return{
        ...state,
        countryChange:[],
        fromCountryDate:new Date(),
        toCountryDate:new Date(),

      }
    }
    case Dhan.DHAN_REPORT_ERROR: {
      localStorage.clear();
      window.location.reload();
      return { ...state,
         loader: false,
         };
  }
    default: {
      return { ...state }
    }
  }
}
export default DhanReportReducer


