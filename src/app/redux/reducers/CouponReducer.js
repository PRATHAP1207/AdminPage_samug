import { couponConstant } from 'app/constant/ActionTypes'
export const COUPON_INITIAL_STATE = {
    loader: false,
    countryId: '',
    couponMode: '',
    couponType: '',
    couponValue: '',
    maxCount: '',
    startDate: new Date(),
    endDate: new Date(),
    lengthofCoupon: '',
    prefixCoupon: '',
    sufixCoupon: '',
    couponMask: '',
    numberEnable: true,
    lowerCase: true,
    alphabet: true,
    couponView: '',
    statusChange: '',
    countryIdList: '',
    startDateList: new Date(),
    endDateList: new Date(),
    couponListData: [],
    userId: JSON.parse(localStorage.getItem('user_id')),

    countryError: '',
    couponModeError: '',
    couponTypeError: '',
    couponValueError: '',
    maxCountError: '',
    startDateError: '',
    endDateError: '',
    lengthofCouponError: '',
    prefixCouponError: '',
    sufixCouponError: '',
    couponMaskError: '',
    numberEnableError: '',
    lowerCaseError: '',
    alphabetError: '',
    statusChangeError: '',
    countryIdListError: '',
    startDateListError: '',
    endDateListError: '',
}
export default (state = COUPON_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case couponConstant.COUPON_INPUT_CHANGE: {
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
            }
        }
        case couponConstant.COUPON_CHECK_INPUT: {
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
            }
        }
        case couponConstant.COUPON_DATA_VALIDATE: {
            return {
                ...state,
                countryError: payload.countryError,
                couponModeError: payload.couponModeError,
                couponTypeError: payload.couponTypeError,
                couponValueError: payload.couponValueError,
                maxCountError: payload.maxCountError,
                startDateError: payload.startDateError,
                endDateError: payload.endDateError,
                lengthofCouponError: payload.lengthofCouponError,
                couponMaskError: payload.couponMaskError,
            }
        }
        case couponConstant.GET_COUPON_LIST:
            //  console.log("getting to the Reducers",payload);
            return {
                ...state,
                loader: true,
            }
        case couponConstant.DISPLAY_COUPON_LIST:
            return {
                ...state,
                loader: false,
                couponListData: payload,
            }
        case couponConstant.COUPON_SAVE_DATA:
            return {
                ...state,
                loader: true,
            }
        case couponConstant.DISPLAY_COUPON_STATUS:
            return {
                ...state,
                loader: false,
                couponListData: payload,
            }
        case couponConstant.COUPON_ERROR:
            localStorage.clear()
            window.location.reload()
            return {
                ...state,
                loader: false,
            }
        case couponConstant.EMPTY_COUPON_FORM:
            return {
                ...state,
                countryId: '',
                couponMode: '',
                couponType: '',
                couponValue: '',
                maxCount: '',
                startDate: new Date(),
                endDate: new Date(),
                lengthofCoupon: '',
                prefixCoupon: '',
                sufixCoupon: '',
                couponMask: '',
                numberEnable: true,
                lowerCase: true,
                alphabet: true,
                countryError: '',
                couponModeError: '',
                couponTypeError: '',
                couponValueError: '',
                maxCountError: '',
                startDateError: '',
                endDateError: '',
                lengthofCouponError: '',
                prefixCouponError: '',
                sufixCouponError: '',
                couponMaskError: '',
                numberEnableError: '',
                lowerCaseError: '',
            }
            case couponConstant.EMPTY_COUPON_FORM:
              return {
                ...state,
                statusChange: '',
                countryIdList: '',
                startDateList: new Date(),
                endDateList: new Date(),
              }
        default:
            return state
    }
}
