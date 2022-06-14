import { Currency } from 'app/constant/ActionTypes'

export const currency = (props) => {
    return {
        type: Currency.CURRENCY,
        payload: props,
    }
}
export const getCountryCurrency = (props) => {
    //  console.log('actioncurrency',props)
    return {
        type: Currency.GET_COUNTRY_LIST_CURR,
        payload: props,
    }
}
export const countryCurrInputChange = (props) => {
  //  console.log('countryCurrInputChange', props)
    return {
        type: Currency.COUNTRY_CURR_INPUT_CHANGE,
        payload: props,
    }
}
export const RemoveCountryList = (props) => {
    return {
        type: Currency.REMOVE_CURR_COUNTRY,
        payload: props,
    }
}
export const InputChangeDate = (props) => {
    //  console.log("action dhan country",props)
    return {
        type: Currency.DATE_INPUT_CHANGE,
        payload: props,
    }
}
export const getCurrencyDate = (props) => {
    // console.log("action curre",props)
    return {
        type: Currency.GET_TABLE_CURRENCY,
        payload: props,
    }
}
export const GetExcelPdfData = (props) => {
    return {
        type: Currency.GET_EXCEL_AND_PDF,
        payload: props,
    }
}
export const excelData = (props) => {
    return {
        type: Currency.SAVE_EXCEL_DATA,
        payload: props,
    }
}
export const pieChartCurrInputChange = (props) => {
    return {
        type: Currency.INPUT_CHANGE_PIECHART,
        payload: props,
    }
}
export const datewiseData = (props) => {
    // console.log("props",props)
    return {
        type: Currency.SAVE_CURR_DATE,
        payload: props,
    }
}
export const getDateCurrencyDetails = (props) => {
    // console.log("getDateCurrencyDetails",props)
    return {
        type: Currency.GET_CURRENCY_DATEWISE_DATA,
        payload: props,
    }
}
export const resetCurrencyData = () => {
    return {
        type: Currency.RESET_CURRENCY_DATA,
        payload: {},
    }
}
