import React, { Component, Fragment } from 'react'
import { SimpleCard } from 'matx';
import { Breadcrumb } from 'app/components';
import {
    FormControl,
    FormLabel,
    Grid,
    Button,
    Divider,
    Box,
    CircularProgress,
    Card,
    CardHeader,
    TextField,
} from '@mui/material'
import Select from 'react-select'
import { defaultModetatorArray } from '../../constant/Common'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import ModetatorTextView from './ModetatorTextView'
import ModetatorVideoView from './ModetatorVideoView'
import ModetatorImageView from './ModetatorImageView'
import { moderatorAction } from 'app/redux/actions/moderatorActions'
import IntlMessages from '../../utils/IntlMessages'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

//import DateFnsUtils from "@date-io/date-fns";
import ModeratorListTable from './moderatorListTable'
import UserProfile from './userProfile'
import { NotificationManager } from 'react-notifications'
import { Container } from '../../constant/Common'

class ModetatorList extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            acceptStatus: false,
            remarks: '',
        }
        this.onEditEmployee = this.onEditEmployee.bind(this)
        this.onDeleteEmployee = this.onDeleteEmployee.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.getModeratorReset()

        //  this.props.getCountryList();
    }
    handleChange(event) {
        this.setState({ remarks: event.target.value })
        //console.log(this.state.remarks);
    }
    handelEvent = (e) => {
        e.preventDefault()
        if (this.props.reportType != 1 && this.props.reportType != 7) {
            if (this.props.searchId != '') {
                this.props.getModeratorList(this.props)
            } else {
                NotificationManager.error("Search Text can't empty")
            }
        } else {
            this.props.getModeratorList(this.props)
        }
    }
    onEditEmployee(e) {
        this.props.getEmployeeEdit(e.employeeId)
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
    render() {
        return (
            <Container>
                   <div className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Home', path: '/' },
              {
                name: (
                  <IntlMessages id="title.moderatorList" />
                ),
              },
            ]}
          />
        </div>
                <Fragment>
                    {this.props.loader && (
                        <div className="loader-view  loader">
                            <CircularProgress size={54} />
                        </div>
                    )}
                    <Card style={{ margin: 10 }}>
                        <CardHeader></CardHeader>
                        <Grid container spacing={3} style={{ margin: 5 }}>
                            <Grid item xs style={{ display: 'none' }}>
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={<IntlMessages id="label.country" />}
                                    name="countryId"
                                    onChange={(value) => {
                                        this.props.moderatorInputChange({
                                            prop: 'countryId',
                                            value: value.target.value,
                                            error: 'countryIdError',
                                        })
                                        this.props.getState({
                                            countryId: value.target.value,
                                        })
                                    }}
                                    className="mb-4 w-full"
                                    style={{
                                        marginBottom: '20px',
                                        width: '100%',
                                    }}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={this.props.countryId}
                                    variant="outlined"
                                >
                                    {this.props.countryList.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </option>
                                    ))}
                                </TextField>
                                {/*<FormControl className="mb-6" fullWidth={true}>
                                    <FormLabel>Country</FormLabel>
                                    <Select
                                        className="mb-4 w-full selectCustom"
                                        options={this.props.countryList}
                                        value={this.props.countryList.filter(
                                            (option) =>
                                                option.value ==
                                                this.props.countryId
                                        )}
                                        onChange={(value) => {
                                            this.props.moderatorInputChange({
                                                prop: 'countryId',
                                                value: value.value,
                                                error: 'countryIdError',
                                            })
                                        }}
                                        isSearchable={true}
                                    />
                                    </FormControl>*/}
                            </Grid>
                            <Grid
                                item
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                                sx={{ mt: 0 }}
                            >
                                <TextField
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    label={<IntlMessages id="label.report" />}
                                    name="countryId"
                                    onChange={(value) => {
                                        this.props.moderatorInputChange({
                                            prop: 'reportType',
                                            value: value.target.value,
                                            error: '',
                                        })
                                    }}
                                    className="mb-4 w-full"
                                    style={{
                                        marginBottom: '20px',
                                        width: '100%',
                                    }}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={this.props.reportType}
                                    variant="outlined"
                                >
                                    {defaultModetatorArray.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                                {/*<FormControl
                                    className="mb-4"
                                    //   fullWidth={true}
                                    style={{
                                        width: '100%',
                                        marginTop: '-32px',
                                    }}
                                >
                                    <FormLabel component="legend">
                                        Report Type
                                    </FormLabel>
                                   <Select
                                        className="mb-4 w-full "
                                        maxMenuHeight={150}
                                        styles={{ zIndex: 1000 }}
                                        options={defaultModetatorArray}
                                        value={defaultModetatorArray.filter(
                                            (val) => {
                                                return (
                                                    val.value ==
                                                    this.props.reportType
                                                )
                                            }
                                        )}
                                        onChange={(value) => {
                                            this.props.moderatorInputChange({
                                                prop: 'reportType',
                                                value: value.value,
                                                error: '',
                                            })
                                        }}
                                    />
                                    </FormControl>*/}
                            </Grid>
                            {this.props.reportType != 1 &&
                            this.props.reportType != 7 ? (
                                <Grid
                                    item
                                    lg={6}
                                    md={6}
                                    sm={12}
                                    xs={12}
                                    sx={{ mt: 2 }}
                                >
                                    <TextField
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        id="employeeName"
                                        label={
                                            <IntlMessages id="label.searchby" />
                                        }
                                        variant="outlined"
                                        // className="mb-4  w-full"
                                        style={{
                                            marginBottom: '20px',
                                            width: '80%',
                                        }}
                                        placeholder="Search"
                                        value={this.props.searchId}
                                        onChange={(value) =>
                                            this.props.moderatorInputChange({
                                                prop: 'searchId',
                                                value: value.target.value,
                                                error: 'searchIdError',
                                            })
                                        }
                                    />

                                    {/* //  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                //   <FormControl className="mb-4" fullWidth={true} style={{width:"100%", marginRight:"20px"}}>
                   
                //     <TextField
                //       required
                //       InputLabelProps={{ shrink: true }}
                //       style={{width:"100%", marginRight:"50px"}}
                //       id="outlined-required"
                //       label={<IntlMessages id="label.searchby" />}
                //       variant="outlined"
                //       className="mb-4 w-full"
                //       placeholder="Search"
                //       value={this.props.searchId}
                //       onChange={(value) =>
                //         this.props.moderatorInputChange({
                //           prop: "searchId",
                //           value: value.target.value,
                //           error: "searchIdError",
                //         })
                //       }
                //     />
                //   </FormControl> */}
                                </Grid>
                            ) : (
                                ''
                            )}
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
                                                    onChange={(date) => {
                                                        this.props.moderatorInputChange(
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
                                                    onChange={(date) => {
                                                        this.props.moderatorInputChange(
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
                            className="buttonModeratorList"
                                variant="contained"
                                color="primary"
                                onClick={this.handelEvent}
                                style={{
                                    marginLeft: '15px',
                                    marginTop: '20px',
                                }}
                            >
                                <i className="zmdi zmdi-search zmdi-hc-fw" />
                                <span>Search</span>
                            </Button>
                        </Box>
                    </Card>
                    <div className="pt-sm-24" style={{ margin: 10 }}>
                        <Divider />

                        {
                            <ModeratorListTable
                                result={this.props}
                                tableName="Moderator List"
                            />
                        }

                        {/* <ModetatorImageView {...this.props} />
          <Divider />
          <ModetatorTextView {...this.props} />
          <Divider />
          <ModetatorVideoView {...this.props} />*/}
                    </div>
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
        moderatorList,
        countryList,
        countryId,
        reportType,
        fromDate,
        toDate,
        dateEnable,
        viewData,
        userZamugDatails,
        userZamugPostList,
        pageSize,
        requestTime,
        baseUrl,
        searchId,
    } = state.moderator
    const { userId } = state.login
    return {
        loader,
        messageError,
        messageSuccess,
        messageWarning,
        moderatorList,
        countryList,
        countryId,
        reportType,
        fromDate,
        toDate,
        dateEnable,
        viewData,
        userZamugDatails,
        userZamugPostList,
        pageSize,
        requestTime,
        baseUrl,
        userId,
        searchId,
    }
}
const mapDispatchToProps = {
    getModeratorList: moderatorAction.getModeratorList,
    moderatorInputChange: moderatorAction.moderatorInputChange,
    getModeratorReset: moderatorAction.getModeratorReset,
    getCountryList: moderatorAction.getCountryList,
    moderatorRecordView: moderatorAction.moderatorRecordView,
    moderatorStatus: moderatorAction.moderatorStatus,
}
export default connect(mapToStateProps, mapDispatchToProps)(ModetatorList)
