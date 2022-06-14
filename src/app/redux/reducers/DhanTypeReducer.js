import { Mode } from 'app/constant/ActionTypes'

const initialState = {
    loader: false,
    country: [],
    CountryError: '',
    date: '',
    longPress: '',
    fortune: '',
    excelDataSwipe: [],
    dhanSwipeTableData: [],
    removeCountry: [],
    fromDhanDate: new Date(),
    fromDhanDateError: '',
    toDhanDate: new Date(),
    toDhanDateError: '',
    userId: JSON.parse(localStorage.getItem('user_id')),
}
const DhanTypeReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case Mode.DHAN_TYPE: {
            return {
                ...state,
                payload,
            }
        }
        case Mode.INPUT_CHANGE: {
            return {
                ...state,
                [payload.props]: payload.value,
                [payload.error]: "",
            }
        }
        case Mode.INPUT_CHANGE_COUNTRYDHAN: {
            return {
                ...state,
                country: payload.value.map((id) => id.id)
            }
        }
        case Mode.REMOVE_COUNTRY: {
            return {
                ...state,
                country: payload.map((id) => id.id),
            }
        }
        case Mode.GET_DHAN_SWIPE_DATA: {
            return {
                ...state,
                loader: true,
            }
        }
        case Mode.DISPLAY_DHAN_SWIPE_DATA: {
            return {
                ...state,
                dhanSwipeTableData:payload,
            }
        }
        case Mode.GET_EXCEL_DHANTYPE: {
            return {
                ...state,
                excelDataSwipe: payload,
            }
        }
        case Mode.RESET_DHAN_TYPE: {
            return {
                ...state,
                country: [],
                fromDhanDate: new Date(),
                toDhanDate: new Date(),
            }
        }
        case Mode.DHAN_ERROR: {
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
export default DhanTypeReducer
