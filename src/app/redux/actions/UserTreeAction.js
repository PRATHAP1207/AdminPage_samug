import { userTreeConstant } from 'app/constant/ActionTypes'

export const GetChangetheTree = (props) => {
    return {
        type: userTreeConstant.CHANGETHETREE,
        payload: props,
    }
}

export const getGrandChild = () => {
    return {
        type: userTreeConstant.GETGRANDCHILD,
        payload: '',
    }
}
export const getSearchRoleForTree = (props) => {
    return {
        type: userTreeConstant.SEARCHROLEFORTREE,
        payload: props,
        
    }
}
export const getDetailsOfMember = (props) => {
    return {
        type: userTreeConstant.GETDETAILSFORTREE,
        payload: props,
    }
}
export const getDetailsFromParent = (props) => {
    return {
        type: userTreeConstant.GET_MEMBER_FROM_PARENT,
        payload: props,
    }
}
