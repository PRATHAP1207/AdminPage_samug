import React, { Fragment, useEffect } from 'react'
import { Container } from 'app/constant/Common'
import IntlMessages from '../../utils/IntlMessages'
import { Breadcrumb } from 'app/components'
import { SimpleCard } from 'matx'
import MaterialTable from 'material-table'
import { Icon } from '@mui/material'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {
    TextField,
    FormControl,
    FormLabel,
    Grid,
    Button,
    Divider,
    RadioGroup,
    InputLabel,
    Box,
    CircularProgress,
} from '@mui/material';
import Moment from "moment";
import Select from 'react-select'
import {
    defaultStatusArray,
    defaultStatusArraySelected,
} from '../../constant/Common'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import { useDispatch, useSelector, batch } from 'react-redux'
import { couponAction } from '../../redux/actions/CouponAction'
import { getCountryCurrency } from '../../redux/actions/CurrencyReportAction'

export default function CouponTableList() {
    const dispatch = useDispatch()
    const CountryInputList = useSelector((state) => state.CurrencyReportReducer)
    const CouponReducer = useSelector((state) => state.CouponReducer)

    useEffect(() => {
        dispatch(couponAction.getEmptyCouponList());
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
    const handelEvent = () => {
        dispatch(couponAction.getCouponList(CouponReducer))
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
     const data=CouponReducer.couponListData  && CouponReducer.couponListData.map((item)=>(
      {
        country:item.countryId,
        couponValue:  item.couponAmount != 0 ?  item.couponAmount : item.couponPercentage + "%",
        couponMode:item.couponMode == 1 ? "Subscribe" : item.couponMode == 2 ? "Currency" : "Amount" ,
        discountType:item.discountType == 1 ? "Percentage" : "Amount",
        couponCode:item.coupon,
        maxCount:item.maxCount,
        startDate: dateFormat(item.startDate),
        endDate:  dateFormat(item.endDate),
  
      }
    ))

    function dateFormat(date){
        const newDate = new Date(date);
        //console.log(newDate.toLocaleDateString());
        // return newDate.toLocaleDateString();
        return Moment(newDate).format("DD-MM-YYYY");
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        // { name: 'Home', path: '/' },
                        {
                            name: <IntlMessages id="title.couponTableList" />,
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
                                    couponAction.couponInputChange({
                                        prop: 'countryIdList',
                                        value: value.target.value,
                                        error: 'countryIdListError',
                                    })
                                )
                            }}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={CouponReducer.countryIdList}
                            variant="outlined"
                        >
                            {CountryInputList.countryList.map((option) => (
                                option.id != 0 &&
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs style={{ margin: '15px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className=" w-full"
                                label={<IntlMessages id="label.startDate" />}
                                value={CouponReducer.startDateList}
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
                                        couponAction.couponInputChange({
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
                    </Grid>
                    <Grid item xs style={{ margin: '15px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className=" w-full"
                                label={<IntlMessages id="label.endDate" />}
                                value={CouponReducer.endDateList}
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
                                        couponAction.couponInputChange({
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
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl
                            className="mb-4"
                            fullWidth={true}
                            style={{ marginLeft: '30px' }}
                        >
                            <FormLabel>
                                <IntlMessages id="label.status" />
                            </FormLabel>
                            <Select
                                className="mb-4 ml-3 w-full selectCustom"
                                options={defaultStatusArray}
                                value={defaultStatusArray.filter((val) => {
                                    return (
                                        val.value == CouponReducer.statusChange
                                    )
                                })}
                                //   value={CouponReducer.statusChange}
                                onChange={(value) => {
                                    dispatch(
                                        couponAction.couponInputChange({
                                            prop: 'statusChange',
                                            value: value.value,
                                            error: 'statusChangeError',
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
                            onClick={handelEvent}
                        >
                            <i className="zmdi zmdi-search zmdi-hc-fw" />
                            <span>
                                <IntlMessages id="button.search" />
                            </span>
                        </Button>
                    </Box>
                </Grid>
                <MaterialTable
                    style={{ paddingLeft: '15px' }}
                    title="Coupon Details"
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
