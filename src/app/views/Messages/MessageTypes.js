import React from 'react';
import IntlMessages from "../../utils/IntlMessages";
import { Container } from 'app/constant/Common';
import { Breadcrumb } from 'app/components';
import { SimpleCard } from 'matx'
import {
    FormControl,
    FormLabel,
    Grid,
    Button,
    MenuItem,
    Input,
    TextField,
    InputLabel,
    Icon,
    Box,
} from '@mui/material'
import Select from 'react-select';
import { useState } from 'react';
import { inputChangeDevice, inputChangeMsg, inputChangeSubject, inputChangeText, inputChangeNoti, inputChangeImage } from '../../redux/actions/UploadFileAction'
import { useDispatch, useSelector } from 'react-redux';


export default function MessageTypes() {
    const dispatch = useDispatch();
    const list = useSelector((state => state.UploadFileReducer))
   // console.log("list", list)
    const [selected, setSelectedOption] = useState(null)
    const option = [
        { value: "1", label: 'Notification' },
        { value: "2", label: "Email" },
        { value: "3", label: "SMS" },
    ]
    const [select, setSelect] = useState(null)
    const device = [
        { value: '1', label: "All" },
        { value: '2', label: "Andriod" },
        { value: '3', label: "IOS" },
    ]
    return (
        <>
            <Container >
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            // { name: 'Home', path: '/' },
                            {
                                name: (
                                    <IntlMessages id="title.notification" />
                                ),
                            },
                        ]}
                    />
                </div>
                <SimpleCard style={{ marginTop: "20px", paddingLeft: "5px", marginLeft: "5px", paddingBottom: "200px" }}>
                    <Grid container spacing={2} style={{marginBottom:"20px"}}>
                        <Grid item xs style={{ margin: "15px" }}>
                            <FormControl style={{ fontSize: "15px" }} className="" fullWidth={true}>
                                {<IntlMessages id="label.message" />} <InputLabel
                                    id='demo-simple-select-label'
                                    style={{ fontWeight: "normal", fontSize: "14px", paddingBottom: "40px", paddingLeft: "2px" }}></InputLabel>

                                <Select
                                    className="App"
                                    style={{ marginLeft: "12px" }}
                                    placeholder="Select"
                                    options={option}
                                    defaultValue={selected}
                                    maxMenuHeight={200}
                                    onChange={(setSelectedOption) => {
                                        dispatch(inputChangeMsg({
                                            props: 'message',
                                            value: setSelectedOption.value,
                                            error: "messageError"
                                        }))
                                    }}
                                >
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs style={{ margin: "15px" }}>
                            <FormControl className="" fullWidth={true} style={{ fontSize: "15px" }}>
                                {<IntlMessages id="label.Users" />} <InputLabel
                                    id='demo-simple-select-label'
                                    style={{ fontWeight: "normal", fontSize: "14px", paddingLeft: "2px" }}></InputLabel>
                                <Select
                                    className="App"
                                    style={{ marginLeft: "12px", marginRight: "10px" }}
                                    labelId="demo-simple-select-label"
                                    placeholder="Select"
                                    options={device}
                                    defaultValue={select}
                                    maxMenuHeight={200}
                                    // onChange={(setSelect) => {
                                    //     console.log("datatatata", setSelect)
                                    //     dispatch(inputChangeDevice({
                                    //         props: 'device',
                                    //         value: setSelect.value,
                                    //         error: "deviceError"
                                    //     }))
                                    // }}
                                >
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs style={{ margin: "15px" }}>
                            <FormControl className="" fullWidth={true} style={{ fontSize: "15px" }}>
                                {<IntlMessages id="label.device" />} <InputLabel
                                    id='demo-simple-select-label'
                                    style={{ fontWeight: "normal", fontSize: "14px", paddingLeft: "2px", marginBottom:"20px" }}></InputLabel>
                                <Select
                                    className="App"
                                    style={{ marginLeft: "12px", marginRight: "10px" }}
                                    labelId="demo-simple-select-label"
                                    placeholder="Select"
                                    options={device}
                                    defaultValue={select}
                                    maxMenuHeight={200}
                                    onChange={(setSelect) => {
                                       // console.log("datatatata", setSelect)
                                        dispatch(inputChangeDevice({
                                            props: 'device',
                                            value: setSelect.value,
                                            error: "deviceError"
                                        }))
                                    }}
                                >
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Grid container spacing={4} style={{paddingBottom:"20px"}}>
                        <Grid item xs >
                            <FormControl className="" fullWidth={true} style={{ marginLeft: "10px" }}>
                                {/* {<IntlMessages id="label.subject" />} <InputLabel
                                    id=''
                                    style={{ paddingLeft: "2px", fontSize: "14px" ,paddingBottom:"20px" }}></InputLabel> */}
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                      
                                    label={<IntlMessages id="label.subject" />}
                                    variant="outlined"
                                      multiline
                                    style={{ marginRight: "25px", marginLeft: "6px",fontSize: "14px" ,paddingBottom:"20px" }}
                                    placeholder="Type"
                                    onChange={(val) => (dispatch(inputChangeSubject({
                                        props: 'subject',
                                        value: val.target.value,
                                        error: 'subjectError'
                                    })))}

                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    {list.message == '3' ? (
                        <Grid container spacing={8} >
                            <Grid item xs>
                                <FormControl className="" fullWidth={true} style={{ marginTop: "2px", fontSize: "15px", margin: "12px" }}>
                                    {/* {<IntlMessages id="label.text" />} <InputLabel
                                        id='demo-simple-select-label'

                                        style={{ fontWeight: "normal", fontSize: "14px" }}></InputLabel> */}
                                    <TextField
                            InputLabelProps={{ shrink: true }}
                      
                            label={<IntlMessages id="label.text" />}
                            variant="outlined"
                                        style={{ marginRight: "28px", marginLeft: "6px" }}
                                      //  multiline
                                        rows={4}
                                        placeholder="Type something"
                                        onChange={(val) => dispatch(inputChangeText({
                                            props: 'sms',
                                            value: val.target.value,
                                            error: 'smsError'

                                        }))}

                                    >
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                    ) : null}
                    {list.message == '1' ? (
                        <Grid container spacing={8} style={{ paddingBottom: "5px"}} >
                            <Grid item xs>
                                <FormControl className="" fullWidth={true} style={{ marginTop: "10px", fontSize: "15px", margin: "5px" }}>
                                    {/* {<IntlMessages id="label.notification" />} <InputLabel
                                        id='demo-simple-select-label'
                                        style={{ fontWeight: "normal", fontSize: "14px" }}></InputLabel> */}
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        label={<IntlMessages id="label.notification" />}
                                        variant="outlined"
                                        style={{ marginRight: "28px", marginLeft: "6px" }}
                                        multiline
                                        rows={4}
                                        placeholder="Type something"
                                        onChange={(val) => (dispatch(inputChangeNoti({
                                            props: 'notiMsg',
                                            value: val.target.value,
                                            error: 'notiMagError'
                                        })))}
                                    >
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                    ) : null}
                    {list.message == '1' ? (
                        <Grid item xs  style={{marginBottom:"20px"}}>
                            <FormControl className=""  style={{ marginTop: "10px", fontSize: "15px", margin: "5px" ,
                           marginLeft:"12px", width:"50%"}}>
                                {<IntlMessages id="label.fileUpload" />} <InputLabel
                                    id='demo-simple-select-label'
                                    style={{ fontWeight: "normal", fontSize: "14px" }}></InputLabel>
                                <div class="mb-1">
                                    <label for="formFile" class="form-label"></label>
                                    <input class="form-control"
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        onChange={(val) => dispatch(inputChangeImage({
                                            props: 'msgImage',
                                            value: val.target.files[0],
                                            error: 'msgImageError'

                                        }))}
                                    />
                                </div>
                            </FormControl>
                        </Grid>
                    ) : null}
                    {list.message == '2' ? (
                        <Grid container spacing={8} style={{ paddingBottom: "30px" }} >

                            <Grid item xs>
                                <FormControl className="" fullWidth={true} style={{ marginTop: "40px", fontSize: "15px", margin: "12px" }}>
                                    {/* {<IntlMessages id="label.email" />} <InputLabel
                                        id='demo-simple-select-label'
                                        style={{ fontWeight: "normal", fontSize: "14px" }}></InputLabel> */}
                                    <TextField
                                        InputLabelProps={{ shrink: true }}
                                        label={<IntlMessages id="label.email" />}
                                        variant="outlined"
                                        style={{ marginRight: "28px", marginLeft: "6px" }}
                                        multiline
                                        rows={4}
                                        placeholder="Type something"
                                        onChange={(val) => (dispatch(inputChangeNoti({
                                            props: 'notiMsg',
                                            value: val.target.value,
                                            error: 'notiMagError'
                                        })))}
                                    >
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </Grid>
                    ) : null}



                    {/* <div class="email-rightbar mb-3">
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="To"/>
                                    </div>

                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Subject"/>
                                    </div>
                                    <div class="form-group">
                                        <div class="summernote">
                                            <h6>Hello Summer note</h6>
                                            <ul>
                                                <li>
                                                    Select a text to reveal the toolbar.
                                                </li>
                                                <li>
                                                    Edit rich document on-the-fly, so elastic!
                                                </li>
                                            </ul>
                                            <p>
                                                End of air-mode area
                                            </p>

                                        </div>
                                    </div>

                                    <div class="btn-toolbar form-group mb-0">
                                        <div class="">
                                            <button type="button" class="btn btn-success waves-effect waves-light m-r-5"><i class="far fa-save"></i></button>
                                            <button type="button" class="btn btn-success waves-effect waves-light m-r-5"><i class="far fa-trash-alt"></i></button>
                                            <button class="btn btn-primary waves-effect waves-light"> <span>Send</span> <i class="fab fa-telegram-plane m-l-10"></i> </button>
                                        </div>
                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>  */}
                       {list.message != '' ? (
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            m={1}
                            p={1}
                            bgcolor="background.paper"
                        >
                            <Button
                            className='buttonMessageTypeSend'
                                color="success"
                                variant="contained"
                                type="submit"
                               // onClick={this.handleSubmit}
                            >
                                <Icon>send</Icon>
                                <span className="pl-2 ml-2 capitalize">
                                    {<IntlMessages id="button.send" />}
                                </span>
                            </Button>
                        </Box>
                    ) : (
                        ''
                    )}
                </SimpleCard>
            </Container >

        </>
    )
}