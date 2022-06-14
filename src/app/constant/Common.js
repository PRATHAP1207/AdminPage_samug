import { reactLocalStorage } from 'reactjs-localstorage'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { FmdBadTwoTone } from '@mui/icons-material'
import Moment from 'moment';
import { useSelector } from 'react-redux';
var crypto = require('crypto')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('v5UdaV22BNPVoQH8xUETc7TM')
// //let api1 = "http://78.140.141.238:5002/V1/";
// //let api =  "https://cors-anywhere.herokuapp.com/http://78.140.141.238:5002/api/V1/";
// //let loginApi =  "https://cors-anywhere.herokuapp.com/http://78.140.141.238:5002/V1/";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = 'http://152.67.4.117:8080/'
//const BASE_URL = 'https://adminapi.samug.com/'
const BASE_URL = 'https://admin.samug.in/'
//const BASE_URL=process.env.REACT_APP_BASE_URL
let api = BASE_URL + 'api/V1/'
let loginApi = BASE_URL + 'V1/'
// export var captchKey = "6LcCu_8aAAAAABR-v5UdaV22BNPVoQH8xUETc7TM";
// export var captchKey1 = "6LcCu_8aAAAAAKaZI9ZXsoeRXAgJ9tFhyl1qdXIR"; //Server
export var IMAGE_TYPE = 'image/jpeg, image/png'
// export var FILE_TYPE =
//   "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
// export var IS_LOGIN = false;
// export var TOWER_LOGO_SIZE = 200; //KBS
export var EMPLOYEE_IMAGE_SIZE = 300
// export var PROMO_VIDEO_SIZE = 10000;
// export var PROMO_VIDEO_TYPE = "video/mp4";
export var API_URL = { api: api }
export var API_URL_LOGIN = { api: loginApi }
export var LOGIN_AUTH='loginChk'
export var GOOGLE_CONFIRM='goConf'
export var LOGIN_API = 'loginChk'
export var PASS_UP = 'passUp'
export var FWT_PASS = 'fwtPass'
export var GETCOUNTRY = 'getDropdown1'
export var GETSTATE = 'getDropdown1'
export var GETCITY = 'getDropdown1'
export var SAVE_EMP = 'newEmployee'
export var EMP_LST = 'empList'
export var EMP_EDIT = 'empEdit'
export var EMP_RM = 'empStatus'
export var EMP_EMAIL_CHECK = 'empEmailCheck'
export var CANG_PASS = 'cngPass'
export var ACC_DETAILS = 'payList'
export var ACC_BAL = 'accBal'
export var PAY_OUT = 'payOutBnk'
export var BANK_KYC_LST = 'bankKycLst'
export var BANK_KYC_APP = 'bankKycApp'
export var MOD_LIST = 'modLst'
export var USR_POST = 'userZamugPost'
export var MOD_STS = 'moderatStatus'
export var GETDHANTYPE = "lngPresLog";
export var ROL_LIST = 'roleList'
export var ROL_UP = 'rolesUpdate'
export var ROL_STS = 'rolesStatus'
export var GETMEMBER = 'membView'
export var COUPONLIST ="couponLst"
export var SAVECOUPON="couponGen"
export var GETALLCOUNTRY = 'usrJnRpt'
export var GETCOUNTRYTABLEDHAN = 'getDhandet'
export var GETCURRENCYDATA = 'purchDetails'
export var GETCURRENCYDATEWISE = 'rwdPurchDetails'
export var GETCOUNTRYDATA = 'usrRepCntry'
export var GETCOUNTRYLIST = 'usrRepCntry'
export var GETDHANDATEWISE = 'usrDhan'
export var SAMUGUSERLIST = 'samUsrLst'
export var SAMUGFILEUPLOAD = 'objUpload'
export var loginheaders = {
    'Content-Type': 'application/json;charset=UTF-8',
}
export var headers = {
    //  "Content-Type": "application/x-www-form-urlencoded",
    'access-control-allow-credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${getJwtToken()}`,
    Accept: 'application/json',
    //"Access-Control-Allow-Origin": "http://localhost:3000/"
    'Access-Control-Allow-Headers': 'Authorization',
}

export var headers1 = {
    'Content-Type': 'multipart/form-data; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Authorization: getJwtToken(),
}
// export const defaultArray = [{ value: "0", label: "Select All" }];
export const defaultStatusArray = [
    { value: '1', label: 'Active' },
    { value: '2', label: 'InActive' },
]
// //1-subscription,2.Reward Purchase, 3-Encash Amount to user account
export const defaultReportArray = [
    { value: '3', label: 'Pending PayOut' },
    { value: '4', label: 'DateWise Pending PayOut' },
]
export const defaultReportArrayPayin = [
    { value: '1', label: 'PayIn' },
    { value: '2', label: 'DateWise PayIn' },
]
export const defaultModetatorArray = [
    { value: '1', label: 'All Pending Post' },
    { value: '2', label: 'Search By AccountID' },
    { value: '3', label: 'Search By Person' },
    { value: '4', label: 'Search By Zamug ID' },
    { value: '5', label: 'Search By Zamug Name' },
    { value: '6', label: 'Search By Post ID' },
    { value: '7', label: 'All Pending User' },
    { value: '8', label: 'Search By User name' },
]

