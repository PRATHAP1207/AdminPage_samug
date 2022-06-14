import { reportSubscript } from 'app/constant/ActionTypes'
export const reportSubscriptAction = {
    reportSubscriptInputChange,
    getSubscribedList
}

function reportSubscriptInputChange(props) {
    return {
        type: reportSubscript.INPUT_CHANGE_SUBSCRIBE,
        payload: props,
           
    }
}
function getSubscribedList(props) {
    return {
        type: reportSubscript.GET_SUBSCRIBE_LIST_SHOW,
        payload: props,
           
    }
}





