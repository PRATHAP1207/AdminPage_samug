import React, { Component, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Icon, Grid, Card, Avatar, Button } from "@mui/material";

// import CountUp from "react-countup";
// import IntlMessages from "app/util/IntlMessages";
import { Container } from "app/constant/Common";
class PayinListTable extends Component {
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
    var formatValue = (value) => value.toFixed(2);
    //const [selectedRow, setSelectedRow] = useState(null);
   // console.log(this.props);

    return (
      <>
      <Container>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            style={{ padding: 20, border: 1, marginTop:"20px" }}
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
                title: "ReferenceId",
                field: "referenceId",

                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.referenceId}
                    </div>
                  );
                },
              },
              { title: "Contact No", field: "contactNo" },
              {
                title: "Amount",
                field: "transactionAmount",
                render: (rowData) => {
                  return (
                    <div style={{ textAlign: "center" }}>
                      {rowData.transactionAmount}
                    </div>
                  );
                },
              },
              { title: "Date", field: "transactionDate" },
              { title: "Transaction ID", field: "transactionId" },
              {
                title: "Status",
                field: "transactionStatus",
                render: (rowData) => {
                  if (rowData.transactionStatus == 1) {
                    return (
                      <small className="border-radius-4 bg-primary text-white px-2 py-2px ">
                        {rowData.transactionStatusCode}
                      </small>
                    );
                  } else if (
                    rowData.transactionStatus == 2 ||
                    rowData.transactionStatus == 5
                  ) {
                    return (
                      <small className="border-radius-4 bg-green text-white px-2 py-2px ">
                        {rowData.transactionStatusCode}
                      </small>
                    );
                  } else if (rowData.transactionStatus == 3) {
                    return (
                      <small className="border-radius-4 bg-yellow text-white px-2 py-2px ">
                        {rowData.transactionStatusCode}
                      </small>
                    );
                  } else if (
                    rowData.transactionStatus == 6 ||
                    rowData.transactionStatus == 9 ||
                    rowData.transactionStatus == 10
                  ) {
                    return (
                      <small className="border-radius-4 bg-error text-white px-2 py-2px ">
                        {rowData.transactionStatusCode}
                      </small>
                    );
                  } else {
                    return (
                      <small className="border-radius-4 bg-warning text-white px-2 py-2px ">
                        {rowData.transactionStatusCode}
                      </small>
                    );
                  }
                },
              },
            ]}
            data={this.props.result.accountsList}
            // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
              search: true,
              exportFileName: dateTime + " - " + this.props.tableName,
              paging: true,
              headerStyle: {
                textAlign: "center",
              },

              selection:
                this.props.result.reportType == 3 ||
                this.props.result.reportType == 4
                  ? true
                  : false,
              //rowStyle: (rowData) => ({backgroundColor:selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",}),
              /*** selectionProps: rowData => ({
          disabled: rowData.name === 'Mehmet',
          color: 'primary'
        }) */
            }}
            onSelectionChange={(rows) => {
              this.props.result.updateAccountsRowSelected(
                this.props.result.accountsList
              );
            }}
         
          />
        </div>
        </Container>
      </>
    );
  }
}

export default PayinListTable;
