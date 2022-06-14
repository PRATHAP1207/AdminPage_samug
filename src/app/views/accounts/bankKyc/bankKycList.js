import React, { Component, Fragment,PureComponent } from "react";
import { SimpleCard } from "matx";
import {
  TextField,
  FormControl,
  FormLabel,
  Grid,
  Button,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import IntlMessages from "../../../utils/IntlMessages";
import { defaultBankKycArray } from "../../../constant/Common";
import { accountsAction } from "app/redux/actions/AccountsActions";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import BankKycListTable from "./bankKycListTable";
import BankDetailsModals from "./bankDetailsModals";
import KycListTable from "./KycListTable";
import { styled } from '@mui/system';
import {Container} from '../../../constant/Common'
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Breadcrumb} from 'app/components'



class BankKycList extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dateShow: false,
      acceptStatus: false,
      remarks: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.accountsReset();
    this.props.getCountryList();
  }
  handleChange(event) {
    this.setState({ remarks: event.target.value });
    //console.log(this.state.remarks);
  }
  handelEvent = (e) => {
    e.preventDefault();
    this.props.accountsKycBankList(this.props);
  };

  render() {
    return (
      <Container>

        <div className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Home', path: '/' },
              {
                name: (
                  <IntlMessages id="title.bankKyc" />
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
        <SimpleCard title={<IntlMessages id="title.bankKyc" />}>
          <Grid container spacing={3}>
            <Grid item xs>
              <FormControl className="mb-4" style={{marginLeft:"20px",width:"80%"}}>
                <FormLabel>{<IntlMessages id="label.country" />}</FormLabel>
                <Select
                  className="mb-4 w-full"
                  options={this.props.countryList}
                  value={this.props.countryList.filter(
                    (option) => option.value == this.props.countryId
                  )}
                  isSearchable={true}
                  maxMenuHeight={200}
                  onChange={(value) => {
                    this.props.accountInputChange({
                      prop: "countryId",
                      value: value.value,
                      error: "countryIdError",
                    });
                  }}
                />

                <div className="mb-2 form_error">
                  {this.props.countryIdError}
                </div>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl className="mb-4" style={{width:"80%"}} >
                <FormLabel>{<IntlMessages id="label.reportType" />}</FormLabel>
                <Select
                  className="mb-4 w-full"
                  options={defaultBankKycArray}
                  value={defaultBankKycArray.filter(
                    (option) => option.value == this.props.reportType
                  )}
                  onChange={(value) => {
                    this.props.accountInputChange({
                      prop: "reportType",
                      value: value.value,
                      error: "reportTypeError",
                    });
                    this.props.accountsDateEnableDisable(value.value);
                  }}
                />
              </FormControl>
            </Grid>
            {this.props.dateEnable ? (
              <>
                <Grid item xs>
                  <FormControl className="mb-4" fullWidth={true}>
                    <FormLabel>
                      {<IntlMessages id="label.fromDate" />}
                    </FormLabel>
                    <LocalizationProvider  dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        className="mb-4 w-full"
                        value={this.props.fromDate}
                        inputVariant="standard"
                        margin="normal"
                        renderInput={(params) => <TextField 
                          style={{marginBottom:"20px", width:"100%"}}
                          {...params}/>}
                        onChange={(date) => {
                          this.props.accountInputChange({
                            prop: "fromDate",
                            value: date,
                            error: "fromDateError",
                          });
                        }}
                        maxDate={new Date()}
                        format="dd-MM-yyyy"
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <FormControl className="mb-4" fullWidth={true}>
                    <FormLabel>{<IntlMessages id="label.toDate" />}</FormLabel>
                    <LocalizationProvider  dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        className="mb-4 w-full"
                        value={this.props.toDate}
                        inputVariant="standard"
                        placeholder="01-01-2020"
                        margin="normal"
                        renderInput={(params) => <TextField 
                          style={{marginBottom:"20px", width:"100%"}}
                          {...params}/>}
                        onChange={(date) => {
                          this.props.accountInputChange({
                            prop: "toDate",
                            value: date,
                            error: "toDateError",
                          });
                        }}
                        maxDate={new Date()}
                        format="dd-MM-yyyy"
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </>
            ) : (
              ""
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
            className="bankKycGetList"
              variant="contained"
              color="primary"
              onClick={this.handelEvent}
            >
              <i className="zmdi zmdi-search zmdi-hc-fw" />
              <span>{<IntlMessages id="button.getDetails" />}</span>
            </Button>
          </Box>
          <div className="pt-sm-24 pb-0">
            <Divider />
            {this.props.reportType == 1 || this.props.reportType == 2 ? (
              <BankKycListTable
                className="mb-4 w-full"
                //onEditEmployee={this.onEditEmployee}
                //onDeleteEmployee={this.onDeleteEmployee}
                tableName={
                  <IntlMessages id={"title.bankkyc" + this.props.reportType} />
                }
                result={this.props}
              />
            ) : (
              <KycListTable
                className="mb-4 w-full"
                tableName={
                  <IntlMessages id={"title.bankkyc" + this.props.reportType} />
                }
                result={this.props}
              />
            )}
          </div>
        </SimpleCard>
        <BankDetailsModals {...this.props} />
      </Fragment>
    </Container>
    );
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
    bankKycList,
    bankKycListSelected,
    bankKycPopup,
    popupViewData,
    remarks,
    remarksStatus,
    btnStatus,
  } = state.accounts;
  const { login } = state;
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
    bankKycList,
    bankKycListSelected,
    bankKycPopup,
    popupViewData,
    remarks,
    remarksStatus,
    btnStatus,
  };
};
const mapDispatchToProps = {
  accountInputChange: accountsAction.accountsInputChange,
  accountsReset: accountsAction.accountsReset,
  getCountryList: accountsAction.getCountryList,
  accountsDateEnableDisable: accountsAction.accountsDateEnableDisable,
  accountsKycBankList: accountsAction.accountsKycBankList,
  updateAccountsRowSelected: accountsAction.updateAccountsRowSelected,
  accountsPayoutUpdate: accountsAction.accountsPayoutUpdate,
  accountsKycBankApproval: accountsAction.accountsKycBankApproval,
  accountsKycBankPopup: accountsAction.accountsKycBankPopup,
  accountsKycBankReject: accountsAction.accountsKycBankReject,
  accountsKycBankTableReject: accountsAction.accountsKycBankTableReject,
  accountsKycBankPopupClose: accountsAction.accountsKycBankPopupClose,
};
export default connect(mapToStateProps, mapDispatchToProps)(BankKycList);
