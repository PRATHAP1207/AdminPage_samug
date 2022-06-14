import { employeeConstant } from "app/constant/ActionTypes";
import {
  DESIGNATION_ERROR,
  CONTACTNO_ERROR,
  CONATCTALTNO_ERROR,
  CONTACTINVALID_ERROR,
  ADDRESS1_ERROR,
  ADDRESS2_ERROR,
  COUNTRY_ERROR,
  STATE_ERROR,
  CITY_ERROR,
  POSTBOX_ERROR,
  INVALIDIMAGE_ERROR,
  EMAILID_ERROR,
  EMPLOYEENAME_ERROR,
  GENDER_ERROR,
  DOB_ERROR,
  EMPLOYEEIMAGE_ERROR,
  EMAILIDFORMAT_ERROR,
  EMPLOYEEDETAILSFILE_ERROR,
  LISTSTATUS_ERROR,
  ACCESS_COUNTRY_ERROR,
} from "app/constant/ErrorConstant";
export const employeeAction = {
  employeeInputChange,
  getCountry,
  getState,
  getCity,
  getDesignation,
  clearError,
  validateInput,
  getEmployeeList,
  getEmployeeEdit,
  employeeActiveInactive,
  getProfileEdit,
  employeeDataReset,
  checkEmailUser,
};

function checkEmailUser(payload) {
 // console.log(payload);
  let emailIdError = "";
  if (payload.emailId) {
    var re =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    var isValid = re.test(payload.emailId);
    if (!isValid) {
      emailIdError = EMAILIDFORMAT_ERROR;
    }
  }
  if (emailIdError) {
    return {
      type: employeeConstant.EMPLOYEE_VALIDATE,
      payload: {
        emailIdError,
      },
    };
  }
  return {
    type: employeeConstant.EMPLOYEE_EMAIL_CHECK_REQUEST,
    payload: payload,
  };
}
function employeeDataReset() {
  return {
    type: employeeConstant.EMPLOYEE_RESET_DATA,
    payload: {},
  };
}
function getProfileEdit(prop) {
  return {
    type: employeeConstant.EMPLOYEE_PROFILE_EDIT_REQUEST,
    payload: prop,
  };
}
function getEmployeeEdit(prop) {
  return { type: employeeConstant.EMPLOYEE_EDIT_REQUEST, payload: prop };
}
function employeeActiveInactive(prop) {
  return {
    type: employeeConstant.EMPLOYEE_ACTIVEINACTIVE_REQUEST,
    payload: prop,
  };
}
function getEmployeeList(prop) {
  let listStatusError = "";
  if (!prop.listStatus || prop.listStatus === 0) {
    listStatusError = LISTSTATUS_ERROR;
  }

  if (listStatusError) {
    return {
      type: employeeConstant.EMP_LIST_VALIDATE,
      payload: { listStatusError },
    };
  } else {
  //  console.log("get details");
    return { type: employeeConstant.EMP_LIST_REQUEST, payload: prop };
  }
}

