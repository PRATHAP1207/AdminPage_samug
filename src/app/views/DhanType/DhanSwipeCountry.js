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
import { InputChange,countryDhanInputChange,RemoveTheCountry,resetDhanType } from '../../redux/actions/DhanTypeAction'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {getCountryCurrency} from "../../redux/actions/CurrencyReportAction";


export default function DhanSwipeCountry() {
    const dispatch = useDispatch();
    const CountryInputList = useSelector((state) => state.CurrencyReportReducer)
    useEffect(() => {
        dispatch(resetDhanType(CountryInput))
        dispatch(getCountryCurrency(CountryInputList));
      }, [dispatch]);    
    const CountryInput = useSelector((state) => state.DhanTypeReducer);
   
    const CountryList = JSON.parse(localStorage.getItem('CountryList'));
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

    const country = CountryInputList.countryList.map((option) => option)
    const RemoveCountryListDhan = (e) => {
        dispatch(RemoveTheCountry(e))
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
                                onRemove={RemoveCountryListDhan}
                                maxMenuHeight={20}
                                labelId="demo-simple-select-label"
                                onSelect={(value) => {
                                    dispatch(countryDhanInputChange(
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
                                   value={CountryInput.fromDhanDate}
                                    inputVariant="standard"
                                    margin="normal"
                                    renderInput={(params) => <TextField
                                        style={{ marginBottom: "20px", width: "100%" }}
                                        {...params} />}
                                    onChange={(date) => {
                                        dispatch(InputChange({
                                            props: "fromDhanDate",
                                            value: date,
                                            error: "fromDhanDateError",
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
                                    value={CountryInput.toDhanDate}
                                    inputVariant="standard"
                                    placeholder="01-01-2020"
                                    margin="normal"
                                    renderInput={(params) => <TextField
                                        style={{ marginBottom: "20px", width: "100%" }}
                                        {...params} />}
                                    onChange={(date) => {
                                        dispatch(InputChange({
                                            props: "toDhanDate",
                                            value: date,
                                            error: "toDhanDateError",
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