import React, { Component, Fragment, PureComponent } from 'react'
import { SimpleCard } from 'matx'
import {
    FormControl,
    FormLabel,
    Grid,
    Button,
    Divider,
    Box,
    CircularProgress,
    Icon,
} from '@mui/material'
import Select from 'react-select'
import { defaultStatusArray } from 'app/constant/Common'
import { adminAction } from 'app/redux/actions/AdminActions'
import { connect } from 'react-redux'
import RoleMenuListTable from './RoleMenuListTable'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import IntlMessages from '../../utils/IntlMessages'
import { Fab } from '@mui/material'
import NewRolesDialog from './newRolesDialog'
import { Container } from '../../constant/Common'
import { Breadcrumb } from 'app/components'

class RoleMenu extends PureComponent {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open: false,
            acceptStatus: false,
            remarks: '',
            selectStatus:'',
        }
        this.onEditEmployee = this.onEditEmployee.bind(this)
        this.onDeleteEmployee = this.onDeleteEmployee.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.adminReset()
        this.props.adminRoleListRequest(this.props)
    }
    handleChange(event) {
        this.setState({ remarks: event.target.value })
        //console.log(this.state.remarks);
    }
    handelEvent = (e) => {
        e.preventDefault()
        this.props.adminRoleListRequest(this.props)
    }
    onEditEmployee(e) {
        this.props.openEditPopUp(e)
    }

    onDeleteEmployee(e) {
        //this.setState({ open: true });
        confirmAlert({
            title: 'Roles Active InActive',
            message:
                e.status === '1'
                    ? 'Are you sure want to remove the roles.'
                    : 'Are you sure want to active the roles.',
            // onKeypressEscape: true,
            closeOnClickOutside: true,
            closeOnEscape: true,

            buttons: [
                {
                    className:"buttonYesRoleMenu",
                    label: 'Yes',
                    onClick: () => {
                        this.props.rolesActiveInactive({
                            roleId: e.uid,
                            status: e.status,
                            userId: this.props.userId,
                        })
                    },
                },
                {
                    className:"buttonNoRoleMenu",
                    label: 'No',
                },
            ],
        })
    }
    render() {
        return (
            <Container>
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Admin', path: '/' },
                            {
                                name: <IntlMessages id="title.roles" />,
                            },
                        ]}
                    />
                </div>
                <Fragment>
                    <NewRolesDialog {...this.props} />
                    {this.props.loader && (
                        <div className="loader-view  loader">
                            <CircularProgress size={54} />
                        </div>
                    )}

                    <SimpleCard
                        style={{ paddingLeft: '20px', paddingTop: '20px' }}
                    >
                        <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControl
                                    className="mb-4"
                                    style={{ padding: '20px' }}
                                    fullWidth={true}
                                >
                                    <FormLabel>
                                        <IntlMessages id="label.status" />
                                    </FormLabel>
                                    <Select
                                        className="mb-4 w-full selectCustom"
                                        options={defaultStatusArray}
                                        value={defaultStatusArray.filter(
                                            (val) => {
                                                return (
                                                    val.value ==
                                                    this.props.listStatus
                                                )
                                            }
                                        )}
                                        onChange={(value) => {
                                            this.props.adminInputChange({
                                                prop: 'listStatus',
                                                value: value.value,
                                                error: 'listStatusError',
                                            })
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box
                            display="flex"
                            justifyContent="flex-center"
                            m={1}
                            p={1}
                            bgcolor="background.paper"
                        >
                            <Button
                            className="buttonRoleMenuSearch"
                                variant="contained"
                                color="primary"

                                onClick={this.handelEvent}
                            >

                                <i className="zmdi zmdi-search zmdi-hc-fw" />
                                <span>
                                    <IntlMessages id="button.search" />
                                </span>
                            </Button>
                        </Box>
                    </SimpleCard>

                    <Divider />

                    <SimpleCard
                        style={{ paddingLeft: '20px', paddingTop: '20px' }}
                    >
                        <div className="pt-sm-24">
                            <RoleMenuListTable
                                className="mb-4 w-full"
                                onEdit={this.onEditEmployee}
                                //  loadListData={this.loadListData}
                                onDelete={this.onDeleteEmployee}
                                tableName={
                                    this.props.listStatus == 1 ? (
                                        <IntlMessages id="title.active" />
                                    ) : (
                                        <IntlMessages id="title.inactive" />
                                    )
                                }
                                result={this.props.rolesList}
                                menuList={this.props.menuList}
                            />
                        </div>
                    </SimpleCard>

                    <div className="floatingIcons">
                        <Fab
                            onClick={() => this.props.openNewPopUp(0)}
                            color="primary"
                            aria-label="add"
                            style={{
                                position: 'fixed',
                                display: 'flex',
                                padding: '0',
                                width: '60px',
                                height: '60px',
                                bottom: '40px',
                                right: '40px',
                                margin: 'auto 20px 20px auto',
                                zIndex: 100,
                            }}
                        >
                            <Icon>add_circle</Icon>
                        </Fab>
                    </div>
                </Fragment>
            </Container>
        )
    }
}
const mapToStateProps = (state) => {
    const {
        loader,
        roleName,
        rolesList,
        menuList,
        listStatus,
        popupStatus,
        selectedRoles,
        rolesId,
        rolesBackUp,
    } = state.admins
    const { userId,loginTokenCreated} = state.login
    return {
        loader,
        roleName,
        rolesList,
        menuList,
        listStatus,
        popupStatus,
        selectedRoles,
        rolesId,
        userId,
        rolesBackUp,
        loginTokenCreated,
    }
}
const mapDispatchToProps = {
    adminInputChange: adminAction.adminInputChange,
    adminRoleListRequest: adminAction.adminRoleListRequest,
    adminReset: adminAction.adminReset,
    openNewPopUp: adminAction.openNewPopUp,
    openEditPopUp: adminAction.openEditPopUp,
    newRoleUpdate: adminAction.newRoleUpdate,
    closePopup: adminAction.closePopup,
    rolesActiveInactive: adminAction.rolesActiveInactive,
}
export default connect(mapToStateProps, mapDispatchToProps)(RoleMenu)
