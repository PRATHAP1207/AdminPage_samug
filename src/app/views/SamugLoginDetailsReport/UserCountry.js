import React, { useEffect } from 'react'
import IntlMessages from "../../utils/IntlMessages";
import { Container } from 'app/constant/Common';
import { SimpleCard } from 'matx'
import {
    FormControl,
    FormLabel,
    Grid,
    Select,
    Button,
    MenuItem,
    TextField,
    InputLabel
} from '@mui/material'
import Multiselect from 'multiselect-react-dropdown';
import { Breadcrumb } from 'app/components';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { InputChange,RemoveCountry,InputChangeDate,resetSamugUserLogin} from '../../redux/actions/UserDetailsReportAction'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {getCountryList} from "../../redux/actions/DhanReportAction";


export default function UserCountry() {
    const dispatch = useDispatch();
    const reducerData = useSelector((state) => state.DhanReportReducer);
    useEffect(()=>{
        
        dispatch(getCountryList(reducerData));
        dispatch(resetSamugUserLogin(userReducerData))
        },[]);

 
  const userReducerData = useSelector((state)=>state.UserDetailsReportReducer)

    const today = new Date();
    const dateYear = today.getFullYear();
    const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    var formatValue = (value) => value.toFixed(2);

    const country =  reducerData.DisplayCountry.map((option) => (
        option

    ))
    
    const RemoveCountryList = (e) => {
        dispatch(RemoveCountry(e))
    }
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl className="" fullWidth={true} style={{ marginLeft: "10px", marginTop: "5px", marginRight: "80px", marginBottom: "30px" }}>
                            {<IntlMessages id="label.country" />}
                            <InputLabel
                                id='demo-simple-select-label'
                                style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "4px", paddingLeft: "2px" }}></InputLabel>
                            <Multiselect
                                className="selectCustom"
                               options={country}
                               onRemove={RemoveCountryList}
                                maxMenuHeight={20}
                                labelId="demo-simple-select-label"
                                onSelect={(value) => {
                                    dispatch(InputChange(
                                        {
                                            props: "country",
                                            value: value,
                                            error: "CountryError"
                                        }
                                    ))
                                }}
                                 displayValue="name"
                            >
                            </Multiselect>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl style={{ marginTop: "5px" }} className="mb-4" fullWidth={true}>
                            {/* <FormLabel > */}
                                {<IntlMessages id="label.fromDate" />}
                                <InputLabel
                                id='demo-simple-select-label'
                                style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "4px", paddingLeft: "2px" }}></InputLabel>
                            {/* </FormLabel> */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    className="mb-4 w-full"
                                   value={userReducerData.fromDate}
                                    inputVariant="standard"
                                    margin="normal"
                                    renderInput={(params) => <TextField
                                        style={{ marginBottom: "20px", width: "100%" }}
                                        {...params} />}
                                    onChange={(date) => {
                                        dispatch(InputChangeDate({
                                            props: "fromDate",
                                            value: date,
                                            error: "fromDateError",
                                        }));
                                    }}
                                    maxDate={new Date()}
                                    format="dd-MM-yyyy"
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl style={{ paddingRight: "25px", marginTop: "5px" }} className="mb-4" fullWidth={true}>
                            {/* <FormLabel> */}
                                {<IntlMessages id="label.toDate" />}
                                <InputLabel
                                id='demo-simple-select-label'
                                style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "4px", paddingLeft: "2px" }}></InputLabel>
                                {/* </FormLabel> */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    className="mb-4 w-full"
                                     value={userReducerData.toDate}
                                    inputVariant="standard"
                                    placeholder="01-01-2020"
                                    margin="normal"
                                    renderInput={(params) => <TextField
                                        style={{ marginBottom: "20px", width: "100%" }}
                                        {...params} />}
                                    onChange={(date) => {
                                        dispatch(InputChangeDate({
                                            props: "toDate",
                                            value: date,
                                            error: "toDateError",
                                        }));
                                    }}
                                    maxDate={new Date()}
                                    format="dd-MM-yyyy"
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
          
        </>
    )
}