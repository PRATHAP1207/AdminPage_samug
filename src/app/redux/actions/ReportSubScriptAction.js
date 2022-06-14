import { reportSubscript } from 'app/constant/ActionTypes';
import { NotificationManager } from 'react-notifications'
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
    let countryIdListError="",
    reportTypeStatusChangeError="",
         optionChangeError="";

        if(!props.countryIdList){
            countryIdListError="CountryError";
            NotificationManager.error('Please Select the Country');
        }
        if(!props.optionChange){
            optionChangeError="OptionError";
            NotificationManager.error('Select any option');
        }
        if(!props.reportTypeStatusChange){
            reportTypeStatusChangeError="OptionError";
            NotificationManager.error('Select Report Type');
        }

        if(countryIdListError||
            optionChangeError ||
            reportTypeStatusChangeError )
    return {
        type: reportSubscript.GET_SUBSCRIBE_LIST_SHOW_FAILED,
       // payload: props,         
    }
    else{
       // NotificationManager.success('Success');
        return{
          type: reportSubscript.GET_SUBSCRIBE_LIST_SHOW,
        payload: props,
        } 
    }
}





