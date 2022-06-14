import { accountsConstant } from "app/constant/ActionTypes";
import { COUNTRY_ERROR } from "app/constant/ErrorConstant";
export const accountsAction = {
  getCountryList,
  accountsInputChange,
  accountsReset,
  accountsDateEnableDisable,
  getAccountsDetailsList,
  getAccountBalance,
  updateAccountsRowSelected,
  accountsPayoutUpdate,
  accountsKycBankList,
  accountsKycBankApproval,
  accountsKycBankPopup,
  accountsKycBankReject,
  accountsKycBankTableReject,
  accountsKycBankPopupClose,
};
//
function accountsKycBankPopupClose() {
  return {
    type: accountsConstant.ACCOUNTS_KYC_BANK_CLOSE,
    payload: {},
  };
}
function accountsKycBankTableReject(payload) {
  return {
    type: accountsConstant.ACCOUNTS_KYC_BANK_TABLE_REJECT,
    payload: payload,
  };
}
function accountsKycBankReject(payload) {
  return {
    type: accountsConstant.ACCOUNTS_KYC_BANK_REJECT,
    payload: payload,
  };
}
function accountsKycBankPopup(payload) {
  return {
    type: accountsConstant.ACCOUNTS_KYC_BANK_POPUP,
    payload: payload,
  };
}
function accountsKycBankApproval(payload) {
  return {
    type: accountsConstant.ACCOUNTS_BANK_KYC_APPROVAL_REQUEST,
    payload: payload,
  };
}
function accountsKycBankList(payload) {
  return {
    type: accountsConstant.ACCOUNTS_BANK_KYC_LIST_REQUEST,
    payload: payload,
  };
}
function accountsPayoutUpdate(payload) {
  return {
    type: accountsConstant.ACCOUNTS_PAYOUT_REQUEST,
    payload: payload,
  };
}
function updateAccountsRowSelected(payload) {
  return {
    type: accountsConstant.ACCOUNTS_SELECTED_ROWS_UPDATE,
    payload: payload,
  };
}
function getAccountBalance(payload) {
  return {
    type: accountsConstant.ACCOUNTS_BALANCE_REQUEST,
    payload: payload,
  };
}
function getAccountsDetailsList(payload) {
  return {
    type: accountsConstant.ACCOUNTS_DETAILS_LIST_REQUEST,
    payload: payload,
  };
}
function accountsDateEnableDisable(payload) {
  let status = false;
  if (payload == 2 || payload == 4) {
    status = true;
  }
  return { type: accountsConstant.ACCOUNTS_DATE_ENABLE, payload: status };
}
function accountsReset() {
  return { type: accountsConstant.ACCOUNTS_RESET, payload: {} };
}

function getCountryList(payload) {
  return { type: accountsConstant.ACCOUNTS_COUNTRY_REQUEST, payload: payload };
}

function accountsInputChange({ prop, value, error }) {
  return {
    type: accountsConstant.ACCOUNTS_INPUT_CHANGE,
    payload: { prop, value, error },
  };
}
