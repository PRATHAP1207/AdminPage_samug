import React, { Component, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Icon, Grid, Card, Avatar, Button } from "@mui/material";

// import CountUp from "react-countup";
// import IntlMessages from "app/util/IntlMessages";
class BankKycListTable extends Component {
  render() {
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
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            style={{ padding: 20, border: 1 }}
            title={this.props.tableName}
            columns={[
              {
                title: "Sno",
                field: "sno",
                render: (rowData) => {
                  return <span>{rowData.tableData.id + 1}</span>;
                },
              },
              { title: "Account Id", field: "accountId" },
              { title: "Full Name", field: "fullName" },
              {
                title: "Bank Name",
                field: "bankName",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.bankName}
                    </div>
                  );
                },
              },
              {
                title: "IFSC Code",
                field: "ifscCode",

                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.ifscCode}
                    </div>
                  );
                },
              },
              { title: "Account No", field: "accountNo" },

              { title: "Date", field: "appliedDate" },

              {
                title: "Status",
                field: "approvedStatus",
                render: (rowData) => {
                  if (rowData.approvedStatus == 1) {
                    return (
                      <small className="border-radius-4 bg-primary text-white px-2 py-2px ">
                        {rowData.approvedStatusCode}
                      </small>
                    );
                  } else if (
                    rowData.approvedStatus == 2 ||
                    rowData.approvedStatus == 5
                  ) {
                    return (
                      <small className="border-radius-4 bg-green text-white px-2 py-2px ">
                        {rowData.approvedStatusCode}
                      </small>
                    );
                  } else if (rowData.approvedStatus == 3) {
                    return (
                      <small className="border-radius-4 bg-yellow text-white px-2 py-2px ">
                        {rowData.approvedStatusCode}
                      </small>
                    );
                  } else if (
                    rowData.approvedStatus == 6 ||
                    rowData.approvedStatus == 9 ||
                    rowData.approvedStatus == 10
                  ) {
                    return (
                      <small className="border-radius-4 bg-error text-white px-2 py-2px ">
                        {rowData.approvedStatusCode}
                      </small>
                    );
                  } else {
                    return (
                      <small className="border-radius-4 bg-warning text-white px-2 py-2px ">
                        {rowData.approvedStatusCode}
                      </small>
                    );
                  }
                },
              },
            ]}
            data={this.props.result.bankKycList}
            actions={[
              {
                icon: () => <Icon style={{ color: "green" }}>thumb_up</Icon>,
                tooltip: "Approved",
                iconProps: { color: "red" },
                onClick: (event, rowData) => {
                  this.props.result.accountsKycBankApproval({
                    data: rowData,
                    remarks: "",
                    props: this.props,
                    status: 1,
                    mode: 1,
                  });
                },
              },
              (rowData) => ({
                icon: () => <Icon style={{ color: "red" }}>delete</Icon>,
                tooltip: "Rejected",
                onClick: (event, rowData) => {
                  this.props.result.accountsKycBankTableReject({
                    data: rowData,
                    status: 2,
                  });
                },
              }),
              (rowData) => ({
                icon: () => <Icon style={{ color: "primary" }}>pageview</Icon>,
                tooltip: "View",
                onClick: (event, rowData) => {
                  return this.props.result.accountsKycBankPopup({
                    data: rowData,
                    status: true,
                  });
                },
              }),
            ]}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
              search: true,
              exportFileName: dateTime + " - " + this.props.tableName,
              paging: true,
              headerStyle: {
                textAlign: "center",
              },

              //rowStyle: (rowData) => ({backgroundColor:selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",}),
              /*** selectionProps: rowData => ({
          disabled: rowData.name === 'Mehmet',
          color: 'primary'
        }) */
            }}
            /*onSelectionChange={(rows) => {
              this.props.result.updateAccountsRowSelected(
                this.props.result.bankKycList
              );
            }}*/
          />
        </div>
      </>
    );
  }
}

export default BankKycListTable;
