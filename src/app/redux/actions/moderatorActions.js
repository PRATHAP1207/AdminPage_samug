import { moderatorConstant } from 'app/constant/ActionTypes'

export const moderatorAction = {
    getModeratorList,
    moderatorInputChange,
    getModeratorReset,
    getCountryList,
    moderatorRecordView,
    loadMoreRecord,
    moderatorStatus,
}
function moderatorStatus({ accountId, userId, mode, types, remarks }) {
    return {
        type: moderatorConstant.MODERATOR_STATUS_REQUEST,
        payload: { accountId, userId, mode, types, remarks },
    }
}
function loadMoreRecord(payload) {
    return {
        type: moderatorConstant.MODERATOR_LOAD_MORE_REQUEST,
        payload: payload,
    }
}
function moderatorRecordView(payload) {
   // console.log('payload', payload)
    return {
        type: moderatorConstant.MODERATOR_RECORD_VIEW_REQUEST,
        payload: payload,
    }
}
function getCountryList() {
    return {
        type: moderatorConstant.MODERATOR_COUNTRY_REQUEST,
        payload: {},
    }
}
function getModeratorReset(payload) {
    return {
        type: moderatorConstant.MODERATOR_RESET,
        payload: {},
    }
}
function getModeratorList(payload) {
    return {
        type: moderatorConstant.MODERATOR_LIST_REQUEST,
        payload: payload,
    }
}
function moderatorInputChange({ prop, value, error }) {
    return {
        type: moderatorConstant.MODERATOR_INPUT_CHANGE,
        payload: { prop, value, error },
    }
}
