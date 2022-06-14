import { Graph } from 'app/constant/ActionTypes'

export const GetDataForExcelAndPdf = (props) => {
    // console.log("actionGrapg", props);
    return {
        type: Graph.GET_DETAILS_FOR_PDF,
        payload: props,
    }
}
export const InputChange = (props) => {
    // console.log("actionGraph year", props)
    return {
        type: Graph.CHANGE_THE_VALUE,
        payload: props,
    }
}
export const DateInputChange = (props) => {
    return {
        type: Graph.CHANGE_THE_DATE,
        payload: props,
    }
}
export const selectedMonth = (props) => {
    //console.log("Actionnnnnprops",props)
    return {
        type: Graph.SELECT_THE_MONTH,
        payload: props,
    }
}
export const yearChange = (props) => {
    // console.log("yearrrrrraction",props)
    return {
        type: Graph.YEAR_CHANGE,
        payload: props,
    }
}
export const CountryList = (props) => {
    //  console.log("action get country", props)
    return {
        type: Graph.GET_COUNTRY_LIST,
        payload: props,
    }
}
export const displayYear = (props) => {
    return {
        type: Graph.DISPLAY_YEAR_DROPDOWN,
        payload: props,
    }
}
export const HandleTheYear = (props) => {
    return {
        type: Graph.HANDLE_THE_OPTIONS_YEAR,
        payload: props,
    }
}
export const RemoveTheYear = (props) => {
    return {
        type: Graph.REMOVE_THE_YEAR,
        payload: props,
    }
}
export const RemoveMonthData = (props) => {
    return {
        type: Graph.REMOVE_MONTH_DATA,
        payload: props,
    }
}
export const RemoveTheCountry = (props) => {
    return {
        type: Graph.REMOVE_COUNTRY,
        payload: props,
    }
}
export const getTableList = (props) => {
    return {
        type: Graph.GET_TABLE_LIST,
        payload: props,
    }
}
export const CountryInputChange = (props) => {
    // console.log("action country", props)
    return {
        type: Graph.CHANGE_THE_COUNTRY,
        payload: props,
    }
}
export const YearMonthInputChange = (props) => {
    // console.log("YearMonthInputChange",props)
    return {
        type: Graph.YEARMONTH_INPUT_CHANGE,
        payload: props,
    }
}
export const getExcelData = (props) => {
    return {
        type: Graph.GET_EXCEL_DETAILS,
        payload: props,
    }
}
export const resetSubscriptionData = () => {
    return {
        type: Graph.RESET_DATA_SUBSCRIPTION,
        payload: {},
    }
}