function clearError() {
  return { type: employeeConstant.EMPLOYEE_CLEAR_ERROR, payload: {} };
}
function getDesignation() {
 // console.log("action employeee")
  return { type: employeeConstant.EMPLOYEE_DESIGNATION_REQUEST, payload: {} };
}
function employeeInputChange({ prop, value, error }) {
  return {
    type: employeeConstant.EMP_INPUT_CHANGE,
    payload: { prop, value, error },
  };
}
function getCountry() {
  return { type: employeeConstant.EMPLOYEE_COUNTRY_REQUEST, payload: {} };
}
function getState(payload) {
  return { type: employeeConstant.EMPLOYEE_STATE_REQUEST, payload: payload };
}
function getCity(payload) {
  return { type: employeeConstant.EMPLOYEE_CITY_REQUEST, payload: payload };
}
function validateInput(prop) {
  let employeeNameError = "",
    designationIdError = "",
    contactNoError = "",
    altContactNoError = "",
    emailIdError = "",
    genderError = "",
    dobError = "",
    address1Error = "",
    address2Error = "",
    countryIdError = "",
    stateIdError = "",
    cityIdError = "",
    postBoxError = "",
    employeeImageError = "",
    employeeModeError = "",
    webLoginStatusError = "",
    accessCountryError = "";
  if (!prop.employeeName) {
    employeeNameError = EMPLOYEENAME_ERROR;
  }

  if (!prop.designationId) {
    designationIdError = DESIGNATION_ERROR;
  }
  if (!prop.contactNo) {
    // contactNoError = CONTACTNO_ERROR;
    if (prop.contactNo.match(/^-{0,1}\d+$/)) {
      //valid integer (positive or negative)
      contactNoError = CONTACTINVALID_ERROR;
    } else if (prop.contactNo.match(/^\d+\.\d+$/)) {
      //valid float
      contactNoError = CONTACTINVALID_ERROR;
    } else {
      //not valid number
      contactNoError = CONTACTNO_ERROR;
    }
  }
  if (!prop.altContactNo) {
    // altContactNoError = CONATCTALTNO_ERROR;
    if (prop.contactNo.match(/^-{0,1}\d+$/)) {
      //valid integer (positive or negative)
      altContactNoError = CONTACTINVALID_ERROR;
    } else if (prop.contactNo.match(/^\d+\.\d+$/)) {
      //valid float
      altContactNoError = CONTACTINVALID_ERROR;
    } else {
      //not valid number
      altContactNoError = CONTACTNO_ERROR;
    }
  }
  if (prop.emailId) {
    var re =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    var isValid = re.test(prop.emailId);
    if (!isValid) {
      emailIdError = EMAILIDFORMAT_ERROR;
    }
  }
  if (prop.formModes == 1 && !prop.emailId) {
    var re =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    var isValid = re.test(prop.emailId);
    if (!isValid) {
      emailIdError = EMAILIDFORMAT_ERROR;
    }
  }

  if (!prop.gender) {
    genderError = GENDER_ERROR;
  }
  if (!prop.dob) {
    dobError = DOB_ERROR;
  }
  if (!prop.address1) {
    address1Error = ADDRESS1_ERROR;
  }
  if (!prop.address2) {
    address2Error = ADDRESS2_ERROR;
  }
  if (!prop.countryId) {
    countryIdError = COUNTRY_ERROR;
  }
  if (!prop.stateId) {
    stateIdError = STATE_ERROR;
  }
  if (!prop.cityId) {
    cityIdError = CITY_ERROR;
  }
  if (!prop.pincode) {
    postBoxError = POSTBOX_ERROR;
  }
  if (!prop.employeeImage) {
    // employeeImageError = EMPLOYEEIMAGE_ERROR;
  }
  if (prop.formModes == 1 && !prop.accessCountry) {
    accessCountryError = ACCESS_COUNTRY_ERROR;
  }

  if (prop.formModes == 1) {
    if (
      (!prop.employeeMode && prop.employeeMode === 2) ||
      (!prop.webloginstatus && prop.webloginstatus === 1)
    ) {
    }
  }

  if (
    employeeNameError ||
    designationIdError ||
    contactNoError ||
    altContactNoError ||
    emailIdError ||
    genderError ||
    dobError ||
    address1Error ||
    address2Error ||
    countryIdError ||
    stateIdError ||
    cityIdError ||
    postBoxError ||
    employeeImageError ||
    employeeModeError ||
    webLoginStatusError ||
    accessCountryError
  ) {
    return {
      type: employeeConstant.EMPLOYEE_VALIDATE,
      payload: {
        employeeNameError,
        designationIdError,
        contactNoError,
        altContactNoError,
        emailIdError,
        genderError,
        dobError,
        address1Error,
        address2Error,
        countryIdError,
        stateIdError,
        cityIdError,
        postBoxError,
        employeeImageError,
        employeeModeError,
        webLoginStatusError,
        accessCountryError,
      },
    };
  } else {
    return { type: employeeConstant.EMPLOYEE_SAVE_REQUEST, payload: prop };
  }
}
