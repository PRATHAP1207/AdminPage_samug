import { Mode } from 'app/constant/ActionTypes'

export const dhanType = (props) => {
    return {
        type: Mode.DHAN_TYPE,
        payload: props,
    }
}
export const InputChange = (props) => {
    return {
      type: Mode.INPUT_CHANGE,
      payload: props
    }
  }
export const countryDhanInputChange = (props) => {
    return {
        type: Mode.INPUT_CHANGE_COUNTRYDHAN,
        payload: props,
    }
}
export const RemoveTheCountry = (props) => {
    return {
        type: Mode.REMOVE_COUNTRY,
        payload: props,
    }
}
export const getDhanSwipeData = (props) => {
    return {
        type: Mode.GET_DHAN_SWIPE_DATA,
        payload: props,
    }
}
export const getExcelDhanType = (props) => {
    return {
        type: Mode.GET_EXCEL_DHANTYPE,
        payload: props,
    }
}
export const resetDhanType = () => {
    return {
        type: Mode.RESET_DHAN_TYPE,
        payload: {},
    }
}
