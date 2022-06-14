import { userTreeConstant, Graph } from 'app/constant/ActionTypes'

const initialState = {
    loader: false,
    grandChild: 'false',
    cdnURL: '',
    parent: 'parent',
    searchRoleInTree: '0',
    searchdetails: '',
    child: 'child',
    ShowCardForTree: false,
    childrens: [],

    month: [],
    YearMonth: '',
    renewal: [],
    sno: 0,
    monthName: [],
    CountryChange: [],
    selectedValues: [],
    displayValue: '',
    monthError: [],

    RemoveOption: [],
    excelData: [],
    RemoveMonth: [],
    RemoveCountry: [],
    CountryListDropDown: [],
    YearMonthError: '',
    userId: JSON.parse(localStorage.getItem('user_id')),
    GraphData: [],
    optionChange: '',
    totalGraphTable: [],
    optionChangeError: '',
    fromInputDate: new Date(),
    fromInputDateError: '',
    toInputDate: new Date(),
    toInputDateError: '',
    selectedValue: [],
    graphApidata: [],
    splitData: "",
    selectedValueError: '',
    onRemove: [],
    selectedList: [],
    CountryDropDown: [],
    Year: [],
    yearDate: [],
    year: '',
    countryId: '',
    yearError: '',
    country: [],
    countryError: '',
    tableListGraph: [],
    yearMultiSelect: [],
    Graphcolumns: [],
    SNO: '',
}
const UserTreeReducer = function (state = initialState, { type, payload }) {
    switch (type) {
        case userTreeConstant.CHANGETHETREE: {
            return {
                ...state,
                child: [payload],
            }
        }
        case userTreeConstant.GETGRANDCHILD: {
            return {
                ...state,
                grandChild: 'true',
            }
        }
        case userTreeConstant.SEARCHROLEFORTREE: {
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
            }
            
        }

        case userTreeConstant.GETDETAILSFORTREE: {
            return {
                ...state,
                loader: true,
                grandChild: 'false',
            }
        }
        case userTreeConstant.GET_MEMBER_DETAILS_SUCCESS: {
            return {
                ...state,
                loader: false,
                cdnURL: payload.cdnUrl,
                parent: payload.parent,
                child: payload.member,
                childrens: payload.child1,
                ShowCardForTree: true,
            }
        }
        case userTreeConstant.GET_MEMBER_FROM_PARENT: {
            return {
                ...state,
                loader: true,
                grandChild: 'false',
            }
        }
        case userTreeConstant.ERROR_IN_SEARCH: {
            return {
                ...state,
                loader: false,
            }
        }
        case userTreeConstant.TREE_ERROR: {
            localStorage.clear();
            window.location.reload();
            return { ...state,
               loader: false,
               };
        }
        case Graph.GET_DETAILS_FOR_PDF: {
           // console.log('grapghTeducers', payload)
            return {
                ...state,
                GraphData: payload,
            }
        }
        case Graph.CHANGE_THE_VALUE: {
            //console.log("reducer year",payload)
            return {
                ...state,
                [payload.props]: payload.value,
                [payload.error]: '',
            }
        }
        case Graph.CHANGE_THE_DATE: {
            // console.log("dateee",payload)
            return {
                ...state,
                [payload.prop]: payload.value,
                [payload.error]: '',
            }
        }
        case Graph.SELECT_THE_MONTH: {
          //   console.log("reducers month",payload)
            return {
                ...state,
                month: payload.value.map((id) => id.id),
            }
        }
        case Graph.GET_COUNTRY_LIST: {
            //console.log("Reducer get country",payload)
            return {
                ...state,
                loader: true,
                countryId: 0,
            }
        }
        case Graph.DISPLAY_COUNTRY_LIST: {
            // console.log("display country",payload)
            return {
                ...state,
                loader: false,
                CountryListDropDown: payload,
            }
        }
        case Graph.YEAR_CHANGE: {
            // console.log("reduceryear",payload.value.map((id)=>id.id))
            return {
                ...state,
                Year: payload.value.map((id) => id.id),
            }
        }
        case Graph.CHANGE_THE_COUNTRY: {
            // console.log("counreducer",payload.value.map((id)=>id.id))
            return {
                ...state,
                CountryChange: payload.value.map((id) => id.id),
            }
        }
        case Graph.DISPLAY_YEAR_DROPDOWN: {
            // console.log("main",payload);
            return {
                ...state,
                yearMultiSelect: payload,
            }
        }
        case Graph.HANDLE_THE_OPTIONS_YEAR: {
            return {
                ...state,
                optionChange: payload,
            }
        }
        case Graph.REMOVE_THE_YEAR: {
            return {
                ...state,
                Year: payload.map((id) => id.id),
            }
        }
        case Graph.REMOVE_MONTH_DATA: {
            return {
                ...state,
                month: payload.map((id) => id.id),
            }
        }
        case Graph.REMOVE_COUNTRY: {
            return {
                ...state,
                CountryChange: payload.map((id) => id.id),
            }
        }
        case Graph.GET_TABLE_LIST: {
           // console.log('getReducer table', payload)
            return {
                ...state,
                loader: true,
            }
        }

        case Graph.DISPLAY_TABLE_LIST: {
           // console.log('displayReducer table', payload)
            return {
                ...state,
                totalGraphTable: payload,
                graphApidata: payload.data.data1,
                tableListGraph: payload.data.data,
                splitData: payload.data.splitData
            }
        }
        case Graph.YEARMONTH_INPUT_CHANGE: {
           // console.log('YEARMONTH_INPUT_CHANGE', payload)
            return {
                ...state,
                [payload.props]: payload.value,
                [payload.error]: '',
            }
        }
        case Graph.GET_EXCEL_DETAILS: {
            return {
                ...state,
                excelData: payload,
            }
        }
        case Graph.RESET_DATA_SUBSCRIPTION: {
            //console.log("reset")
           // localStorage.removeItem('storageTableListData')
            return {
              ...state,
              CountryChange: [],
              selectedValues: [],
              CountryListDropDown: [],
              optionChange: [],
              month: [],
              Year: [],
              fromInputDate:new Date(),
              toInputDate:new Date(),
      
            }
          }
        default: {
            return state
        }
    }
}
export default UserTreeReducer
