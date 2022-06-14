import React, { Fragment, useEffect } from 'react'
import { Container } from 'app/constant/Common'
import IntlMessages from '../../utils/IntlMessages'
import { Breadcrumb, SimpleCard } from 'app/components'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import { useState } from 'react'
import {
    TextField,
    Grid,
    Checkbox,
    InputLabel,
    Button,
    Icon,
    Box,
} from '@mui/material'
import { useDispatch, useSelector, batch } from 'react-redux'
import { couponAction } from '../../redux/actions/CouponAction'
import { getCountryCurrency } from '../../redux/actions/CurrencyReportAction'
import { couponMode, couponType } from '../../constant/Common';
import { useNavigate } from 'react-router-dom'

export default function CouponForm() {
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const CountryInputList = useSelector((state) => state.CurrencyReportReducer)
    const CouponReducer = useSelector((state) => state.CouponReducer)
    //console.log('display country', CountryInputList)

    useEffect(() => {
        dispatch(couponAction.getEmptyCoupon());
        dispatch(getCountryCurrency(CountryInputList));
    }, [dispatch])

    const handleSubmit = () => {
        dispatch(couponAction.ValidateCouponForm({CouponData:CouponReducer, navigation:navigate}))
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        // { name: 'Home', path: '/' },
                        {
                            name: <IntlMessages id="title.couponForm" />,
                        },
                    ]}
                />
            </div>
            <SimpleCard>
                <Grid container spacing={6}>
                    <Grid item lg={2} md={2} sm={6} xs={6}>
                        {<IntlMessages id="label.country" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                                textAlign: 'center',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid item lg={10} md={10} sm={12} xs={12}>
                        <TextField
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            label={<IntlMessages id="label.country" />}
                            name="countryId"
                            className="mb-4"
                            style={{ marginBottom: '5px', width: '80%' }}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'countryId',
                                        value: value.target.value,
                                        error: 'countryError',
                                    })
                                )
                            }}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={CouponReducer.countryId}
                            variant="outlined"
                        >
                            {CountryInputList.countryList.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <div className="mb form_error">
                            {CouponReducer.countryError}
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.couponMode" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            fullWidth
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            label={<IntlMessages id="label.couponMode" />}
                            name="couponMode"
                            className=" w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'couponMode',
                                        value: value.target.value,
                                        error: 'couponModeError',
                                    })
                                )
                            }}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={CouponReducer.couponMode}
                            variant="outlined"
                        >
                            <option value=""> Select Here</option>
                            {couponMode.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <div className="mb form_error">
                            {CouponReducer.couponModeError}
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.couponType" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label={<IntlMessages id="label.couponType" />}
                            name="couponType"
                            className=" w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'couponType',
                                        value: value.target.value,
                                        error: 'couponTypeError',
                                    })
                                )
                            }}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={CouponReducer.couponType}
                            variant="outlined"
                        >
                            {' '}
                            <option value=""> Select Here</option>
                            {couponType.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <div className="mb form_error">
                            {CouponReducer.couponTypeError}
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.couponValue" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>{' '}
                        {CouponReducer.couponType == 1 && (
                            <span style={{ color: 'red' }}>
                                Enter values[0- 100]%
                            </span>
                        )}
                        {CouponReducer.couponType == 2 && (
                            <span style={{ color: 'red' }}>
                                Enter the Numbers
                            </span>
                        )}
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            id="couponValue"
                            label={<IntlMessages id="label.couponValue" />}
                            variant="outlined"
                            disabled={
                                (CouponReducer.couponType == '' ||
                                    CouponReducer.couponType == 0) &&
                                'true'
                            }
                            // className="mb-4  w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            placeholder="Coupon Value"
                            value={CouponReducer.couponValue}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'couponValue',
                                        value: value.target.value,
                                        error: 'couponValueError',
                                    })
                                )
                            }}
                        />
                        <div className="mb form_error">
                            {CouponReducer.couponValueError}
                        </div>
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.maxCount" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            id="maxCount"
                            label={<IntlMessages id="label.maxCount" />}
                            variant="outlined"
                            // className="mb-4  w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            placeholder="Max Count"
                            value={CouponReducer.maxCount}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'maxCount',
                                        value: value.target.value,
                                        error: 'maxCountError',
                                    })
                                )
                            }}
                        />
                        <div className="mb form_error">
                            {CouponReducer.maxCountError}
                        </div>
                    </Grid>

                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.startDate" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>

                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className=" w-full"
                                label={<IntlMessages id="label.startDate" />}
                                value={CouponReducer.startDate}
                                inputVariant="standard"
                                margin="normal"
                                renderInput={(params) => (
                                    <TextField
                                        size="small"
                                        style={{
                                            marginBottom: '5px',
                                            width: '80%',
                                        }}
                                        {...params}
                                    />
                                )}
                                placeholder="01-01-2020"
                                onChange={(date) => {
                                    dispatch(
                                        couponAction.couponInputChange({
                                            prop: 'startDate',
                                            value: date,
                                            error: 'startDateError',
                                        })
                                    )
                                }}
                               // maxDate={new Date()}
                                inputFormat="dd/MM/yyyy"
                            />
                        </LocalizationProvider>

                        <div className="mb form_error">
                            {CouponReducer.startDateError}
                        </div>
                    </Grid>

                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.endDate" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                className=" w-full"
                                label={<IntlMessages id="label.endDate" />}
                                value={CouponReducer.endDate}
                                inputVariant="standard"
                                margin="normal"
                                renderInput={(params) => (
                                    <TextField
                                        size="small"
                                        style={{
                                            marginBottom: '5px',
                                            width: '80%',
                                        }}
                                        {...params}
                                    />
                                )}
                                placeholder="01-01-2020"
                                onChange={(date) => {
                                    dispatch(
                                        couponAction.couponInputChange({
                                            prop: 'endDate',
                                            value: date,
                                            error: 'endDateError',
                                        })
                                    )
                                }}
                                minDate={new Date()}
                                inputFormat="dd/MM/yyyy"
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.lengthofCoupon" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            id="lengthofCoupon"
                            label={<IntlMessages id="label.lengthofCoupon" />}
                            variant="outlined"
                            // className="mb-4  w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            placeholder="length of Coupon"
                            value={CouponReducer.lengthofCoupon}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'lengthofCoupon',
                                        value: value.target.value,
                                        error: 'lengthofCouponError',
                                    })
                                )
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.prefixCoupon" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            id="prefixCoupon"
                            label={<IntlMessages id="label.prefixCoupon" />}
                            variant="outlined"
                            // className="mb-4  w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            placeholder="Prefix Coupon"
                            value={CouponReducer.prefixCoupon}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'prefixCoupon',
                                        value: value.target.value,
                                        error: 'prefixCouponError',
                                    })
                                )
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.sufixCoupon" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <TextField
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            id="sufixCoupon"
                            label={<IntlMessages id="label.sufixCoupon" />}
                            variant="outlined"
                            // className="mb-4  w-full"
                            style={{ marginBottom: '5px', width: '80%' }}
                            placeholder="Sufix Value"
                            value={CouponReducer.sufixCoupon}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'sufixCoupon',
                                        value: value.target.value,
                                        error: 'sufixCouponError',
                                    })
                                )
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.couponMask" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                 
                        <TextField
                            size="small"
                            required
                            InputLabelProps={{ shrink: true }}
                            id=""
                            label={<IntlMessages id="label.couponMask" />}
                            variant="outlined"
                            // className="mb-4  w-full"
                           
                            style={{ marginBottom: '5px', width: '80%' }}
                            placeholder="Coupon Mask"
                            value={CouponReducer.couponMask}
                            onChange={(value) => {                                    
                                dispatch(
                                    couponAction.couponInputChange({
                                        prop: 'couponMask',
                                        value: value.target.value,
                                        error: 'couponMaskError',
                                    })  
                                )
                                }}
                                
                            
                        />
                         
                    </Grid>
              
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.numberEnable" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <Checkbox
                            checked={CouponReducer.numberEnable}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponCheckInput({
                                        prop: 'numberEnable',
                                        value: value.target.checked,
                                        error: 'numberEnableError',
                                    })
                                )
                            }}
                            value={CouponReducer.numberEnable}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.lowerCase" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <Checkbox
                            checked={CouponReducer.lowerCase}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponCheckInput({
                                        prop: 'lowerCase',
                                        value: value.target.checked,
                                        error: 'lowerCaseError',
                                    })
                                )
                            }}
                            value={CouponReducer.lowerCase}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        lg={2}
                        md={2}
                        sm={6}
                        xs={6}
                        style={{ marginTop: '-10px' }}
                    >
                        {<IntlMessages id="label.alphabet" />}{' '}
                        <InputLabel
                            style={{
                                fontWeight: 'normal',
                                fontSize: '14px',
                                paddingLeft: '2px',
                            }}
                        ></InputLabel>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        md={10}
                        sm={12}
                        xs={12}
                        style={{ marginTop: '-10px' }}
                    >
                        <Checkbox
                            checked={CouponReducer.alphabet}
                            onChange={(value) => {
                                dispatch(
                                    couponAction.couponCheckInput({
                                        prop: 'alphabet',
                                        value: value.target.checked,
                                        error: 'alphabetError',
                                    })
                                )
                            }}
                            value={CouponReducer.alphabet}
                            inputProps={{
                                'aria-label': 'primary checkbox',
                            }}
                        />
                    </Grid>
                </Grid>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    m={1}
                    p={1}
                    bgcolor="background.paper"
                >
                    <Button
                    className="buttonCouponFormSubmit"
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <Icon>send</Icon>
                        <span className="pl-2 capitalize">
                            {<IntlMessages id="button.submit" />}
                        </span>
                    </Button>
                </Box>
            </SimpleCard>
        </Container>
    )
}
