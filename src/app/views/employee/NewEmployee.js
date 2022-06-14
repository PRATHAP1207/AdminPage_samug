import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb, SimpleCard } from 'app/components'
import CardContent from '@mui/material'
import { ValidatorForm } from 'react-material-ui-form-validator'
import IntlMessages from '../../utils/IntlMessages'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'

import {
    TextField,
    Grid,
    Radio,
    FormControlLabel,
    FormControl,
    FormLabel,
    RadioGroup,
    InputLabel,
    FormGroup,
    CardHeader,
    Divider,
    Switch,
    Chip,
    Input,
    MenuItem,
    useTheme,
    withStyles,
    Paper,
    Button,
    Icon,
    Box,
    CircularProgress,
} from '@mui/material'
import { makeStyles } from "@mui/styles";
// import IconButton from '@mui/material'
// import PhotoCamera from "@mui/material";
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { employeeAction } from '../../redux/actions/EmployeeActions'
import Select from 'react-select'
import {
    IMAGE_TYPE,
    EMPLOYEE_IMAGE_SIZE,
    Container,
} from '../../constant/Common'
import { NotificationManager } from 'react-notifications'
import { styled } from '@mui/system'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//     },
//     formControl: {
//         marginRight: theme.spacing(3),
//         marginLeft: theme.spacing(3),
//     },
//     group: {
//         margin: theme.spacing(1, 0),
//     },
//     formControl1: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
// }))
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]
class NewEmployee extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.numberkeyPressed = this.numberkeyPressed.bind(this)
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.state = {
            value: 1,
            checkedA: true,
            checkedB: true,
            date: new Date(),
            file: '',
        }
    }
    componentDidMount() {
        // if (!this.props.employeeId) {
        //this.props.getTowerList();
        if(this.props.employeeId <= "0" ){
        this.props.employeeDataReset()
        this.props.getCountry()
        this.props.getDesignation()
      
    }
    this.props.employeeInputChange({
        prop: 'formModes',
        value: '1',
        error: '',
    })
        // }
    }
    showError(error) {
        return error.trim() === '' ? '' : <IntlMessages id={error} />
    }

    showPlaceHolder(label) {
        return label.trim() === '' ? '' : <IntlMessages id={label} />
    }
    numberkeyPressed(evt) {
        var charCode = evt.which ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault()
        }

        return true
    }
    uploadSingleFile(e) {
        let imageFile = URL.createObjectURL(e.target.files[0])
        let imageData = e.target.files[0]
        let imageValid = true
        let errorMsg = ''

        //  console.log(e.target.files);

        //Validate Image with Correct Format
        //    console.log("imageFile.size", e.target.files[0]);
        if (imageData && imageData.size) {
            // Get image size in kilobytes
            const imageFileKb = imageData.size / 1024
            if (imageFileKb > EMPLOYEE_IMAGE_SIZE) {
                errorMsg = `Image size must be less or equal to ${EMPLOYEE_IMAGE_SIZE}kb`
                imageValid = false
            }
            if (imageValid) {
                if (!IMAGE_TYPE.includes(imageData.type)) {
                    errorMsg = `Image mime type must be ${IMAGE_TYPE}`
                    imageValid = false
                }
            }
        }
        if (imageValid) {
            this.setState({
                file: imageFile,
            })
            this.props.employeeInputChange({
                prop: 'employeeImage',
                value: imageData,
                error: 'employeeImageError',
            })
        } else {
            e.target.value = ''
           // console.log('Image Error')
            NotificationManager.error(errorMsg)
        }
    }
    handleChange = (name) => (event) => {
        this.setState({ [name]: event.target.value })
    }
    onKeyPress(event) {
        const keyCode = event.keyCode || event.which
        const keyValue = String.fromCharCode(keyCode)
        if (/\+|-/.test(keyValue)) event.preventDefault()
    }

    handleChange1(selectedOption){
        this.setState({ selectedOption })
       // console.log(`Option selected:`, selectedOption)
    }
    handleSubmit(e) {
        // console.log("dfsdfs");
        e.preventDefault()

        //clear Previous Error Display
        this.props.clearError()
      //  console.log(this.props)
        this.props.validateInput(this.props)

        // this.props.history.push("/admin/towerLst");
    }
    render() {
        //const { selectedOption } = this.state;
        //const  {classes}  = this.props;

        return (
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Home', path: '/' },
                            {
                                name: (
                                    <IntlMessages id="title.employeeDetails" />
                                ),
                            },
                        ]}
                    />
                </div>
                <SimpleCard title={<IntlMessages id="title.employeeDetails" />}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="employeeName"
                                label={<IntlMessages id="label.employeeName" />}
                                variant="outlined"
                                // className="mb-4  w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="Employee Name"
                                value={this.props.employeeName}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'employeeName',
                                        value: value.target.value.toUpperCase(),
                                        error: 'employeeNameError',
                                    })
                                }
                            />
                            <div className="mb-2 form_error">
                                {this.showError(this.props.employeeNameError)}
                            </div>

                            <TextField
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={<IntlMessages id="label.designation" />}
                                name="designationId"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                onChange={(value) => {
                                    this.props.employeeInputChange({
                                        prop: 'designationId',
                                        value: value.target.value,
                                        error: 'designationIdError',
                                    })
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
                                {this.showError(this.props.designationIdError)}
                            </div>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="contactNo"
                                label={<IntlMessages id="label.contactNo" />}
                                variant="outlined"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="ContactNo"
                                value={this.props.contactNo}
                                onKeyPress={this.numberkeyPressed}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'contactNo',
                                        value: value.target.value,
                                        error: 'contactNoError',
                                    })
                                }
                            />

                            <div className="mb-2 form_error">
                                {this.showError(this.props.contactNoError)}
                            </div>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="altContactNo"
                                label={<IntlMessages id="label.contactNoAlt" />}
                                variant="outlined"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="Alt ContactNo"
                                value={this.props.altContactNo}
                                onKeyPress={this.numberkeyPressed}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'altContactNo',
                                        value: value.target.value,
                                        error: 'altContactNoError',
                                    })
                                }
                            />
                            <div className="mb-2 form_error">
                                {this.showError(this.props.contactNoError)}
                            </div>

                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="emailId"
                                label={<IntlMessages id="label.emailId" />}
                                variant="outlined"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="EmailId"
                                disabled={
                                    this.props.employeeId == 0 ? false : true
                                }
                                value={this.props.emailId}
                                onBlur={(val) => {
                                    //console.log(val.target.value);
                                    if (this.props.employeeId == 0) {
                                        this.props.checkEmailUser({
                                            employeeId: this.props.employeeId,
                                            emailId: val.target.value,
                                        })
                                    }
                                }}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'emailId',
                                        value: value.target.value,
                                        error: 'emailIdError',
                                    })
                                }
                            />
                            <div className="mb-2 form_error">
                                {this.showError(this.props.emailIdError)}
                            </div>
                            <FormControl
                                component="fieldset"
                                // row="true"
                                className="row"
                                style={{ marginBottom: '12px' }}
                                //className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    {<IntlMessages id="label.gender" />}
                                </FormLabel>
                                <RadioGroup
                                    className="d-flex flex-row"
                                    aria-label="Gender"
                                    name="gender"
                                    value={this.props.gender}
                                    onChange={(value) =>
                                        this.props.employeeInputChange({
                                            prop: 'gender',
                                            value: value.target.value,
                                            error: 'genderError',
                                        })
                                    }
                                    row="true"
                                >
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio color="primary" />}
                                        label={<IntlMessages id="label.male" />}
                                        labelPlacement="end"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio color="primary" />}
                                        label={
                                            <IntlMessages id="label.female" />
                                        }
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            </FormControl>
                            <div className="mb-2 form_error">
                                {this.showError(this.props.genderError)}
                            </div>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    InputLabelProps={{ shrink: true }}
                                    className="mb-4 w-full"
                                    style={{ marginBottom: '20px' }}
                                    // id="mui-pickers-date"
                                    label={<IntlMessages id="label.dob" />}
                                    inputVariant="standard"
                                    type="text"
                                    // autoOk={true}
                                    value={this.props.dob}
                                    placeholder="01-01-2020"
                                    margin="normal"
                                    renderInput={(params) => (
                                        <TextField
                                            style={{
                                                marginBottom: '20px',
                                                width: '100%',
                                            }}
                                            {...params}
                                        />
                                    )}
                                    onChange={(date) => {
                                        this.props.employeeInputChange({
                                            prop: 'dob',
                                            value: date,
                                            error: 'dobError',
                                        })
                                    }}
                                    maxDate={new Date()}
                                    format="dd/MM/yyyy"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </LocalizationProvider>

                            <FormControl>
                                <TextField
                                    className="mb-4"
                                    style={{ width: '100%' }}
                                    InputLabelProps={{ shrink: true }}
                                    type="file"
                                    id="outlined-basic"
                                    label={
                                        <IntlMessages id="label.employeeImage" />
                                    }
                                    variant="outlined"
                                    onChange={this.uploadSingleFile}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="address1"
                                label={<IntlMessages id="label.address1" />}
                                variant="outlined"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="address1"
                                value={this.props.address1}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'address1',
                                        value: value.target.value,
                                        error: 'address1Error',
                                    })
                                }
                            />
                            <div className="mb-2 form_error">
                                {this.showError(this.props.address1Error)}
                            </div>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="address2"
                                label={<IntlMessages id="label.address2" />}
                                variant="outlined"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="address2"
                                value={this.props.address2}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'address2',
                                        value: value.target.value,
                                        error: 'address2Error',
                                    })
                                }
                            />
                            <div className="mb-2 form_error">
                                {this.showError(this.props.address2Error)}
                            </div>
                            <TextField
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={<IntlMessages id="label.country" />}
                                name="countryId"
                                onChange={(value) => {
                                    this.props.employeeInputChange({
                                        prop: 'countryId',
                                        value: value.target.value,
                                        error: 'countryIdError',
                                    })
                                    this.props.getState({
                                        countryId: value.target.value,
                                    })
                                }}
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
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
                                {this.showError(this.props.countryIdError)}
                            </div>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={<IntlMessages id="label.state" />}
                                name="stateId"
                                style={{ marginBottom: '20px', width: '100%' }}
                                className="mb-4 w-full"
                                //onChange={handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                onChange={(value) => {
                                    this.props.employeeInputChange({
                                        prop: 'stateId',
                                        value: value.target.value,
                                        error: 'stateIdError',
                                    })
                                    this.props.getCity({
                                        stateId: value.target.value,
                                    })
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
                            <div className="mb-2 form_error">
                                {this.showError(this.props.stateIdError)}
                            </div>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                label={<IntlMessages id="label.city" />}
                                name="cityId"
                                style={{ marginBottom: '20px', width: '100%' }}
                                className="mb-4 w-full"
                                onChange={(value) => {
                                    this.props.employeeInputChange({
                                        prop: 'cityId',
                                        value: value.target.value,
                                        error: 'cityIdError',
                                    })
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
                                {this.showError(this.props.cityIdError)}
                            </div>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="outlined-required"
                                label={<IntlMessages id="label.postelcode" />}
                                variant="outlined"
                                className="mb-4 w-full"
                                style={{ marginBottom: '20px', width: '100%' }}
                                placeholder="Pincode"
                                onKeyPress={this.numberkeyPressed}
                                value={this.props.pincode}
                                onChange={(value) =>
                                    this.props.employeeInputChange({
                                        prop: 'pincode',
                                        value: value.target.value,
                                        error: 'pincodeError',
                                    })
                                }
                            />
                            <div className="mb-2 form_error">
                                {this.showError(this.props.pincodeError)}
                            </div>
                            <TextField
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                label={
                                    <IntlMessages id="label.accessCountry" />
                                }
                                name="accessCountry"
                                style={{ marginBottom: '20px', width: '100%' }}
                                onChange={(value) => {
                                    this.props.employeeInputChange({
                                        prop: 'accessCountry',
                                        value: value.target.value,
                                        error: 'accessCountryError',
                                    })
                                }}
                                className="mb-4 w-full"
                                required
                                select
                                SelectProps={{ native: true }}
                                value={this.props.accessCountry}
                                variant="outlined"
                            >
                                {this.props.countryList.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                            <div className="mb-2 form_error">
                                {this.showError(this.props.accessCountryError)}
                            </div>
                            <label htmlFor="phoneNumber">
                                {<IntlMessages id="label.preview" />}
                            </label>
                            <div
                                id="result"
                                //style={{ borderStyle: "outset", textAlign: "center" }}
                            >
                                {this.state.file ? (
                                    <img
                                        style={{
                                            height: '120px',
                                            width: '120px',

                                            padding: '5px',
                                            borderRadius: '50%',
                                        }}
                                        src={this.state.file}
                                        alt="previewImage"
                                        height={50}
                                        width={50}
                                    ></img>
                                ) : this.props.employeeImage ? (
                                    <img
                                        style={{
                                            height: '120px',
                                            width: '120px',

                                            padding: '5px',
                                            borderRadius: '50%',
                                        }}
                                        src={this.props.employeeImage} //this.state.file}
                                        alt="previewImage"
                                    ></img>
                                ) : (
                                    <img
                                        style={{
                                            borderRadius: '50%',
                                        }}
                                        src="/assets/images/custom/avatar.png"
                                        alt="previewImage"
                                    ></img>
                                )}
                            </div>
                        </Grid>
                    </Grid>

                    <Divider />
                    <CardHeader
                        subheader={<IntlMessages id="label.loginDescp" />}
                        title={<IntlMessages id="label.userLoginControl" />}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl
                                //className={classes.formControl}
                                //  row="true"
                                className="row"
                            >
                                <FormControlLabel
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            checked={this.props.webLoginStatus}
                                            // value={1}
                                            onChange={(value) =>
                                                this.props.employeeInputChange({
                                                    prop: 'webLoginStatus',
                                                    value: value.target.checked,
                                                    error: 'webLoginStatusError',
                                                })
                                            }
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Login Access"
                                />
                            </FormControl>
                        </Grid>
                        {this.props.webLoginStatus == 1 ? (
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    className="row"
                                    // className={classes.formControl}
                                    //  row="true"
                                    fullWidth={true}
                                    variant="standard"
                                >
                                    <InputLabel
                                        margin="dense"
                                        shrink={true}
                                        id="demo-mutiple-chip-label"
                                    >
                                        {<IntlMessages id="label.roleId" />}
                                    </InputLabel>

                                    <TextField
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        name="roles"
                                        onChange={(value) => {
                                            this.props.employeeInputChange({
                                                prop: 'roleId',
                                                value: value.target.value,
                                                error: 'roleIdError',
                                            })
                                        }}
                                        className="mb-4 w-full"
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={this.props.role}
                                        variant="outlined"
                                    >
                                        <option key={0} value={0}>
                                            Select Roles
                                        </option>
                                        {this.props.rolesList.map((option) => (
                                            <option
                                                key={option.uid}
                                                value={option.uid}
                                            >
                                                {option.rolesName}
                                            </option>
                                        ))}
                                    </TextField>
                                    <div className="mb-2 form_error">
                                        {this.showError(this.props.roleIdError)}
                                    </div>
                                </FormControl>
                            </Grid>
                        ) : (
                            ''
                        )}
                    </Grid>
                    {this.props.emailCheck == 1 ? (
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            m={1}
                            p={1}
                            bgcolor="background.paper"
                        >
                            <Button
                            className='buttonaddEmployee'
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                <Icon>send</Icon>
                                <span className="pl-2 capitalize">
                                    {<IntlMessages id="button.save" />}
                                </span>
                            </Button>
                        </Box>
                    ) : (
                        ''
                    )}
                </SimpleCard>
            </Container>
        )
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
        accessCountryError,
        loader,
        designationList,
        emailCheck,
        roleId,
        rolesList,
        roleIdError,
        formModes,
        accessCountry,
    } = state.employee
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
        accessCountryError,
        loader,
        designationList,
        emailCheck,
        roleId,
        rolesList,
        roleIdError,
        formModes,
        accessCountry,
    }
}

const mapDispatchToProps = {
    employeeInputChange: employeeAction.employeeInputChange,
    getCountry: employeeAction.getCountry,
    getState: employeeAction.getState,
    getCity: employeeAction.getCity,
    getDesignation: employeeAction.getDesignation,
    clearError: employeeAction.clearError,
    validateInput: employeeAction.validateInput,
    employeeDataReset: employeeAction.employeeDataReset,
    checkEmailUser: employeeAction.checkEmailUser,
}
/*export default withStyles(
  useStyles,
  connect(mapToStateProps, mapDispatchToProps)
)(NewEmployee);*/
export default connect(mapToStateProps, mapDispatchToProps)(NewEmployee)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name, personName) {
    return {
        fontWeight: personName.indexOf(name) === -1,
    }
}
