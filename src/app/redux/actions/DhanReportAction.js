import { Dhan } from 'app/constant/ActionTypes'

export const InputChange = (props) => {
    // console.log("action dhan country",props)
    return {
        type: Dhan.CHANGE_THE_VALUE,
        payload: props,
    }
}
export const countryInputChange = (props) => {
    return {
        type: Dhan.COUNTRY_INPUT_CHANGE,
        payload: props,
    }
}
export const getCountryList = (props) => {
    //  console.log("moving",props)
    return {
        type: Dhan.GET_COUNTRY_LIST_DATA,
        payload: props,
    }
}
export const GetExcelandPdfData = (props) => {
    //  console.log("actionGraph",props);
    return {
        type: Dhan.GET_DETAIL_PDF_EXCEL,
        payload: props,
    }
}
export const getCountryListDhan = (props) => {
    return {
        type: Dhan.GET_COUNTRY_LIST_DHAN,
        payload: props,
    }
}
export const RemoveTheCountryList = (props) => {
    return {
        type: Dhan.REMOVE_COUNTRY_LIST_DHAN,
        payload: props,
    }
}
export const dhanData = (props) => {
    return {
        type: Dhan.GET_DHAN_TABLEGRAPH_DATA,
        payload: props,
    }
}
export const getDateDhanDetails = (props) => {
    return {
        type: Dhan.GET_DATE_DHAN,
        payload: props,
    }
}
export const sendDateToAction = (props) => {
    // console.log("action date",props)
    return {
        type: Dhan.SEND_DATE_TO_API,
        payload: props,
    }
}
export const getPieChartData = (props) => {
    return {
        type: Dhan.GET_PIECHART_DATA,
        payload: props,
    }
}
export const pieChartInputChange = (props) => {
    return {
        type: Dhan.PIE_INPUT_CHANGE,
        payload: props,
    }
}
export const saveGenDhan = (props) => {
    return {
        type: Dhan.SAVE_DHAN_GEN,
        payload: props,
    }
}
export const saveDhanUsed = (props) => {
    return {
        type: Dhan.SAVE_DHAN_USED,
        payload: props,
    }
}
export const getExcelDhan = (props) => {
    return {
        type: Dhan.GET_EXCEL_DHAN,
        payload: props,
    }
}
export const resetDhanReport = () => {
    return {
        type: Dhan.RESET_DHAN_DATA,
        payload: {},
    }
}
