import { FilesUpload } from '../../constant/ActionTypes'
export const openPopUp = () => {
    return {
        type: FilesUpload.SAMUG_FILE_UPLOAD_OPEN,
        payload: {},
    }
}
export const closePopUp = () => {
    return {
        type: FilesUpload.SAMUG_FILE_UPLOAD_CLOSE,
        payload: {},
    }
}
export const uploadSamugFile = (props) => {
    return {
        type: FilesUpload.SAMUG_FILE_UPLOAD_REQUEST,
        payload: props,
    }
}
export const getSamugUserList = (props) => {
    return {
        type: FilesUpload.SAMUGUSER_LIST_REQUEST,
        payload: props,
    }
}
export const removeSamugList = (props) => {
    return {
        type: FilesUpload.REMOVE_SAMUG,
        payload: props,
    }
}
export const selectTheSamug = (props) => {
    return {
        type: FilesUpload.SELECT_THE_SAMUG,
        payload: props,
    }
}
export const selectTheUser = (props) => {
    return {
        type: FilesUpload.SELECT_USER_LIST,
        payload: props,
    }
}
export const removeUserList = (props) => {
    return {
        type: FilesUpload.REMOVE_USER,
        payload: props,
    }
}
export const inputChange = (props) => {
    return {
        type: FilesUpload.INPUT_CHANGE,
        payload: props,
    }
}
export const inputChangeFiles = (props) => {
    return {
        type: FilesUpload.INPUT_CHANGE_FILES,
        payload: props,
    }
}
export const videoInputChange = (props) => {
    return {
        type: FilesUpload.VIDEO_INPUT_CHANGE,
        payload: props,
    }
}
export const audioInputChange = (props) => {
    return {
        type: FilesUpload.AUDIO_INPUT_CHANGE,
        payload: props,
    }
}
export const imageInputChange = (props) => {
    return {
        type: FilesUpload.IMAGE_INPUT_CHANGE,
        payload: props,
    }
}
export const inputChangeDevice = (props) => {
    //console.log('moving ac')
    return {
        type: FilesUpload.INPUT_CHANGE_DEVICE,
        payload: props,
    }
}
export const inputChangeMsg = (props) => {
    return {
        type: FilesUpload.INPUT_MSG_CHANGE,
        payload: props,
    }
}
export const inputChangeSubject = (props) => {
    return {
        type: FilesUpload.INPUT_SUB_CHANGE,
        payload: props,
    }
}
export const inputChangeText = (props) => {
    return {
        type: FilesUpload.INPUT_CHANGE_SMS,
        payload: props,
    }
}
export const inputChangeNoti = (props) => {
    return {
        type: FilesUpload.INPUT_CHANGE_NOTI,
        payload: props,
    }
}
export const inputChangeImage = (props) => {
    return {
        type: FilesUpload.INPUT_CHANGE_MSGIMAGE,
        payload: props,
    }
}
