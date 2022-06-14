import React, { Component, Fragment } from 'react'
import {
    FormControl,
    FormLabel,
    Grid,
    Button,
    Divider,
    CircularProgress,
    TextField,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import { Box, styled } from '@mui/system'
import DateFnsUtils from '@date-io/date-fns'
import Select from 'react-select'
import IntlMessages from '../../../utils/IntlMessages'
import { defaultReportArrayPayin } from 'app/constant/Common'
import { accountsAction } from 'app/redux/actions/AccountsActions'
import { connect } from 'react-redux'
import PayinListTable from './payinListTable'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Container } from 'app/constant/Common'
import { Breadcrumb, SimpleCard } from 'app/components'
class PayinList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            dateShow: false,
            acceptStatus: false,
            remarks: '',
        }
        this.onEditEmployee = this.onEditEmployee.bind(this)
        this.onDeleteEmployee = this.onDeleteEmployee.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.accountsReset()
        this.props.getCountryList()
        this.props.accountInputChange({
            prop: 'reportType',
            value: 1,
            error: 'reportTypeError',
        })
    }
    handleChange(event) {
        this.setState({ remarks: event.target.value })
        //console.log(this.state.remarks);
    }
    handelEvent = (e) => {
        e.preventDefault()
        this.props.getAccountsDetailsList(this.props)
    }
    onEditEmployee(e) {
        // this.props.getEmployeeEdit(e.employeeId);
    }

    onDeleteEmployee(e) {
        //this.setState({ open: true });
        confirmAlert({
            title: 'Employee Active InActive',
            message:
                e.status === '1'
                    ? 'Are you sure want to remove the employee.'
                    : 'Are you sure want to active the employee.',
            // onKeypressEscape: true,
            closeOnClickOutside: true,
            closeOnEscape: true,

            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.employeeActiveInactive({
                            employeeId: e.employeeId,
                            status: e.status,
                        })
                    },
                },
                {
                    label: 'No',
                },
            ],
        })
    }
    /***  if (this.props.reportType == 2 || this.props.reportType == 4) {
      this.setState({ dateShow: true });
    } else {
      this.setState({ dateShow: false });
    } */
    render() {
        return (
            <Container>
                 <div className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Home', path: '/' },
              {
                name: (
                  <IntlMessages id="title.payin" />
                ),
              },
            ]}
          />
          </div>
                <Fragment>
                    {this.props.loader ? (
                        <div className="loader-view  loader">
                            <CircularProgress size={54} />
                        </div>
                    ) : null}
                    <SimpleCard title={<IntlMessages id="title.payin" />}>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <FormControl
                                    className="mb-4"
                                    style={{ marginLeft: '10px' }}
                                    fullWidth={true}
                                >
                                    <FormLabel>
                                        {<IntlMessages id="label.country" />}
                                    </FormLabel>
                                    <Select
                                        className="mb-4 w-full selectCustom"
                                        options={this.props.countryList}
                                        value={this.props.countryList.filter(
                                            (option) =>
                                                option.value ==
                                                this.props.countryId
                                        )}
                                        isSearchable={true}
                                        maxMenuHeight={180}
                                        onChange={(value) => {
                                            this.props.accountInputChange({
                                                prop: 'countryId',
                                                value: value.value,
                                                error: 'countryIdError',
                                            })
                                        }}
                                    />

                                    <div className="mb-2 form_error">
                                        {this.props.countryIdError}
                                    </div>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <FormControl className="mb-4" fullWidth={true}>
                                    <FormLabel>
                                        {<IntlMessages id="label.reportType" />}
                                    </FormLabel>
                                    <Select
                                        className="mb-4 w-full selectCustom"
                                        options={defaultReportArrayPayin}
                                        value={defaultReportArrayPayin.filter(
                                            (option) =>
                                                option.value ==
                                                this.props.reportType
                                        )}
                                        onChange={(value) => {
                                            this.props.accountInputChange({
                                                prop: 'reportType',
                                                value: value.value,
                                                error: 'reportTypeError',
                                            })
                                            this.props.accountsDateEnableDisable(
                                                value.value
                                            )
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            {this.props.dateEnable ? (
                                <>
                                    <Grid item xs>
                                        <FormControl
                                            className="mb-4"
                                            fullWidth={true}
                                        >
                                            <FormLabel>
                                                {
                                                    <IntlMessages id="label.fromDate" />
                                                }
                                            </FormLabel>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DesktopDatePicker
                                                    className="mb-4 w-full"
                                                    value={this.props.fromDate}
                                                    inputVariant="standard"
                                                    margin="normal"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            style={{
                                                                marginBottom:
                                                                    '20px',
                                                                width: '100%',
                                                            }}
                                                            {...params}
                                                        />
                                                    )}
                                                    onChange={(date) => {
                                                        this.props.accountInputChange(
                                                            {
                                                                prop: 'fromDate',
                                                                value: date,
                                                                error: 'fromDateError',
                                                            }
                                                        )
                                                    }}
                                                    maxDate={new Date()}
                                                    format="dd-MM-yyyy"
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl
                                            className="mb-4"
                                            fullWidth={true}
                                        >
                                            <FormLabel>
                                                {
                                                    <IntlMessages id="label.toDate" />
                                                }
                                            </FormLabel>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DesktopDatePicker
                                                    className="mb-4 w-full"
                                                    value={this.props.toDate}
                                                    inputVariant="standard"
                                                    placeholder="01-01-2020"
                                                    margin="normal"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            style={{
                                                                marginBottom:
                                                                    '20px',
                                                                width: '100%',
                                                            }}
                                                            {...params}
                                                        />
                                                    )}
                                                    onChange={(date) => {
                                                        this.props.accountInputChange(
                                                            {
                                                                prop: 'toDate',
                                                                value: date,
                                                                error: 'toDateError',
                                                            }
                                                        )
                                                    }}
                                                    maxDate={new Date()}
                                                    format="dd-MM-yyyy"
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                </>
                            ) : (
                                ''
                            )}
                        </Grid>
                        <Box
                            display="flex"
                            justifyContent="flex-center"
                            m={1}
                            p={1}
                            bgcolor="background.paper"
                        >
                            <Button
                            className="payInDetails"
                                variant="contained"
                                color="primary"
                                onClick={this.handelEvent}
                            >
                                <i className="zmdi zmdi-search zmdi-hc-fw" />
                                <span>
                                    {<IntlMessages id="button.getDetails" />}
                                </span>
                            </Button>
                        </Box>
                    </SimpleCard>
                    <Box py="12px" />
                    <SimpleCard
                        title={
                            <IntlMessages
                                id={'title.payment' + this.props.reportType}
                            />
                        }
                    >
                        <div className="pt-sm-24 pb-0">
                            <PayinListTable
                                className="mb-4 w-full"
                                //onEditEmployee={this.onEditEmployee}
                                //onDeleteEmployee={this.onDeleteEmployee}
                                tableName=""
                                result={this.props}
                            />
                        </div>
                    </SimpleCard>
                </Fragment>
            </Container>
        )
    }
}
const mapToStateProps = (state) => {
    const {
        loader,
        messageError,
        messageSuccess,
        messageWarning,
        message,
        countryList,
        countryId,
        reportType,
        fromDate,
        toDate,
        accountBalance,
        searchValue,
        dateEnable,
        accountsList,
        payoutSelected,
        selectedAmount,
    } = state.accounts
    const { login } = state
    return {
        loader,
        messageError,
        messageSuccess,
        messageWarning,
        message,
        countryList,
        countryId,
        reportType,
        fromDate,
        toDate,
        accountBalance,
        searchValue,
        dateEnable,
        login,
        accountsList,
        payoutSelected,
        selectedAmount,
    }
}
const mapDispatchToProps = {
    accountInputChange: accountsAction.accountsInputChange,
    accountsReset: accountsAction.accountsReset,
    getCountryList: accountsAction.getCountryList,
    accountsDateEnableDisable: accountsAction.accountsDateEnableDisable,
    getAccountsDetailsList: accountsAction.getAccountsDetailsList,
    updateAccountsRowSelected: accountsAction.updateAccountsRowSelected,
    accountsPayoutUpdate: accountsAction.accountsPayoutUpdate,
}
export default connect(mapToStateProps, mapDispatchToProps)(PayinList)
