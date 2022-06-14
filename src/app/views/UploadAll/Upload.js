import React, { Fragment, Component } from 'react'
import IntlMessages from '../../utils/IntlMessages'
import { Container } from 'app/constant/Common'
import { Breadcrumb } from 'app/components'
import { SimpleCard } from 'matx'
import { makeStyles } from "@mui/styles";
import AddingFiles from './AddingFiles'
import { Icon, Button, IconButton, Fab } from '@mui/material'
import {
    removeSamugList,
    InputChange,
    inputChangeFiles,
} from '../../redux/actions/UploadFileAction'
import { useState } from 'react'
import {Dialog} from '@mui/material'
import {DialogTitle} from '@mui/material'
import {List} from '@mui/material'
import {ListItem} from '@mui/material'
import MaterialTable from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import { openPopUp, closePopUp } from '../../redux/actions/UploadFileAction'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}))

export default function Upload() {
    const classes = useStyles()
    const dispatch = useDispatch()
    //const [open, setOpen] = React.useState(false);
    const list = useSelector((state) => state.UploadFileReducer)
    const handleClose = () => {
        // setOpen(false);
        dispatch(closePopUp())
    }
    const setOpen = () => {
        dispatch(openPopUp())
    }
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        // { name: 'Home', path: '/' },
                        {
                            name: <IntlMessages id="title.uploadFiles" />,
                        },
                    ]}
                />
            </div>
            <MaterialTable
                style={{ paddingLeft: '15px' }}
                title="Files Details"
                columns={[
                    { title: 'Sno', field: 'name' },
                    { title: 'User Name', field: 'surname' },
                    { title: 'Post', field: 'post' },
                    { title: 'Post Type', field: 'postType' },
                    { title: 'Tagged Samug', field: 'taggedSamug' },
                ]}
                data={[
                    {
                        name: '1',
                        surname: 'admin',
                        post: 1987,
                        postType: 63,
                        taggedSamug: 'Agri',
                    },
                    {
                        name: '2',
                        surname: 'Baran',
                        post: 1987,
                        postType: 63,
                        taggedSamug: 'shopping',
                    },
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}
                editable={{
                    // onBulkUpdate: changes =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //             resolve();
                    //         }, 1000);
                    //     }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve()
                            }, 1000)
                        }),
                }}
            />
            <SimpleCard
                style={{
                    marginTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                }}
            >
                <div>
                    <div
                        style={{
                            bottom: '0px',
                            right: '0px',
                            float: 'right',
                            position: 'fixed',
                            margin: '100px',
                            marginBottom: '130px',
                            zIndex:1000
                        }}
                    >
                        <Fab
                            color="primary"
                            aria-label="Add"
                            className="button"
                        >
                            <Icon
                                onClick={() => setOpen(true)}
                                style={{ bottom: '0', right: '0' }}
                            >
                                add
                            </Icon>
                        </Fab>
                    </div>
                    <Dialog
                        onClose={handleClose}
                        open={list.uploadPopup}
                        style={{ marginBottom: '-10px' }}
                    >
                        <DialogTitle id="simple-dialog-title">
                            <AddingFiles />
                        </DialogTitle>
                        <List style={{ float: 'right' }}>
                            <ListItem
                                autoFocus
                                button
                                onClick={handleClose}
                                style={{ float: 'right' }}
                            >
                                {/* close */}
                            </ListItem>
                        </List>
                    </Dialog>
                </div>
            </SimpleCard>
        </Container>
    )
}
