import React, { Fragment, useEffect } from 'react'
import { Container } from 'app/constant/Common'
import IntlMessages from '../../utils/IntlMessages'
import { Breadcrumb } from 'app/components'
import { SimpleCard } from 'matx'
import MaterialTable from 'material-table'
import { Icon } from '@mui/material'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import Multiselect from 'multiselect-react-dropdown';
import {
    TextField,
    FormControl,
    FormLabel,
    InputLabel,
    Grid,
    Button,
    Box,
} from '@mui/material';
import Moment from "moment";
import Select from 'react-select'
import {
    defaultStatusArray,
    defaultStatusArraySelected,
} from '../../constant/Common'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import { useDispatch, useSelector, batch } from 'react-redux';
import { reportSubscriptAction } from 'app/redux/actions/ReportSubScriptAction'
// import { couponAction } from '../../redux/actions/CouponAction'
 import { getCountryCurrency } from '../../redux/actions/CurrencyReportAction'

export default function SubscriptionReport() {
    const dispatch = useDispatch()
    const CountryInputList = useSelector((state) => state.CurrencyReportReducer)
    const reportSubscribe = useSelector((state) => state.ReportSubscriptReducer)

    useEffect(() => {
      //  dispatch(couponAction.getEmptyCouponList());
        dispatch(getCountryCurrency(CountryInputList))
    }, [dispatch])

    const onDeleteCoupon = (e) => {
        confirmAlert({
            title: 'Relate',
            message: 'Are you sure want to remove the CouponCode.',
            // onKeypressEscape: true,
            closeOnClickOutside: true,
            closeOnEscape: true,

            buttons: [
                {
                    label: 'Yes',
                    // onClick: () => {
                    //   this.props.employeeActiveInactive({
                    //     employeeId: e.employeeId,
                    //     status: e.status,
                    //   });
                    // },
                },
                {
                    label: 'No',
                },
            ],
        })
    }
    const handleGetReport = () => {
        dispatch(reportSubscriptAction.getSubscribedList(reportSubscribe))
    }
   const column= [
      { title: 'Sno', render: (rowData) => rowData.tableData.id + 1  },
      { title: 'Country', field: 'country' },
      { title: 'Coupon-Code', field: 'couponCode' },
      { title: 'Coupon-Mode', field: 'couponMode' },
      { title: 'Coupon-Value', field: 'couponValue' },
    //   {title :'Coupon Percentage' , field:'couponPercentage'},
      { title: 'Discount-type', field: 'discountType' },
      { title: 'Maximum-Count', field: 'maxCount' },
      { title: 'Start-Date', field: 'startDate' },
      { title: 'End-Date', field: 'endDate' },
  ]
  const data=[{'country' : " India"}];
    //  const data=CouponReducer.couponListData  && CouponReducer.couponListData.map((item)=>(
    //   {
    //     country:item.countryId,
    //     couponValue:  item.couponAmount != 0 ?  item.couponAmount : item.couponPercentage + "%",
    //     couponMode:item.couponMode == 1 ? "Subscribe" : item.couponMode == 2 ? "Currency" : "Amount" ,
    //     discountType:item.discountType == 1 ? "Percentage" : "Amount",
    //     couponCode:item.coupon,
    //     maxCount:item.maxCount,
    //     startDate: dateFormat(item.startDate),
    //     endDate:  dateFormat(item.endDate),
  
    //   }
    // ))
    const reportTypes = [
      { name: 'By Datewise', id: 1 },
      { name: 'By LastDate', id: 2 },
  ]

 const reportTypeDropDown = [
    { value: '1', label: 'Subscribed' },
    { value: '2', label: 'Dhan notGenerated' },
    { value: '3', label: 'Top DhanGenerated' },
]
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        // { name: 'Home', path: '/' },
                        {
                            name: <IntlMessages id="title.SubscriptionReport" />,
                        },
                    ]}
                />
            </div>
            <SimpleCard>
                <Grid container spacing={2} style={{ marginBottom: '5px' }}>
                    <Grid item xs style={{ margin: '15px' }}>
                        <TextField
                            size="small"
                            fullWidth={true}
                            InputLabelProps={{ shrink: true }}
                            label={<IntlMessages id="label.country" />}
                            name="countryId"
                            className="mb-4"
                            style={{ marginBottom: '5px', width: '100%' }}
                            onChange={(value) => {
                                dispatch(
                                  reportSubscriptAction.reportSubscriptInputChange({
                                        prop: 'countryIdList',
                                        value: value.target.value,
                                        error: 'countryIdListError',
                                    })
                                )
                            }}
                            required
                            select
                            SelectProps={{ native: true }}
                           value={reportSubscribe.countryIdList}
                            variant="outlined"
                        >
                           
                            {CountryInputList.countryList.map((option) => (
                                // option.id != 0 &&
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs style={{ margin: '15px' }}>
                        <TextField
                            size="small"
                            fullWidth={true}
                            InputLabelProps={{ shrink: true }}
                            label={<IntlMessages id="option" />}
                            name="option"
                            className="mb-4"
                            style={{ marginBottom: '5px', width: '100%' }}
                            onChange={(value) => {
                                dispatch(
                                  reportSubscriptAction.reportSubscriptInputChange({
                                        prop: 'optionChange',
                                        value: value.target.value,
                                        error: 'optionChangeError',
                                    })
                                )
                            }}
                           
                            select
                            SelectProps={{ native: true }}
                           value={reportSubscribe.optionChange}
                            variant="outlined"
                        >
                           <option value="">
                                    Select Any
                                </option>
                            {reportTypes.map((option) => (
                                // option.id != 0 &&
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                
                            ))}
                        </TextField>
                    </Grid>
                    { reportSubscribe.optionChange != "" && 
                    <Grid item xs style={{ margin: '15px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className=" w-full"
                                label={reportSubscribe.optionChange == "2" ? <IntlMessages id="label.Date" />    : <IntlMessages id="label.startDate" />}
                                value={reportSubscribe.startDateList}
                                inputVariant="standard"
                                margin="normal"
                                renderInput={(params) => (
                                    <TextField
                                        size="small"
                                        style={{
                                            marginBottom: '5px',
                                            width: '100%',
                                        }}
                                        {...params}
                                    />
                                )}
                                placeholder="01-01-2020"
                                onChange={(date) => {
                                    dispatch(
                                      reportSubscriptAction.reportSubscriptInputChange({
                                            prop: 'startDateList',
                                            value: date,
                                            error: 'startDateListError',
                                        })
                                    )
                                }}
                                maxDate={new Date()}
                                format="dd-MM-yyyy"
                                inputFormat="dd/MM/yyyy"
                            />
                        </LocalizationProvider>
                    </Grid> }
                    { reportSubscribe.optionChange == "1" && 
                    <Grid item xs style={{ margin: '15px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className=" w-full"
                                label={<IntlMessages id="label.endDate" />}
                               value={reportSubscribe.endDateList}
                                inputVariant="standard"
                                margin="normal"
                                renderInput={(params) => (
                                    <TextField
                                        size="small"
                                        style={{
                                            marginBottom: '5px',
                                            width: '100%',
                                        }}
                                        {...params}
                                    />
                                )}
                                placeholder="01-01-2020"
                                onChange={(date) => {
                                    dispatch(
                                      reportSubscriptAction.reportSubscriptInputChange({
                                            prop: 'endDateList',
                                            value: date,
                                            error: 'endDateListError',
                                        })
                                    )
                                }}
                                maxDate={new Date()}
                                format="dd-MM-yyyy"
                                inputFormat="dd/MM/yyyy"
                            />
                        </LocalizationProvider>
                    </Grid> }
                </Grid>
                <Grid container spacing={6} style={{marginBottom:"50px"}}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl
                            className="mb-4"
                            fullWidth={true}
                            style={{ marginLeft: '30px' }}
                        >
                            <FormLabel>
                                <IntlMessages id="label.reportType" />
                            </FormLabel>
                            <Select
                                className="mb-4 ml-3 w-full selectCustom"
                                options={reportTypeDropDown}
                                value={reportTypeDropDown.filter((val) => {
                                    return (
                                        val.value == reportSubscribe.reportTypeStatusChange
                                    )
                                })}
                                //  value={CouponReducer.statusChange}
                                onChange={(value) => {
                                    dispatch(
                                      reportSubscriptAction.reportSubscriptInputChange({
                                            prop: 'reportTypeStatusChange',
                                            value: value.value,
                                            error: 'reportTypeStatusChangeError',
                                        })
                                    )
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Box
                        display="flex"
                        justifyContent="flex-center"
                        m={1}
                        p={1}
                        bgcolor="background.paper"
                    >
                        <Button
                        className="buttonCouponListGet"
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '52px', marginLeft: '40px' }}
                           onClick={handleGetReport}
                        >
                            <i className="zmdi zmdi-search zmdi-hc-fw" />
                            <span>
                                <IntlMessages id="button.getReport" />
                            </span>
                        </Button>
                    </Box>
                </Grid>
                <MaterialTable
                  onRowClick={(event, rowData) => {
                    console.log(rowData);
                    window.open("GetNewData", "_blank")
                    //event.stopPropagation();
                  }}
                    style={{ paddingLeft: '15px' }}
                    title="Subscription Report"
                    columns={column}
                    data={data}
                    actions={[
                        // {
                        //   icon: () => <Icon style={{ color: "green" }}>edit</Icon>,
                        //   tooltip:<IntlMessages id="label.employeeEdit" />,
                        //   onClick: (event, rowData) => {

                        //    // return alert("You Edit " + rowData.towerId);
                        //   //  return this.props.onEditEmployee({rowData: rowData ,navigation:this.props.navigate});
                        //   },
                        // },
                        (rowData) => ({
                            icon: () => (
                                <Icon style={{ color: 'red' }}>delete</Icon>
                            ),
                            tooltip: <IntlMessages id="label.deleteCoupon" />,
                            onClick: (event, rowData) => {
                                onDeleteCoupon(event)
                                //return confirm("You want to delete " + rowData.name);
                                //    return this.props.onDeleteEmployee(rowData);
                            },
                            //disabled: rowData.birthYear < 2000
                        }),
                    ]}
                    options={{
                        exportButton: true,
                        actionsColumnIndex: -1,
                        search: true,

                        paging: true,
                        headerStyle: { position: 'center' },
                    }}
                />
            </SimpleCard>
        </Container>
    )
}
