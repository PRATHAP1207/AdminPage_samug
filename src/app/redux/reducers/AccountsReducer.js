import { accountsConstant } from "app/constant/ActionTypes";

export const ACCOUNTS_INITIAL_STATE = {
  loader: false,
  messageError: false,
  messageSuccess: false,
  messageWarning: false,
  message: "",
  countryList: [],
  countryId: 101,
  reportType: "1",
  fromDate: new Date(),
  toDate: new Date(),
  accountBalance: 0,
  searchValue: "",
  countryIdError: "",
  dateEnable: false,
  accountsList: [],
  payoutSelected: [],
  selectedAmount: 0,
  bankKycList: [],
  bankKycListSelected: [],
  bankKycPopup: false,
  popupViewData: "",
  remarks: "",
  remarksStatus: false,
  btnStatus: true,
};

export default (state = ACCOUNTS_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    //
    case accountsConstant.ACCOUNTS_KYC_BANK_CLOSE:
      return {
        ...state,
        loader: false,
        bankKycPopup: false,
        popupViewData: "",
        remarks: "",
        remarksStatus: false,
        btnStatus: true,
      };
    case accountsConstant.ACCOUNTS_KYC_BANK_TABLE_REJECT:
      return {
        ...state,
        loader: false,
        bankKycPopup: true,
        popupViewData: payload.data,
        remarks: "",
        remarksStatus: true,
        btnStatus: false,
      };
    case accountsConstant.ACCOUNTS_KYC_BANK_POPUP:
      return {
        ...state,
        loader: false,
        bankKycPopup: payload.status,
        popupViewData: payload.status == true ? payload.data : "",
        remarksStatus: false,
        btnStatus: true,
      };
    case accountsConstant.ACCOUNTS_KYC_BANK_REJECT:
      return { ...state, loader: false, remarksStatus: true, remarks: "" };
    case accountsConstant.ACCOUNTS_BANK_KYC_APPROVAL_REQUEST:
      return { ...state, loader: false, bankKycPopup: false };
    case accountsConstant.ACCOUNTS_BANK_KYC_APPROVAL_RESPONSE:
      return { ...state, loader: false, bankKycList: payload };
    case accountsConstant.ACCOUNTS_BANK_KYC_LIST_REQUEST:
      return {
        ...state,
        loader: true,
        bankKycList: [],
        bankKycListSelected: [],
      };
    case accountsConstant.ACCOUNTS_BANK_KYC_LIST_RESPONSE:
      return {
        ...state,
        loader: false,
        bankKycList: payload,
        bankKycListSelected: [],
      };
    case accountsConstant.ACCOUNTS_PAYOUT_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case accountsConstant.ACCOUNTS_PAYOUT_RESPONSE:
      return {
        ...state,
        loader: false,
        accountsList: payload,
        payoutSelected: [],
        selectedAmount: 0,
      };
    case accountsConstant.ACCOUNTS_SELECTED_ROWS_UPDATE:
      return {
        ...state,
        payoutSelected: payload
          .filter((val) => {
            if (val.tableData.checked) return val;
          })
          .map(function (jedi) {
            return jedi;
          }),
        selectedAmount:
          payload.length > 0
            ? payload
                .filter((val) => {
                  if (val.tableData.checked) return val;
                })
                .map(function (jedi) {
                  return jedi.transactionAmount;
                })
                .reduce((prev, curr) => {
                  return parseInt(prev) + parseInt(curr);
                },0)
            : 0,
      };
    case accountsConstant.ACCOUNTS_BALANCE_REQUEST:
      return {
        ...state,
        loader: true,
        accountBalance: 0,
      };
    case accountsConstant.ACCOUNTS_BALANCE_RESPONSE:
      return {
        ...state,
        loader: false,
        accountBalance: payload,
      };
    case accountsConstant.ACCOUNTS_DETAILS_LIST_REQUEST:
      return {
        ...state,
        loader: true,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        message: "",
        accountsList: [],
      };
    case accountsConstant.ACCOUNTS_DETAILS_LIST_RESPONSE:
      return {
        ...state,
        loader: false,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        message: "",
        accountsList: payload,
      };
    case accountsConstant.ACCOUNTS_DATE_ENABLE:
      return {
        ...state,
        dateEnable: payload,
        accountsList: [],
      };
    case accountsConstant.ACCOUNTS_COUNTRY_REQUEST:
      return {
        ...state,
        loader: true,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        message: "",
      };
    case accountsConstant.ACCOUNTS_COUNTRY_SUCCESS:
      //numbers.map((number) => number * 2)
      return {
        ...state,
        loader: false,
        countryList: payload.map((val) => {
          return { label: val.name, value: val.id };
        }),
      };
    case accountsConstant.ACCOUNTS_ERROR:
    
      return {
        ...state,
        loader: false,
      };
      
      case accountsConstant.ACCOUNTS_ERROR_STATUS:
       localStorage.clear();  
        window.location.reload();
        return {
          ...state,
          loader: false,
        };
    case accountsConstant.ACCOUNTS_INPUT_CHANGE:
      return {
        ...state,
        [payload.prop]: payload.value,
        [payload.error]: "",
        loader: false,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
      };
    case accountsConstant.ACCOUNTS_RESET:
      return {
        ...state,
        loader: false,
        messageError: false,
        messageSuccess: false,
        messageWarning: false,
        message: "",
        countryList: [],
        countryId: 101,
        reportType: 1,
        fromDate: new Date(),
        toDate: new Date(),
        accountBalance: 0,
        searchValue: "",
      };
    default:
      return state;
  }
};
