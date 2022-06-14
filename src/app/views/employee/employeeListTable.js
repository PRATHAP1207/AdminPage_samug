import React, { Component } from "react";
import MaterialTable from "material-table";
import ExampleComponent from "react-rounded-image";
import  IntlMessages  from '../../utils/IntlMessages';
//import { Container } from "@mui/material";
import { Container } from "app/constant/Common";
import { Icon} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {withNavigation} from "../../constant/Common";


class EmployeeListTable extends Component {
  render() {
    const {
      onEditEmployee,
      loadListData,
      result,
      tableName,
      onDeleteEmployee,
    } = this.props;
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    return (
      <>
      <Container>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          style={{paddingLeft:"20px"}}
          title={this.props.tableName}
          columns={[
            {
              title: <IntlMessages id="label.sno" />,
              field: "sno",
              render: (rowData) => {
                return <span>{rowData.tableData.id + 1}</span>;
              },
            },
            { title: <IntlMessages id="label.employeeId" />, field: "employeeId" },
            { title: <IntlMessages id="label.employeeName" />, field: "employeeName" },
            { title: <IntlMessages id="label.designation" />, field: "designation" },
            { title: <IntlMessages id="label.contactNo" />, field: "contactNo" },
            { title: <IntlMessages id="label.emailId" />, field: "emailId" },
            {
              title: <IntlMessages id="label.image" />,
              field: "employeeImage",
              render: (rowData) => (
                <ExampleComponent
                  image={rowData.employeeImage}
                  roundedColor="#FFFFFF"
                  imageWidth="100"
                  imageHeight="100"
                  roundedSize="4"
                />
              ),
            },
          ]}
          data={this.props.result}
          actions={[
            {
              icon: () => <Icon style={{ color: "green" }}>edit</Icon>,
              tooltip:<IntlMessages id="label.employeeEdit" />,
              onClick: (event, rowData) => {
               
               // return alert("You Edit " + rowData.towerId);
                return this.props.onEditEmployee({rowData: rowData ,navigation:this.props.navigate});
              },
            },
            (rowData) => ({
              icon: () => <Icon style={{ color: "red" }}>delete</Icon>,
              tooltip: <IntlMessages id="label.deleteEmployee" />,
              onClick: (event, rowData) => {
                //return confirm("You want to delete " + rowData.name);
                return this.props.onDeleteEmployee(rowData);
              },
              //disabled: rowData.birthYear < 2000
            }),
          ]}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
            search: true,
            exportFileName: dateTime + "Employee List",
            paging: true,
            headerStyle: { position: 'center'},
          
          }}
        />
        </div>
        </Container>
      </>

    );
  }
}

export default withNavigation(EmployeeListTable);
