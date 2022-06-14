import { Currency } from 'app/constant/ActionTypes'

const initialState = {
    loader: false,
    country: [],
    saveExcelValues: [],
    curCountryIds: [],
    tableDhanCurr: [],
    rewardCalculation:[],
    optionChange: '',
    optionChangeError: '',
    saveDateCurrency: '',
    curCountryName: [],
    countryList: [],
    getPdfCurrency: [],
    removeCountry: [],
    dateWiseData: [],
    currencyTableData: [],
    fromDate: new Date(),
    date: '',
    fromDateError: '',
    toDate: new Date(),
    toDateError: '',
    countryIds: '',
    countryError: '',
    userId: JSON.parse(localStorage.getItem('user_id')),
    Graphcolumns: [],
}
const CurrencyReportReducer = function (
    state = initialState,
    { type, payload }
) {
    switch (type) {
        // case Currency.CURRENCY: {
        //     return {
        //         ...state,
        //         child: [payload],
        //     }
        // }
        // case Currency.GET_DETAILS_FOR_PDF:{
        //     console.log("grapghTeducers",payload);
        //     return{
        //       ...state,
        //       GraphData:payload

        //     }
        //   }
        case Currency.GET_COUNTRY_LIST_CURR: {
            //  console.log("moving",payload)
            return {
                ...state,
                loader: true,
                countryIds: 0,
            }
        }
        case Currency.COUNTRY_CURR_INPUT_CHANGE: {
            //  console.log("COUNTRY_INPUT_CHANGE",payload)
            return {
                ...state,
                curCountryIds: payload.value.map((id) => id.id),
                curCountryName: payload.value.map((id) => id.name),
            }
        }
        case Currency.DISPLAY_COUNTRY_LIST_CURR: {
            //  console.log("reducer dhan currency country list",payload)
            return {
                ...state,
                loader: false,
                countryList: payload,
            }
        }
        case Currency.REMOVE_CURR_COUNTRY: {
          
            return {
                ...state,
                curCountryIds: payload.map((id) => id.id),
            }
        }
        case Currency.DATE_INPUT_CHANGE: {
            return {
                ...state,
                [payload.props]: payload.value,
                [payload.error]: '',
            }
        }
        case Currency.GET_TABLE_CURRENCY: {
            //  console.log("pay reducer",payload)
            return {
                ...state,
                loader: true,
            }
        }
        case Currency.DISPLAY_TABLE_CURRENCY: {
            return {
                ...state,
                loader: false,
                currencyTableData: payload.data,
                tableDhanCurr: payload.data1,
                splitData: payload.splitData,
                rewardCalculation: payload.data.map((id) => id.detail),
            }
        }
        case Currency.GET_EXCEL_AND_PDF: {
            return {
                ...state,
                getPdfCurrency: payload,
            }
        }
        case Currency.SAVE_EXCEL_DATA: {
        
            return {
                ...state,
                saveExcelValues: payload,
            }
        }
        case Currency.INPUT_CHANGE_PIECHART: {
            return {
                ...state,
                [payload.props]: payload.value,
                [payload.error]: '',
            }
        }
        case Currency.SAVE_CURR_DATE: {
            return {
                ...state,
                saveDateCurrency: payload,
            }
        }
        case Currency.GET_CURRENCY_DATEWISE_DATA: {
            // console.log("GET_CURRENCY_DATEWISE_DATA",payload)
            return {
                ...state,
                loader: true,
            }
        }
        case Currency.DATEWISE_CURRENCY_DATA: {
            // console.log("props",payload)
            return {
                ...state,
                dateWiseData:payload.details,
            }
        }
        case Currency.RESET_CURRENCY_DATA: {
            return {
                ...state,
                curCountryIds: [],
                fromDate: new Date(),
                toDate: new Date(),
            }
        }
        case Currency.CURRENCY_ERROR: {
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
export default CurrencyReportReducer
