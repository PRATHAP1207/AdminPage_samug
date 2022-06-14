import { employeeConstant } from "app/constant/ActionTypes";
export const EMPLOYEE_INITIAL_STATE = {
  employeeId: 0,
  employeeName: "",
  designationId: 0,
  contactNo: "",
  altContactNo: "",
  emailId: "",
  gender: 1,
  dob: new Date(),
  address1: "",
  address2: "",
  countryList: [],
  stateList: [],
  cityList: [],
  designationList: [],
  countryId: "",
  stateId: "",
  cityId: "",
  pincode: "",
  employeeImage: "",
  webLoginStatus: false,
  accessCountry: "",
  employeeRoles: "",
  employeeNameError: "",
  designationIdError: "",
  contactNoError: "",
  altContactNoError: "",
  emailIdError: "",
  genderError: "",
  dobError: "",
  address1Error: "",
  address2Error: "",
  countryIdError: "",
  stateIdError: "",
  cityIdError: "",
  pincodeError: "",
  employeeImageError: "",
  employeeRolesError: "",
  accessCountryError: "",
  loader: false,
  listStatus: "1",
  listStatusError: "",
  employeeList: [],
  userDetails: {},
  formModes: "0",
  emailCheck: 0,
  roleId: 0,
  rolesList: [],
  roleIdError: "",
};
export default (state = EMPLOYEE_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case employeeConstant.EMPLOYEE_EMAIL_CHECK_ERROR: {
      return { ...state, loader: false, emailCheck: 0, emailId: "" };
    }
    case employeeConstant.EMPLOYEE_EMAIL_CHECK_REQUEST: {
      return { ...state, loader: true, emailCheck: 0 };
    }

    case employeeConstant.EMPLOYEE_EMAIL_CHECK_RESPONSE: {
      return { ...state, loader: false, emailCheck: payload };
    }
    case employeeConstant.EMPLOYEE_ERROR: {
      return {
        ...state,
        loader: false,
        empalertMessage: payload,
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: true,
      };
    }
    case employeeConstant.EMPLOYEE_ERROR_REQUEST: {
      localStorage.clear();
      window.location.reload();
      return {
        ...state,
        loader: false,
      };
    }
    case employeeConstant.EMPLOYEE_RESET_DATA:
      return {
        ...state,

        employeeId: 0,
        employeeName: "",
        designationId: 0,
        contactNo: "",
        altContactNo: "",
        emailId: "",
        gender: 1,
        dob: new Date(),
        address1: "",
        address2: "",
        countryList: [],
        stateList: [],
        cityList: [],
        designationList: [],
        countryId: "",
        stateId: "",
        cityId: "",
        pincode: "",
        employeeImage: "",
        webLoginStatus: false,
        accessCountry: "",
        employeeRoles: "",
        employeeNameError: "",
        designationIdError: "",
        contactNoError: "",
        altContactNoError: "",
        emailIdError: "",
        genderError: "",
        dobError: "",
        address1Error: "",
        address2Error: "",
        countryIdError: "",
        stateIdError: "",
        cityIdError: "",
        pincodeError: "",
        employeeImageError: "",
        employeeRolesError: "",
        accessCountryError: "",
        loader: false,
        listStatus: "1",
        listStatusError: "",
        employeeList: [],
        userDetails: {},
        formModes: "0",
        roleId: 0,
        rolesList: [],
        roleIdError: "",
      };
    case employeeConstant.EMPLOYEE_PROFILE_EDIT_REQUEST:
      return {
        ...state,
        loader: true,
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        employeeId: payload.employeeId,
        userDetails: {},
      };
    case employeeConstant.EMPLOYEE_PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        loader: true,
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        countryList: payload.countryList,
        stateList: payload.stateList,
        cityList: payload.cityList,
        accessRoleList: payload.rolesList,
        employeeId: payload.employee.uid,
        employeeName: payload.employee.employeeName,
        designationId: payload.employee.designationId,
        contactNo: payload.employee.contactNo,
        altContactNo: payload.employee.altContactNo,
        emailId: payload.employee.emailId,
        dob: payload.employee.dob,
        gender: payload.employee.gender,
        address1: payload.employee.address1,
        address2: payload.employee.address2,
        countryId: payload.employee.country,
        stateId: payload.employee.state,
        cityId: payload.employee.city,
        pincode: payload.employee.pincode,
        employeeImage: payload.employee.employeeImage,
        //    employeeMode: payload.employee.employeeMode,
        // webLoginStatus: payload.employee.loginStatus,
        designationList: payload.designationList,
        userDetails: payload.userDetails,
        emailCheck: 1,
      };
    case employeeConstant.EMP_INPUT_CHANGE:
      return {
        ...state,
        isLoading: false,
        [payload.prop]: payload.value,
        [payload.error]: "",
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        checkUserStatus: 0,
      };
    case employeeConstant.EMPLOYEE_COUNTRY_REQUEST:
      return {
        ...state,
        loader: true,
        empshowMessage: false,
        countryId: 0,
      };
    case employeeConstant.EMPLOYEE_COUNTRY_SUCCESS:
      return {
        ...state,
        loader: false,
        empshowMessage: false,
        countryList: payload,
      };
    case employeeConstant.EMPLOYEE_CITY_REQUEST:
      return {
        ...state,
        loader: true,
        empshowMessage: false,
        cityId: 0,
      };
    case employeeConstant.EMPLOYEE_CITY_SUCCESS:
      return {
        ...state,
        loader: false,
        empshowMessage: false,
        cityList: payload,
      };
    case employeeConstant.EMPLOYEE_STATE_REQUEST:
      return {
        ...state,
        loader: true,
        empshowMessage: false,
        stateId: 0,
      };
    case employeeConstant.EMPLOYEE_STATE_SUCCESS:
      return {
        ...state,
        loader: false,
        empshowMessage: false,
        stateList: payload,
      };
    case employeeConstant.EMPLOYEE_DESIGNATION_REQUEST:
    //  console.log("reducer employee")
      return {
        ...state,
        loader: true,
        designationList: [],
        designationId: 0,
      };
    case employeeConstant.EMPLOYEE_DESIGNATION_SUCCESS:
      return {
        ...state,
        loader: false,
        designationList: payload.designation,
        rolesList: payload.roleList,
        designationId: 0,
      };

    case employeeConstant.EMPLOYEE_CLEAR_ERROR:
      return {
        ...state,
        employeeNameError: "",
        designationIdError: "",
        contactNoError: "",
        altContactNoError: "",
        emailIdError: "",
        genderError: "",
        dobError: "",
        address1Error: "",
        address2Error: "",
        countryIdError: "",
        stateIdError: "",
        cityIdError: "",
        pincodeError: "",
        employeeImageError: "",
        employeeRolesError: "",
        loader: false,
        listStatusError: "",
      };
    case employeeConstant.EMPLOYEE_VALIDATE:
      return {
        ...state,
        loader: false,
        empalertMessage: "",
        employeeNameError: payload.employeeNameError,
        designationIdError: payload.designationIdError,
        contactNoError: payload.contactNoError,
        altContactNoError: payload.altContactNoError,
        emailIdError: payload.emailIdError,
        genderError: payload.genderError,
        dobError: payload.dobError,
        address1Error: payload.address1Error,
        address2Error: payload.address2Error,
        countryIdError: payload.countryIdError,
        stateIdError: payload.stateIdError,
        cityIdError: payload.cityIdError,
        pincodeError: payload.postBoxError,
        employeeImageError: payload.employeeImageError,
        employeeModeError: payload.employeeModeError,
        webLoginStatusError: payload.webLoginStatusError,
        employeeDetailsFileError: payload.employeeDetailsFileError,
        accessCountryError: payload.accessCountryError,
      };
    case employeeConstant.EMPLOYEE_SAVE_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case employeeConstant.EMPLOYEE_SAVE_SUCCESS:
      return {
        ...state,
        loader: false,
        empalertMessage: payload.message,
      };
    case employeeConstant.EMP_LIST_REQUEST:
      return {
        ...state,
        loader: true,
        employeeList: [],
      };
    case employeeConstant.EMP_LIST_VALIDATE:
      return {
        ...state,
        loader: false,
        listStatusError: payload.listStatusError,
      };
    case employeeConstant.EMP_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        employeeList: payload,
      };
    case employeeConstant.EMPLOYEE_EDIT_REQUEST:
      return {
        ...state,
        loader: true,
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        employeeId: payload.employeeId,
        userDetails: {},
      };
    case employeeConstant.EMPLOYEE_EDIT_SUCCESS:
      return {
        ...state,
        loader: false,
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        countryList: payload.countryList,
        stateList: payload.stateList,
        cityList: payload.cityList,
        accessRoleList: payload.rolesList,
        designationList: payload.designationList,
        employeeId: payload.employee.uid,
        employeeName: payload.employee.employeeName,
        designationId: payload.employee.designationId,
        contactNo: payload.employee.contactNo,
        altContactNo: payload.employee.altContactNo,
        emailId: payload.employee.emailId,
        dob: payload.employee.dob,
        gender: payload.employee.gender,
        address1: payload.employee.address1,
        address2: payload.employee.address2,
        countryId: payload.employee.country,
        stateId: payload.employee.state,
        cityId: payload.employee.city,
        pincode: payload.employee.pincode,
        employeeImage: payload.employee.employeeImage,
        //    employeeMode: payload.employee.employeeMode,
        webLoginStatus: payload.employee.loginStatus,
        userDetails: payload.userDetails,
        emailCheck: 1,
      };
    case employeeConstant.EMPLOYEE_ACTIVEINACTIVE_SUCCESS:
      return {
        ...state,
        loader: false,
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        employeeList: payload,
      };
    case employeeConstant.EMPLOYEE_ACTIVEINACTIVE_REQUEST:
      return {
        ...state,
        loader: true,
        empalertMessage: "",
        empshowMessage: false,
        empshowMessageInfo: false,
        empshowMessageSuccess: false,
        employeeId: payload.employeeId,
        towerId: payload.towerId,
        companyId: payload.companyId,
        activeStatus: payload.activeStatus,
      };
    default:
      return state;
  }
};
