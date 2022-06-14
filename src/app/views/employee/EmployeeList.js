import React, { Component, Fragment } from "react";
import { SimpleCard } from "matx";
import {
  TextField,
  FormControl,
 FormLabel,
  Grid,
  Button,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";
import Select from "react-select";
import {
  defaultStatusArray,
  defaultStatusArraySelected,
} from "../../constant/Common";
import { employeeAction } from "../../redux/actions/EmployeeActions";
import { connect } from "react-redux";
import EmployeeListTable from "./employeeListTable";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import  IntlMessages  from '../../utils/IntlMessages';
import {Container} from "../../constant/Common";
import { Breadcrumb} from 'app/components'
class EmployeeList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      acceptStatus: false,
      remarks: "",
    };
    this.onEditEmployee = this.onEditEmployee.bind(this);
    this.onDeleteEmployee = this.onDeleteEmployee.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.employeeDataReset();
  }
  handleChange(event) {
    this.setState({ remarks: event.target.value });
    //console.log(this.state.remarks);
  }
  handelEvent(e) {
    e.preventDefault();
    this.props.empListValidate(this.props);
  };
  onEditEmployee(e) {
    this.props.getEmployeeEdit(e);
     }
  onDeleteEmployee(e) {
    //this.setState({ open: true });
    confirmAlert({
      title: "Employee Active InActive",
      message:
        e.status === "1"
          ? "Are you sure want to remove the employee."
          : "Are you sure want to active the employee.",
      // onKeypressEscape: true,
      closeOnClickOutside: true,
      closeOnEscape: true,

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.employeeActiveInactive({
              employeeId: e.employeeId,
              status: e.status,
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  }
  render() {
    return (
      <Container>
           <div className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: 'Home', path: '/' },
              {
                name: (
                  <IntlMessages id="title.employeeList" />
                ),
              },
            ]}
          />
          </div>
       <Fragment>
        {this.props.loader && (
          <div className="loader-view  loader">
            <CircularProgress size={54} />
          </div>
        )}
        <SimpleCard>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl className="mb-4" fullWidth={true}  style={{marginLeft:"30px"}}>
                <FormLabel><IntlMessages id="label.status" /></FormLabel>
                <Select
                
                  className="mb-4 ml-3 w-full selectCustom"
                  options={defaultStatusArray}
                  value={defaultStatusArray.filter((val) => {
                    return val.value == this.props.listStatus;
                  })}
                  onChange={(value) => {
                    this.props.employeeInputChange({
                      prop: "listStatus",
                      value: value.value,
                      error: "listStatusError",
                    });
                  }}
                />
              </FormControl>
            </Grid>
            <Box
            display="flex"
            justifyContent="flex-center"
         
            m={1}
            p={1}
            bgcolor="background.paper"
          >
            <Button
            className="buttonEmployeeList"
              variant="contained"
              color="primary"
              style= {{marginTop:"52px",marginLeft:"40px"}}
              onClick={this.handelEvent}
            >
              <i className="zmdi zmdi-search zmdi-hc-fw" />
              <span><IntlMessages id="button.search" /></span>
            </Button>
          </Box>
          </Grid>

          <div className="pt-sm-24">
            <Divider />

            <EmployeeListTable
              className="mb-4 w-full"
              onEditEmployee={this.onEditEmployee}
             
              //  loadListData={this.loadListData}
              onDeleteEmployee={this.onDeleteEmployee}
              tableName={this.props.listStatus == 1 ? <IntlMessages  id="title.active" /> :<IntlMessages id="title.inactive" />}
              /*result={this.props.employeeList.filter(
                (item) => item.status == 1
              )}*/
              result={this.props.employeeList}
            />
          </div>
        </SimpleCard>
      </Fragment>

    </Container>
    );
  }
}
const mapToStateProps = (state) => {
  const { loader, listStatus, employeeList, listStatusError } = state.employee;
  return {
    loader,
    listStatus,
    employeeList,
    listStatusError,
  };
};
const mapDispatchToProps = {
  employeeInputChange: employeeAction.employeeInputChange,
  empListValidate: employeeAction.getEmployeeList,
  newEmployee: employeeAction.newEmployee,
  getEmployeeEdit: employeeAction.getEmployeeEdit,
  employeeActiveInactive: employeeAction.employeeActiveInactive,
  employeeDataReset: employeeAction.employeeDataReset,
};
export default connect(mapToStateProps, mapDispatchToProps)(EmployeeList);
