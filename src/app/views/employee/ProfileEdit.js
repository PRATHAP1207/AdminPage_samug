import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SimpleCard } from "matx";
import CardContent from "@mui/material/CardContent";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  TextField,
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Divider,
  Button,
  Icon,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { employeeAction } from "../../redux/actions/EmployeeActions";
import Select from "react-select";
import {Container} from 'app/constant/Common'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  formControl1: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.numberkeyPressed = this.numberkeyPressed.bind(this);
    this.state = {
      value: 1,
      checkedA: true,
      checkedB: true,
      date: new Date(),
    };
  }
  componentDidMount() {
    if (!this.props.employeeId) {
      this.props.getCountry();
      this.props.getDesignation();
    }
    this.props.employeeInputChange({
      prop: "formModes",
      value: 2,
      error: "",
    })
  }
  numberkeyPressed(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    }

    return true;
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) event.preventDefault();
  }

  handleChange1 = (selectedOption) => {
    this.setState({ selectedOption });
   // console.log(`Option selected:`, selectedOption);
  };
  handleSubmit(e) {
    // console.log("dfsdfs");
    e.preventDefault();
    //clear Previous Error Display
    this.props.clearError();
   
    this.props.validateInput(this.props);
    // this.props.history.push("/admin/towerLst");
  }
  render() {
    //const { selectedOption } = this.state;
    //const  {classes}  = this.props;

    return (
      <Container>
      <Fragment>
        <div className="m-sm-30">
          <SimpleCard title="New Employee ">
            <CardContent>
              <form
                ref="form"
                onSubmit={this.handleSubmit}
                onError={(errors) => null}
              >
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="employeeName"
                      label="Employee Name"
                      variant="outlined"
                      className="mb-4  w-full"
                      placeholder="Employee Name"
                      value={this.props.employeeName}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "employeeName",
                          value: value.target.value.toUpperCase(),
                          error: "employeeNameError",
                        })
                      }
                    />
                    <div className="mb-2 form_error">
                      {this.props.employeeNameError}
                    </div>
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Select Designation"
                      name="designationId"
                      className="mb-4 w-full"
                      onChange={(value) => {
                        this.props.employeeInputChange({
                          prop: "designationId",
                          value: value.target.value,
                          error: "designationIdError",
                        });
                      }}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={this.props.designationId}
                      variant="outlined"
                    >
                      {this.props.designationList.map((option) => (
                        <option key={option.uid} value={option.uid}>
                          {option.designation}
                        </option>
                      ))}
                    </TextField>
                    <div className="mb-2 form_error">
                      {this.props.designationIdError}
                    </div>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="contactNo"
                      label="ContactNo"
                      variant="outlined"
                      className="mb-4 w-full"
                      placeholder="Alt ContactNo"
                      value={this.props.contactNo}
                      onKeyPress={this.numberkeyPressed}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "contactNo",
                          value: value.target.value,
                          error: "contactNoError",
                        })
                      }
                    />
                    <div className="mb-2 form_error">
                      {this.props.contactNoError}
                    </div>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="altContactNo"
                      label="Alt ContactNo"
                      variant="outlined"
                      className="mb-4 w-full"
                      placeholder="Alt ContactNo"
                      value={this.props.altContactNo}
                      onKeyPress={this.numberkeyPressed}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "altContactNo",
                          value: value.target.value,
                          error: "altContactNoError",
                        })
                      }
                    />

                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="emailId"
                      label="EmailId"
                      variant="outlined"
                      className="mb-4 w-full"
                      placeholder="EmailId"
                      inputProps={{ readOnly: true }}
                      value={this.props.emailId}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "emailId",
                          value: value.target.value,
                          error: "emailIdError",
                        })
                      }
                    />
                    <div className="mb-2 form_error">
                      {this.props.emailIdError}
                    </div>
                    <FormControl
                      component="fieldset"
                      //className={classes.formControl}
                    >
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        className="d-flex flex-row"
                        aria-label="Gender"
                        name="gender"
                        value={this.props.gender}
                        onChange={(value) =>
                          this.props.employeeInputChange({
                            prop: "gender",
                            value: value.target.value,
                            error: "genderError",
                          })
                        }
                        row={true}
                      >
                        <FormControlLabel
                          value="1"
                          control={<Radio color="primary" />}
                          label="Male"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio color="primary" />}
                          label="Female"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                    <div className="mb-2 form_error">
                      {this.props.genderError}
                    </div>
                    <LocalizationProvider  dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        InputLabelProps={{ shrink: true }}
                        className="mb-4 w-full"
                        id="mui-pickers-date"
                        label="DOB"
                        inputVariant="standard"
                        type="text"
                        autoOk={true}
                        value={this.props.dob}
                        placeholder="01-01-2020"
                        margin="normal"
                        onChange={(date) => {
                          this.props.employeeInputChange({
                            prop: "dob",
                            value: date,
                            error: "dobError",
                          });
                        }}
                        maxDate={new Date()}
                        format="dd-MM-yyyy"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </LocalizationProvider>
                    <div className="mb-2 form_error">{this.props.dobError}</div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="address1"
                      label="Address 1"
                      variant="outlined"
                      className="mb-4 w-full"
                      placeholder="address1"
                      value={this.props.address1}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "address1",
                          value: value.target.value,
                          error: "address1Error",
                        })
                      }
                    />
                    <div className="mb-2 form_error">
                      {this.props.address1Error}
                    </div>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="address2"
                      label="Address 2"
                      variant="outlined"
                      className="mb-4 w-full"
                      placeholder="address2"
                      value={this.props.address2}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "address2",
                          value: value.target.value,
                          error: "address2Error",
                        })
                      }
                    />
                    <div className="mb-2 form_error">
                      {this.props.address2Error}
                    </div>
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Select Country"
                      name="countryId"
                      onChange={(value) => {
                        this.props.employeeInputChange({
                          prop: "countryId",
                          value: value.target.value,
                          error: "countryIdError",
                        });
                        this.props.getState({ countryId: value.target.value });
                      }}
                      className="mb-4 w-full"
                      required
                      select
                      SelectProps={{ native: true }}
                      value={this.props.countryId}
                      variant="outlined"
                    >
                      {this.props.countryList.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                    <div className="mb-2 form_error">
                      {this.props.countryIdError}
                    </div>
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Select State"
                      name="stateId"
                      className="mb-4 w-full"
                      //onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      onChange={(value) => {
                        this.props.employeeInputChange({
                          prop: "stateId",
                          value: value.target.value,
                          error: "stateIdError",
                        });
                        this.props.getCity({ stateId: value.target.value });
                      }}
                      variant="outlined"
                      value={this.props.stateId}
                    >
                      {this.props.stateList.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Select City"
                      name="cityId"
                      className="mb-4 w-full"
                      onChange={(value) => {
                        this.props.employeeInputChange({
                          prop: "cityId",
                          value: value.target.value,
                          error: "cityIdError",
                        });
                      }}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={this.props.cityId}
                      variant="outlined"
                    >
                      {this.props.cityList.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                    <div className="mb-2 form_error">
                      {this.props.cityIdError}
                    </div>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      id="outlined-required"
                      label="Pincode"
                      variant="outlined"
                      className="mb-4 w-full"
                      placeholder="Pincode"
                      onKeyPress={this.numberkeyPressed}
                      value={this.props.pincode}
                      onChange={(value) =>
                        this.props.employeeInputChange({
                          prop: "pincode",
                          value: value.target.value,
                          error: "pincodeError",
                        })
                      }
                    />
                    <div className="mb-2 form_error">
                      {this.props.pincodeError}
                    </div>
                  </Grid>
                </Grid>

                <Divider />

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  m={1}
                  p={1}
                  bgcolor="background.paper"
                >
                  <Button 
                  className="buttonProfileEditSubmit"
                  color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Submit</span>
                  </Button>
                </Box>
              </form>
            </CardContent>
          </SimpleCard>
        </div>
      </Fragment>
      </Container>
    );
  }
}
const mapToStateProps = (state) => {
  const {
    employeeId,
    employeeName,
    designationId,
    contactNo,
    altContactNo,
    emailId,
    gender,
    dob,
    address1,
    address2,
    countryList,
    stateList,
    cityList,
    countryId,
    stateId,
    cityId,
    pincode,
    employeeImage,
    webLoginStatus,
    employeeRoles,
    employeeNameError,
    designationIdError,
    contactNoError,
    altContactNoError,
    emailIdError,
    genderError,
    dobError,
    address1Error,
    address2Error,
    countryIdError,
    stateIdError,
    cityIdError,
    pincodeError,
    employeeImageError,
    employeeRolesError,
    loader,
    designationList,formModes
  } = state.employee;
  return {
    employeeId,
    employeeName,
    designationId,
    contactNo,
    altContactNo,
    emailId,
    gender,
    dob,
    address1,
    address2,
    countryList,
    stateList,
    cityList,
    countryId,
    stateId,
    cityId,
    pincode,
    employeeImage,
    webLoginStatus,
    employeeRoles,
    employeeNameError,
    designationIdError,
    contactNoError,
    altContactNoError,
    emailIdError,
    genderError,
    dobError,
    address1Error,
    address2Error,
    countryIdError,
    stateIdError,
    cityIdError,
    pincodeError,
    employeeImageError,
    employeeRolesError,
    loader,
    designationList,formModes
  };
};

const mapDispatchToProps = {
  employeeInputChange: employeeAction.employeeInputChange,
  getCountry: employeeAction.getCountry,
  getState: employeeAction.getState,
  getCity: employeeAction.getCity,
  getDesignation: employeeAction.getDesignation,
  clearError: employeeAction.clearError,
  validateInput: employeeAction.validateInput,
};
/*export default withStyles(
  useStyles,
  connect(mapToStateProps, mapDispatchToProps)
)(NewEmployee);*/
export default connect(mapToStateProps, mapDispatchToProps)(ProfileEdit);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName) {
  return {
    fontWeight: personName.indexOf(name) === -1,
  };
}