export const defaultBankKycArray = [
    { value: '1', label: 'Bank Approval List' },
    { value: '2', label: 'Bank List DateWise' },
    { value: '3', label: 'KYC Approval List' },
    { value: '4', label: 'KYC List DateWise' },
]
export const searchListForTree = [
    { value: '1', label: 'AccountId' },
    { value: '2', label: 'Account Name' },
    { value: '3', label: 'Email id' },
    { value: '4', label: 'Contact Number' },
    { value: '5', label: 'Reference Id' },
]
export const defaultListView = [
    { value: '1', label: 'Invitation Code' },
    { value: '2', label: 'EmailId' },
    { value: '3', label: 'contact No' },
    { value: '4', label: 'lastSubscribeDate' },
    { value: '5', label: 'balanceShareAmount' },
    { value: '6', label: 'dhanBalance' },
    { value: '7', label: 'dhanDate' },
]

export const couponMode = [
    { value: '1', label: 'Subscribe' },
    { value: '2', label: 'Currency' },
    { value: '3', label: 'Amount' },
]

export const couponType = [
  
    { value: '1', label: 'Percentage(%)' },
    { value: '2', label: 'Amount' },
]
export const defaultStatusArraySelected = [{ value: '1', label: 'Active' }]
// export const defaultRecpHeader = "#3f51b5";
// export const defaultEmpHeader = "#3f51b5";
// export const devPasscode = "9876";
export const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))
export const generalFunction = {
    changeTimezone,
    getHeader,
    getHeader1,
    setLocalData,
    getLocalData,
    getInitial,
    convertJsonParse,
    encryptedString,
    decryptedString,
    generateBunnyToken,
    changeDateFormat,
}


function changeDateFormat(date) {
    return Moment(date).format('DD-MM-YYYY')
}
function convertJsonParse(str) {
    let jsonData = ''
    try {
        jsonData = JSON.parse(str)
    } catch (e) {
        //return false;
        jsonData = str
    }
    //return true;
    return jsonData
}
function getInitial(name = '') {
    var abc = name
        .replace(/\s+/, ' ')
        .split(' ')
        .slice(0, 2)
        .map((v) => v && v[0].toUpperCase())
        .join('')
    return abc
}
function setLocalData(key, value) {
    reactLocalStorage.set(key, value)
}

function getLocalData(key) {
    return reactLocalStorage.get(key)
}

function generateBunnyToken(url) {
    var bunnyToken = '602c9b59-fd80-4127-a9fd-d46f40a0e2e0' //process.env.BUNNY_TOKEN
    // Set the time of expiry to one hour from now
    var expHours = 5
    var expires = Math.round(Date.now() / 1000) + expHours * 3600
    var hashableBase = bunnyToken + url + expires

    var md5String = crypto
        .createHash('md5')
        .update(hashableBase)
        .digest('binary')
    var token = new Buffer(md5String, 'binary').toString('base64')
    token = token.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')

    // console.log(bunnyToken, expires, hashableBase)
    return '?token=' + token + '&expires=' + expires
}
function getHeader1() {
    let headers = {
        'Content-Type': 'multipart/form-data; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: getJwtToken(),
    }
    return headers
}
function getHeader() {
    let headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With, Accept",
        'Access-Control-Allow-Methods':
            'GET, POST, OPTIONS, PUT, DELETE,OPTIONS',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: getJwtToken(),
    }
    return headers
}
function getJwtToken() {
  //  const sessionLoginToken = useSelector((state)=>state.login);
    var abc = localStorage.getItem('tokenId')
  //  console.log("Getting the Token",sessionLoginToken);
    //sessionStorage.getItem("tokenId")
    return abc
}


function changeTimezone(date1, ianatz) {
    // suppose the date is 12:00 UTC
    var date = new Date(date1 * 1000)
    var invdate = new Date(
        date.toLocaleString('en-US', {
            timeZone: ianatz,
        })
    )

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime()

    // so 12:00 in Toronto is 17:00 UTC
    var finalDate = new Date(date.getTime() + diff)
    var dateFormat =
        finalDate.getDate() +
        '-' +
        (finalDate.getMonth() + 1) +
        '-' +
        finalDate.getFullYear() //finalDate.toLocaleDateString();
    var timeFormat = finalDate.toLocaleTimeString()
    return dateFormat + ' ' + timeFormat
}
function encryptedString(data) {
    if (data != '' && data != null) {
        const encryptedString = cryptr.encrypt(data)
        return encryptedString
    }
    return ''
}
function decryptedString(data) {
    if (data != '' && data != null) {
        const decryptedString = cryptr.decrypt(data)
        return decryptedString
    }
    return ''
}

export const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))


export const  withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
  } 
