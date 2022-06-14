import React, { useEffect } from 'react'
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
} from '@mui/material'
import Select from 'react-select'
import IntlMessages from '../../utils/IntlMessages'
import { Container } from 'app/constant/Common'
import Multiselect from 'multiselect-react-dropdown'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeSamugList,
    selectTheSamug,
    selectTheUser,
    removeUserList,
    imageInputChange,
    inputChange,
    inputChangeFiles,
    videoInputChange,
    audioInputChange,
    getSamugUserList,
    uploadSamugFile,
} from '../../redux/actions/UploadFileAction'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Styles.css'
import { RotatingLines } from  'react-loader-spinner'
export default function AddingFiles() {
    const dispatch = useDispatch()
    const list = useSelector((state) => state.UploadFileReducer)
   // console.log('view', list)

    useEffect(() => {
        //Fetch User List and samug List
        dispatch(getSamugUserList())
    }, [])
    const [options, setOptions] = useState([])

    const removeSamug = (e) => {
        dispatch(removeSamugList(e))
    }
    const [users, setUsers] = useState([])
    const removeUser = (e) => {
        dispatch(removeUserList(e))
    }
    const handleChange = (val) => {
        dispatch(
            inputChange({
                prop: 'textDatas',
                value: val.target.value,
                error: 'textDatasError',
            })
        )
    }
    const image = []
    const handleClick = (event) => {
       // console.log('even', event.target.files.length)
        if (event.target.files.length <= 7) {
            for (let i = 0; i < event.target.files.length; i++) {
                image.push(event.target.files[i])
            }
            dispatch(
                imageInputChange({
                    props: 'image',
                    value: image,
                    error: 'imageError',
                })
            )
        } else {
            toast('Image should be max 7')
        }
    }
    const audio = []
    const handleAudioClick = (event) => {
        if (event.target.files[0].size > 52428800) {
            toast('select less than 50mb audio file')
        } else {
            audio.push(event.target.files[0])
            dispatch(
                audioInputChange({
                    props: 'audio',
                    value: audio,
                    error: 'audioError',
                })
            )
        }
    }
    const video = []
    const handleVideoClick = (event) => {
        if (event.target.files[0].size > 104857600) {
            toast('Select less than 100 mb')
        } else {
            video.push(event.target.files[0])
            dispatch(
                videoInputChange({
                    props: 'video',
                    value: video,
                    error: 'videoError',
                })
            )
        }
    }
    const [selectedOption, setSelectedOption] = useState(null)
    const files = [
        { value: '1', label: 'Image' },
        { value: '2', label: 'Video' },
        { value: '3', label: 'Audio' },
    ]

    const customStyles = {
        menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
        menu: (provided) => ({ ...provided, zIndex: 9999 }),
        fontSize: '10px',
    }

    const submitForm = () => {
        dispatch(
            uploadSamugFile({
                userId: list.selectedUser[0].id,
                countryUid: 101,
                accountType: 1,
                postStatus: 1,
                postDetails: list.textDatas.trim(),
                postPersonalTag: [],
                postExclusive: [],
                postZamugTag: list.selectedSamug,
                postFilesThumbnail: [],
                employeeImage:
                    list.typesOfFiles == 1
                        ? list.image
                        : list.typesOfFiles == 2
                        ? list.video
                        : list.typesOfFiles == 3
                        ? list.audio
                        : [],
            })
        )
    }
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl
                            style={{ fontSize: '15px' }}
                            className=""
                            fullWidth={true}
                        >
                            {<IntlMessages id="label.samug" />}{' '}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    paddingBottom: '40px',
                                    paddingLeft: '2px',
                                }}
                            ></InputLabel>
                            <Multiselect
                                className="selectCustom"
                                options={list.samugList}
                                onRemove={removeSamug}
                                maxMenuHeight={200}
                                styles={customStyles}
                                style={{ fontSize: '10px' }}
                                labelId="demo-simple-select-label"
                                onSelect={(value) => {
                                   // console.log(value)
                                    dispatch(
                                        selectTheSamug({
                                            props: 'samugList',
                                            value: value,
                                            error: 'samugListError',
                                        })
                                    )
                                }}
                                displayValue="name"
                            ></Multiselect>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl
                            className=""
                            fullWidth={true}
                            style={{ fontSize: '15px' }}
                        >
                            {<IntlMessages id="label.user" />}{' '}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    paddingBottom: '4px',
                                    paddingLeft: '2px',
                                }}
                            ></InputLabel>
                            <Multiselect
                                className="selectCustom"
                                //options={users}
                                options={list.userList}
                                onRemove={removeUser}
                                maxMenuHeight={200}
                                styles={customStyles}
                                singleSelect={true}
                                labelId="demo-simple-select-label"
                                onSelect={(value) =>
                                    dispatch(
                                        selectTheUser({
                                            props: 'userList',
                                            value: value,
                                            error: 'userListError',
                                        })
                                    )
                                }
                                displayValue="name"
                            ></Multiselect>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={8}>
                    <Grid item xs>
                        <FormControl
                            className=""
                            fullWidth={true}
                            style={{ marginTop: '40px', fontSize: '15px' }}
                        >
                            {<IntlMessages id="label.text" />}{' '}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                }}
                            ></InputLabel>
                            <TextField
                                id="outlined-multiline-static"
                                //    label="Multiline"
                                multiline
                                rows={4}
                                placeholder="Type something"
                                onChange={handleChange}
                                inputProps={{ maxLength: 5120 }}
                            ></TextField>
                            <span>TextLimit:5120</span>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={8}>
                    <Grid item xs>
                        <FormControl
                            className=""
                            fullWidth={true}
                            style={{ marginTop: '20px', fontSize: '15px' }}
                        >
                            {<IntlMessages id="label.files" />}{' '}
                            <InputLabel
                                id="demo-simple-select-label"
                                style={{
                                    fontWeight: 'normal',
                                    fontSize: '14px',
                                    paddingBottom: '4px',
                                    paddingLeft: '2px',
                                }}
                            ></InputLabel>
                            <Select
                                className="App"
                                labelId="demo-simple-select-label"
                                placeholder="Select"
                                options={files}
                                defaultValue={selectedOption}
                                maxMenuHeight={200}
                                onChange={(setSelectedOption) => {
                                    dispatch(
                                        inputChangeFiles({
                                            props: 'typesOfFiles',
                                            value: setSelectedOption.value,
                                            error: 'typesOfFilesError',
                                        })
                                    )
                                }}
                            ></Select>
                        </FormControl>
                    </Grid>
                    {list.typesOfFiles == '1' ? (
                        <Grid item xs>
                            <FormControl
                                className=""
                                fullWidth={true}
                                style={{ marginTop: '15px', fontSize: '15px' }}
                            >
                                <div class="mb-3">
                                    <label
                                        for="formFileMultiple"
                                        class="form-label"
                                    >
                                        Files
                                    </label>
                                    <input
                                        class="form-control"
                                        type="file"
                                        accept="image/*"
                                        id="image"
                                        multiple
                                        onChange={handleClick}
                                    />
                                </div>
                            </FormControl>
                        </Grid>
                    ) : null}
                    {list.typesOfFiles == '2' ? (
                        <Grid item xs>
                            <FormControl
                                className=""
                                fullWidth={true}
                                style={{ marginTop: '15px', fontSize: '15px' }}
                            >
                                <div class="mb-3">
                                    <label for="formFile" class="form-label">
                                        File
                                    </label>
                                    <input
                                        class="form-control"
                                        display="none"
                                        name="files[]"
                                        data-max-size={104857600}
                                        type="file"
                                        accept="video/mp4,video/*"
                                        id="video"
                                        title="none"
                                        onChange={handleVideoClick}
                                    />
                                </div>
                            </FormControl>
                        </Grid>
                    ) : null}
                    {list.typesOfFiles == '3' ? (
                        <Grid item xs>
                            <FormControl
                                className=""
                                fullWidth={true}
                                style={{ marginTop: '15px', fontSize: '15px' }}
                            >
                                <div class="mb-3">
                                    <label for="formFile" class="form-label">
                                        File
                                    </label>
                                    <input
                                        class="form-control"
                                        type="file"
                                        accept="audio/mp3,audio/mpeg,audio/*"
                                        id="audio"
                                        data-max-size={52428800}
                                        onChange={handleAudioClick}
                                    />
                                </div>
                            </FormControl>
                        </Grid>
                    ) : null}
                    {list.loader ? (
                        <RotatingLines
                            width="100"
                            strokeColor="#6495ED"
                            strokeWidth="1"
                            animationDuration="3"
                        />
                    ) : (
                        <Grid container spacing={8}>
                            <Grid item xs>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{
                                        marginTop: '40px',
                                        marginLeft: '20px',
                                        backgroundColor: 'rgb(71, 111, 221)',
                                        color: 'white',
                                        borderRadius: '5px',
                                        float: 'right',
                                        padding: '10px',
                                    }}
                                    onClick={submitForm}
                                >
                                    Submit
                                </Button>
                                {/* </FormControl> */}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <ToastContainer />
            </Container>
        </>
    )
}
