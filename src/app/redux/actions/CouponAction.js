import { couponConstant } from 'app/constant/ActionTypes'
export const couponAction = {
    couponInputChange,
    couponCheckInput,
    ValidateCouponForm,
    getEmptyCoupon,
    getEmptyCouponList,
    getCouponList,
}

function couponInputChange(props) {
    return {
        type: couponConstant.COUPON_INPUT_CHANGE,
        payload: props,
           
    }
}

function couponCheckInput(props) {
    return {
        type: couponConstant.COUPON_CHECK_INPUT,
        payload: props,
    }
}

function ValidateCouponForm(props) {
     const prop =props.CouponData;
    let countryError = '',
        couponModeError = '',
        couponTypeError = '',
        couponValueError = '',
        maxCountError = '',
        startDateError = '',
        endDateError = '',
        lengthofCouponError = '',
        prefixCouponError = '',
        sufixCouponError = '',
        couponMaskError = '',
        numberEnableError = '',
        lowerCaseError = '',
        alphabetError = ''
    if (!prop.countryId) {
        countryError = couponConstant.COUNTRY_CODE_ERROR
    }

    if (!prop.couponMode) {
        couponModeError = couponConstant.COUPON_MODE_ERROR
    }

    if (!prop.couponType) {
        couponTypeError = couponConstant.COUPON_TYPE_ERROR
    }

    if (!prop.couponValue) {
        couponValueError = couponConstant.COUPON_VALUE_ERROR
    }
    if (!prop.startDate) {
        startDateError = "Please Select the Date"
    }

    if (prop.couponValue) {
        var re =/^[0-9\b]+$/;
        var isValid = re.test(prop.couponValue);
        if (!isValid) {
            couponValueError = couponConstant.COUPON_VALUE_ERROR
        }
      }
    if (prop.couponType == 1 && prop.couponValue) {
        var re =/^[1-9][0-9]?$|^100$/;
        var isValid = re.test(prop.couponValue);
        if (!isValid) {
            couponValueError = couponConstant.COUPON_VALUE_ERROR
        }
      }
      if (prop.couponType == 2 && prop.couponValue) {
        var re = /^[1-9][0-9]*$/;
        var isValid = re.test(prop.couponValue);
        if (!isValid) {
            couponValueError = couponConstant.COUPON_VALUE_ERROR
        }
      }

      if(prop.startDate >= prop.endDate){
        startDateError = "Please select the proper Date"
      }
    if (!prop.maxCount) {
        maxCountError = couponConstant.COUPON_MAXCOUNT_ERROR
    }
    if (prop.maxCount) {
        var re =/^[0-9\b]+$/;
        var isValid = re.test(prop.maxCount);
        if (!isValid) {
            maxCountError = "Accepts Only Numbers"
        }
      }
    if (
        countryError ||
        couponModeError ||
        couponTypeError ||
        couponValueError ||
        maxCountError ||
        startDateError ||
        endDateError ||
        lengthofCouponError ||
        prefixCouponError ||
        sufixCouponError ||
        couponMaskError ||
        numberEnableError ||
        lowerCaseError ||
        alphabetError 
    ) {
        return {
            type: couponConstant.COUPON_DATA_VALIDATE,
            payload: {
                countryError ,
                couponModeError ,
                couponTypeError ,
                couponValueError ,
                maxCountError,
                startDateError ,
                endDateError ,
                lengthofCouponError ,
                prefixCouponError ,
                sufixCouponError ,
                couponMaskError ,
                numberEnableError ,
                lowerCaseError ,
                alphabetError 
            },
        }
    } else {
        return { type: couponConstant.COUPON_SAVE_DATA,payload:props}
    }
}

function getCouponList(props){
       //  console.log("geetint in to the Action ",props);
    return {
        type: couponConstant.GET_COUPON_LIST,
        payload: props,
           
    }
}
function getEmptyCoupon(){
    return{
        type:couponConstant.EMPTY_COUPON_FORM,
        payload:""
    }
}
function getEmptyCouponList(){
    return{
        type:couponConstant.EMPTY_COUPON_LIST,
        payload:""
    }
}



