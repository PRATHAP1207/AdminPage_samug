import { FilesUpload } from '../../constant/ActionTypes'

const initialState = {
    loader: false,
    samugList: [],
    samugListError: '',
    userList: [],
    userListError: '',
    textDatas: '',
    textDatasError: '',
    typesOfFiles: '',
    typesOfFilesError: '',
    videoFiles: '',
    video: '',
    videoError: '',
    audio: '',
    audioError: '',
    image: [],
    imageError: '',
    message: '',
    messageError: '',
    device: '',
    deviceError: '',
    subject: '',
    subjectError: '',
    sms: '',
    smsError: '',
    notiMsg: '',
    notiMsgError: '',
    msgImage: '',
    msgImageError: '',
    selectedSamug: [],
    selectedUser: [],
    uploadPopup: false,
}
const UploadFileReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case FilesUpload.SAMUG_FILE_UPLOAD_OPEN: {
            return { ...state, uploadPopup: true }
        }
        case FilesUpload.SAMUG_FILE_UPLOAD_CLOSE: {
            return { ...state, uploadPopup: false }
        }
        case FilesUpload.SELECT_THE_SAMUG: {
            /* console.log(payload.value)
            let selSam = [...state.selectedSamug,...payload.value]
            console.log("SELECT_THE_SAMUG",selSam)
          */
            return {
                ...state,
                selectedSamug: payload.value, //.value.map((id) => id.id),
            }
        }
        case FilesUpload.REMOVE_SAMUG: {
            return {
                ...state,
                selectedSamug: state.selectedSamug.filter(
                    (item) => item.id != payload.value.id
                ),
            }
        }
        case FilesUpload.SELECT_USER_LIST: {
            return {
                ...state,
                selectedUser: payload.value, //.map((id) => id.id),
            }
        }
        case FilesUpload.REMOVE_USER: {
            return {
                ...state,
                selectedUser: state.selectedUser.filter(
                    (item) => item.id != payload.value.id
                ), //.map((id) => id.id),
            }
        }
        case FilesUpload.INPUT_CHANGE: {
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_CHANGE_FILES: {
            return {
                ...state,
                typesOfFiles: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.VIDEO_INPUT_CHANGE: {
            return {
                ...state,
                video: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.AUDIO_INPUT_CHANGE: {
            return {
                ...state,
                audio: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.IMAGE_INPUT_CHANGE: {
            return {
                ...state,
                image: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_CHANGE_DEVICE: {
          //  console.log('moving redu')
            return {
                ...state,
                device: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_MSG_CHANGE: {
            return {
                ...state,
                message: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_SUB_CHANGE: {
            return {
                ...state,
                subject: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_CHANGE_SMS: {
            return {
                ...state,
                sms: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_CHANGE_NOTI: {
            return {
                ...state,
                notiMsg: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.INPUT_CHANGE_MSGIMAGE: {
            return {
                ...state,
                magImage: payload.value,
                [payload.error]: '',
            }
        }
        case FilesUpload.SAMUGUSER_LIST_REQUEST: {
            return {
                ...state,
                loader: true,
            }
        }
        case FilesUpload.SAMUGUSER_ERROR: {
            return {
                ...state,
                loader: false,
            }
        }
        case FilesUpload.SAMUGUSER_LIST_REQSPONSE: {
            return {
                ...state,
                loader: false,
                samugList: payload.samugList.map((item, i) => {
                    return { name: item.zamugTag, id: item.uid }
                }),
                userList: payload.userList.map((item, i) => {
                    return { name: item.accountId, id: item.id }
                }),
            }
        }
        case FilesUpload.SAMUG_FILE_UPLOAD_REQUEST: {
            return {
                ...state,
                loader: true,
            }
        }
        case FilesUpload.SAMUG_FILE_UPLOAD_RESPONSE: {
            return {
                ...state,
                loader: false,
                textDatas: '',
                textDatasError: '',
                typesOfFiles: '',
                typesOfFilesError: '',
                videoFiles: '',
                video: '',
                videoError: '',
                audio: '',
                audioError: '',
                image: [],
                imageError: '',
                selectedSamug: [],
                selectedUser: [],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}
export default UploadFileReducer
