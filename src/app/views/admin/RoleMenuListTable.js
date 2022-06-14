import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { adminAction } from 'app/redux/actions/AdminActions'
//import ExampleComponent from "react-rounded-image";
import Icon from '@mui/material/Icon'
class RoleMenuListTable extends Component {
    listDataView = (menu) => {
        let filterData = menu.split(',')
        return (
            <div>
                {this.props.menuList
                    .filter((name) => {
                        return filterData.includes(name.uid)
                    })
                    .map((filteredName) => {
                        return (
                            <li key={filteredName.uid}>
                                {filteredName.menuName}
                            </li>
                        )
                    })}
            </div>
        )
    }

    render() {
        const remove = <Icon>delete</Icon>

        const check = <Icon>check</Icon>
        var today = new Date()
        var date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate()
        var time =
            today.getHours() +
            ':' +
            today.getMinutes() +
            ':' +
            today.getSeconds()
        var dateTime = date + ' ' + time

        return (
            <>
                <MaterialTable
                    style={{ padding: '0 18px' }}
                    title={this.props.tableName}
                    columns={[
                        {
                            title: 'Sno',
                            field: 'sno',
                            render: (rowData) => {
                                return <span>{rowData.tableData.id + 1}</span>
                            },
                        },
                        { title: 'Role', field: 'rolesName' },
                        {
                            title: 'Menu List',
                            field: 'menuDetails',
                            render: (rowData) =>
                                rowData.menuDetails == '0'
                                    ? 'ALL'
                                    : this.listDataView(rowData.menuDetails),
                        },
                    ]}
                    data={this.props.result}
                    actions={[
                        {
                          // disabled : this.props.result == 2,
                            icon: 'edit',
                            tooltip: 'Edit Roles',
                            onClick: (event, rowData) => {
                                //return alert("You Edit " + rowData.towerId);
                                return this.props.onEdit(rowData)
                            },
                        },
                        (rowData) => ({
                            icon: rowData.status == 1 ? 'delete' : 'check',

                            tooltip:
                                rowData.status == 1
                                    ? 'InActivate Roles'
                                    : 'Activate Roles',

                            onClick: (event, rowData) => {
                                //return confirm("You want to delete " + rowData.name);
                                return this.props.onDelete(rowData)
                            },
                            //disabled: rowData.birthYear < 2000
                        }),
                    ]}
                    options={{
                        exportButton: false,
                        actionsColumnIndex: -1,
                        search: true,
                        exportFileName: dateTime + 'Device List',
                        paging: true,
                    }}
                />
            </>
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
        statusUpdate,
        popupStatus,
        selectedRoles,
        rolesId,
    } = state.admins
    const { userId,loginTokenCreated } = state.login
    return {
        loader,
        roleName,
        rolesList,
        menuList,
        listStatus,
        popupStatus,
        statusUpdate,
        selectedRoles,
        rolesId,
        userId,
        loginTokenCreated
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
export default connect(mapToStateProps, mapDispatchToProps)(RoleMenuListTable)
