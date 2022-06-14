import React, { useEffect } from 'react'
import { SimpleCard } from 'matx'
import {
    FormControl,
    FormLabel,
    Grid,
    Select,
    Button,
    MenuItem,
    TextField,
    InputLabel,
} from '@mui/material'
import IntlMessages from '../../utils/IntlMessages'
import { Container } from 'app/constant/Common'
import { Breadcrumb } from 'app/components'
import {
    InputChange,
    CountryInputChange,
    DateInputChange,
    YearMonthInputChange,
    selectedMonth,
    yearChange,
    CountryList,
    displayYear,
    RemoveTheYear,
    RemoveMonthData,
    RemoveTheCountry,
    resetSubscriptionData,
} from '../../redux/actions/SubscriptionAction'
import { connect, useDispatch } from 'react-redux'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import Multiselect from 'multiselect-react-dropdown'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { id } from 'date-fns/locale'

export default function GraphCountry() {
    const dispatch = useDispatch()
    const ChangeInput = useSelector((state) => state.usertree)
    //  console.log('ChangeInput', ChangeInput)

    const today = new Date()
    const dateYear = today.getFullYear()
    const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
    var time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    var dateTime = date + ' ' + time
    var formatValue = (value) => value.toFixed(2)

    const Remove = (e) => {
        dispatch(RemoveTheYear(e))
    }
    const RemoveMonth = (e) => {
        dispatch(RemoveMonthData(e))
    }
    const RemoveCountryList = (e) => {
        dispatch(RemoveTheCountry(e))
    }
    var rows = []

    useEffect(() => {
        for (var i = 2020; i <= new Date().getFullYear() + 5; i++) {
            const year = {
                id: i,
                name: i,
            }
            rows.push(year)
        }
        dispatch(resetSubscriptionData(ChangeInput));
        dispatch(CountryList(ChangeInput))
        // setYearOption(rows)
    }, [])

    const [YearOption, setYearOption] = useState(rows)
    const [options, setOptions] = useState([
        { name: 'January', id: 1 },
        { name: 'Febraury', id: 2 },
        { name: 'March', id: 3 },
        { name: 'April', id: 4 },
        { name: 'May', id: 5 },
        { name: 'June', id: 6 },
        { name: 'July', id: 7 },
        { name: 'August', id: 8 },
        { name: 'September', id: 9 },
        { name: 'October', id: 10 },
        { name: 'November', id: 11 },
        { name: 'December', id: 12 },
    ])
    const reportTypes = [
        { name: 'Year', id: 1 },
        { name: 'Month', id: 2 },
        { name: 'Date', id: 3 },
    ]
     const singleSelectYear = [
         { name:'2020' , id: "2020"},
         { name:'2021' , id: "2021"},
         { name:'2022' , id: "2022"},
         { name:'2023' , id: "2023"},
         { name:'2024' , id: "2024"},
         { name:'2025' , id: "2025"},
         { name:'2026' , id: "2026"},
         { name:'2027' , id: "2027"},
     ]


    // const data=ChangeInput.CountryListDropDown.country.id
    // console.log("data",ChangeInput.CountryListDropDown.map((id)=>id.id))
    const country = ChangeInput.CountryListDropDown.map((option) => option)
    return (
        <>
            <Container>
                <Grid container spacing={3} style={{marginBottom:"40px", paddingBottom:"40px"}}>
                    <Grid item xs>
                        <FormControl
                            className=""
                            fullWidth={true}
                            style={{ marginLeft: '10px' }}
                        >
                            {<IntlMessages id="label.country" />}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    paddingBottom: '4px',
                                    paddingLeft: '2px',
                                }}
                            ></InputLabel>
                            {/* {ChangeInput.CountryListDropDown.map((id)=>id.id)} */}
                            <Multiselect
                                className="selectCustom"
                                options={country}
                                // selectedValues={ChangeInput.country}
                                fontSize="10px"
                                onRemove={RemoveCountryList}
                                maxMenuHeight={20}
                                labelId="demo-simple-select-label"
                                onSelect={(value) => {
                                    dispatch(
                                        CountryInputChange({
                                            props: 'country',
                                            value: value,
                                            error: 'CountryError',
                                        })
                                    )
                                }}
                                displayValue="name"
                            >
                                <MenuItem>All country</MenuItem>
                                {/* {ChangeInput.CountryListDropDown.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem> 
                                 ))} */}
                            </Multiselect>
                            <div className="mb-2 form_error"></div>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl
                            className="mb-4"
                            fullWidth={true}
                            style={{
                                marginLeft: '10px',
                                paddingRight: '20px',
                                marginTop: '0px',
                            }}
                        >
                            {<IntlMessages id="label.reportType" />}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    paddingLeft: '2px',
                                    paddingTop: '5px',
                                }}
                            ></InputLabel>
                            <Multiselect
                            className="optionSelectSubscri"
                                placeholder="Select"
                                options={reportTypes}
                                singleSelect={true}
                                style={{
                                    paddingLeft: '10px',
                                    marginLeft: '10px',
                                    marginRight: '20px',
                                }}
                                maxMenuHeight={50}
                                onSelect={(value) =>{
                                    dispatch(
                                        InputChange({
                                            props: 'optionChange',
                                            value: value[0].id,
                                            error: 'optionChangeError',
                                        })
                                    )
                                }
                                }
                                displayValue="name"
                            ></Multiselect>
                            {/*<Select
                                labelId="demo-simple-select-label"
                                placeholder="Select"
                                onChange={(value) => {
                                    dispatch(
                                        InputChange({
                                            props: 'optionChange',
                                            value: value.target.value,
                                            error: 'optionChangeError',
                                        })
                                    )
                                }}
                            >
                                <MenuItem value="1">Year</MenuItem>
                                <MenuItem value="2">Month</MenuItem>
                                <MenuItem value="3">Date</MenuItem>
                            </Select>*/}
                            <div className="mb-2 form_error"></div>
                        </FormControl>
                    </Grid>
                    {ChangeInput.optionChange == 1 && (
                        <Grid item xs>
                            <FormControl
                                className="mb-4 optionSelectSubscriYear"
                                fullWidth={true}
                                style={{
                                    marginLeft: '10px',
                                    paddingRight: '25px',
                                }}
                            >
                                {/* <FormLabel style={{ fontWeight: "normal", fontSize: "14px", paddingLeft: "2px", paddingTop: "5px" }}> */}
                                {<IntlMessages id="label.Year" />}
                                <InputLabel
                                    id="demo-simple-select-label"
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: '14px',
                                        paddingBottom: '4px',
                                        paddingLeft: '2px',
                                    }}
                                ></InputLabel>
                                {/* </FormLabel> */}
                                <Multiselect
                                 className="optionSelectSubscriMultiYear"
                                    placeholder="Select"
                                    options={YearOption}
                                    onRemove={Remove}
                                    style={{
                                        paddingLeft: '10px',
                                        marginLeft: '10px',
                                        marginRight: '20px',
                                    }}
                                    maxMenuHeight={50}
                                    onSelect={(value) =>
                                        dispatch(
                                            yearChange({
                                                props: 'Year',
                                                value: value,
                                                error: 'yearError',
                                            })
                                        )
                                    }
                                    displayValue="name"
                                ></Multiselect>
                                <div className="mb-2 form_error"></div>
                            </FormControl>
                        </Grid>
                    )}
                  {ChangeInput.optionChange == 2 &&
                            <Grid item xs>
                              <FormControl
                            className="mb-4 optionSelectSubscriSingleYear"
                            fullWidth={true}
                            style={{
                                marginLeft: '10px',
                                paddingRight: '20px',
                                marginTop: '0px',
                            }}
                        >
                            {<IntlMessages id="label.Year" />}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    paddingLeft: '2px',
                                    paddingTop: '5px',
                                }}
                            ></InputLabel>
                            <Multiselect
                                placeholder="Select"
                                options={singleSelectYear}
                                singleSelect={true}
                                style={{
                                    paddingLeft: '10px',
                                    marginLeft: '10px',
                                    marginRight: '20px',
                                }}
                                maxMenuHeight={50}
                                onSelect={(value) => (
                                    dispatch(YearMonthInputChange({
                                        props: 'Year',
                                        value: value[0].id,
                                        error: 'YearError'
                                    }))
                                )}
                                displayValue="name"
                            ></Multiselect>
                            {/*<Select
                                labelId="demo-simple-select-label"
                                placeholder="Select"
                                onChange={(value) => {
                                    dispatch(
                                        InputChange({
                                            props: 'optionChange',
                                            value: value.target.value,
                                            error: 'optionChangeError',
                                        })
                                    )
                                }}
                            >
                                <MenuItem value="1">Year</MenuItem>
                                <MenuItem value="2">Month</MenuItem>
                                <MenuItem value="3">Date</MenuItem>
                            </Select>*/}
                            <div className="mb-2 form_error"></div>
                        </FormControl>

                        </Grid>
                    }
                   {ChangeInput.optionChange == 2 &&
                        <Grid item xs>
                            <FormControl className="mb-4" fullWidth={true} style={{ marginLeft: "10px", paddingRight: "25px" }}>
                                {/* <FormLabel style={{ fontWeight: "normal", fontSize: "14px", paddingLeft: "2px", paddingTop: "5px" }}> */}
                                {<IntlMessages id="label.Month" />}
                                <InputLabel
                                    id='demo-simple-select-label'
                                    style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "4px", paddingLeft: "2px" }}></InputLabel>
                                {/* </FormLabel> */}
                                <Multiselect 
                                className='optionSelectSubscriMonth'
                                    options={options}
                                    //selectedValues={ChangeInput.month}
                                    onRemove={RemoveMonth}
                                    onSelect={(value) => (dispatch(selectedMonth({
                                        props: "month",
                                        value: value,
                                        error: "monthError"
                                    })))
                                    }
                                    // onRemove={onRemove} 
                                    displayValue="name"
                                />
                                <div className="mb-2 form_error">
                                    {/* {this.props.monthError} */}
                                </div>
                            </FormControl>

                        </Grid>
                    }

                    {ChangeInput.optionChange == 3 ? (
                        <Grid item xs>
                            <FormControl

                                style={{ marginTop: '5px' }}
                                className="mb-4 optionSelectSubscriFromDate"
                                fullWidth={true}
                            >
                                {/* <FormLabel > */}
                                {<IntlMessages id="label.fromDate" />}
                                <InputLabel
                                    id="demo-simple-select-label"
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: '14px',
                                        paddingBottom: '4px',
                                        paddingLeft: '2px',
                                    }}
                                ></InputLabel>
                                {/* </FormLabel> */}
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DesktopDatePicker
                                        className="mb-4 w-full"
                                        value={ChangeInput.fromInputDate}
                                        inputVariant="standard"
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
                                            dispatch(
                                                DateInputChange({
                                                    prop: 'fromInputDate',
                                                    value: date,
                                                    error: 'fromInputDateError',
                                                })
                                            )
                                        }}
                                        maxDate={new Date()}
                                        format="dd-MM-yyyy"
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    ) : null}
                    {ChangeInput.optionChange == 3 ? (
                        <Grid item xs>
                            <FormControl
                                style={{
                                    paddingRight: '25px',
                                    marginTop: '5px',
                                }}
                                className="mb-4 optionSelectSubscriEndDate"
                                fullWidth={true}
                            >
                                {/* <FormLabel> */}
                                {<IntlMessages id="label.toDate" />}
                                <InputLabel
                                    id="demo-simple-select-label"
                                    style={{
                                        fontWeight: 'normal',
                                        fontSize: '14px',
                                        paddingBottom: '4px',
                                        paddingLeft: '2px',
                                    }}
                                ></InputLabel>
                                {/* </FormLabel> */}
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DesktopDatePicker
                                        className="mb-4 w-full"
                                        value={ChangeInput.toInputDate}
                                        inputVariant="standard"
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
                                            dispatch(
                                                DateInputChange({
                                                    prop: 'toInputDate',
                                                    value: date,
                                                    error: 'toInputDateError',
                                                })
                                            )
                                        }}
                                        maxDate={new Date()}
                                        format="dd-MM-yyyy"
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                    ) : null}
                </Grid>
            </Container>
        </>
    )
}
