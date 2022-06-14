import React, { Component, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Icon, Grid, Card, Avatar, Button } from "@mui/material";
// import CountUp from "react-countup";
// import IntlMessages from "app/util/IntlMessages";
import ImageViewers from "./imageViewers";
class KycListTable extends Component {
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
            detailPanel={(val) => {
              const names = [];
              // val = { ...val, statusMode: "2" };
              if (val.frontImage != "") {
                var prop = {};
                prop.original = val.baseUrl + val.frontImage;
                prop.thumbnail = val.baseUrl + val.frontImage;
                //Image
                names.push(prop);
              }
              if (val.backImage != "") {
                var prop = {};
                prop.original = val.baseUrl + val.backImage;
                prop.thumbnail = val.baseUrl + val.backImage;
                names.push(prop);
              }
              if (val.selfiImage != "") {
                var prop = {};
                prop.original = val.baseUrl + val.selfiImage;
                prop.thumbnail = val.baseUrl + val.selfiImage;
                names.push(prop);
              }
           //   console.log(names);
              const images = [
                {
                  original: "https://picsum.photos/id/1018/1000/600/",
                  thumbnail: "https://picsum.photos/id/1018/250/150/",
                },
                {
                  original: "https://picsum.photos/id/1015/1000/600/",
                  thumbnail: "https://picsum.photos/id/1015/250/150/",
                },
                {
                  original: "https://picsum.photos/id/1019/1000/600/",
                  thumbnail: "https://picsum.photos/id/1019/250/150/",
                },
              ];
              return (
                <div style={{ alignItems: "center", textAlign: "center" }}>
                  <ImageViewers images={names} />
                </div>
              );
            }}
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
                title: "Doc Name",
                field: "documentName",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.documentName}
                    </div>
                  );
                },
              },
              {
                title: "Doc ID",
                field: "kycId",

                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.kycId}
                    </div>
                  );
                },
              },
              {
                title: "Name",
                field: "kycName",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.kycName}
                    </div>
                  );
                },
              },

              { title: "DOB", field: "kycDob" },
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

export default KycListTable;
