import {UserDetail} from "app/constant/ActionTypes";
  
  
  export const GetChangetheTree = (props) => {
    return {
      type: UserDetail.CHANGETHETREE,
      payload: props
    }
  }
  export const InputChange = (props) => {
    return {
      type:UserDetail.INPUT_CHANGE_COUNTRY,
      payload:props
    }
  }
  export const RemoveCountry = (props) => {
    return{
      type:UserDetail.REMOVE_COUNTRY,
      payload:props
    }
  }
  export const InputChangeDate= (props) =>{
    return{
      type:UserDetail.INPUT_CHANGE_DATE,
      payload:props
    }
  }
  export const getUserProcessData = (props) =>{
    return{
      type:UserDetail.GET_USER_DATA,
      payload:props

    }
  }
  export const getExcel = (props) =>{
    return{
      type:UserDetail.GET_EXCEL,
      payload:props

    }
  }
  export const resetSamugUserLogin = () => {
    return{
      type:UserDetail.RESET_SAMUG_USER,
      payload:{}
    }
  }