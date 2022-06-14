import React, { Component } from "react";
import MaterialTable from "material-table";
import { Icon } from "@mui/material";
//import AutorenewIcon from "@material-ui/icons/Autorenew";
//import IntlMessages from "app/util/IntlMessages";
import ModetatorImageView from "./ModetatorImageView";
import ModetatorVideoView from "./ModetatorVideoView";
import ModetatorTextView from "./ModetatorTextView";
import { Link, useNavigate } from 'react-router-dom';
import {withNavigation} from "../../constant/Common";

class ModeratorListTable extends Component {
 
  handelBlockUsers(row, mode) {
    //this.props.result.moderatorStatus({ row, mode });
   //console.log(this.props)
  }
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
              // val = { ...val, statusMode: "2" };
              if (val.doc.postType == 1) {
                //Image
                return (
                  <ModetatorImageView
                    props={val}
                    statusMode="2"
                    handelBlockUser={this.handelBlockUsers}
                  />
                );
              } else if (val.doc.postType == 2) {
                //Video

                return (
                  <ModetatorVideoView
                    props={val}
                    statusMode="2"
                    handelBlockUser={this.handelBlockUsers}
                  />
                );
              } else if (val.doc.postType == 3) {
                //Text
                return (
                  <ModetatorTextView
                    props={val}
                    statusMode="2"
                    handelBlockUser={this.handelBlockUsers}
                  />
                );
              }
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
              {
                title: "Display Name",
                field: "displayName",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.displayName}
                    </div>
                  );
                },
              },
              {
                title: "Full Name",
                field: "fullName",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.fullName}
                    </div>
                  );
                },
              },
              {
                title: "Mode",
                field: "modeName",
                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      {rowData.modeName}
                    </div>
                  );
                },
              },
              {
                title: "Report Count",
                field: "reportCount",

                render: (rowData) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                        wordWrap: "break-word",
                        wordBreak: "break-all",
                      }}
                    >
                      <div>
                        <table>
                          <tbody>
                            <tr>
                              <th>Last 7 </th>
                              <td>{rowData.reportCount.last7}</td>
                            </tr>
                            <tr>
                              <th>Last 30 </th>
                              <td>
                                {parseInt(rowData.reportCount.last7) +
                                  parseInt(rowData.reportCount.last30)}
                              </td>
                            </tr>
                            <tr>
                              <th>Last 365 </th>
                              <td>
                                {parseInt(rowData.reportCount.last7) +
                                  parseInt(rowData.reportCount.last30) +
                                  parseInt(rowData.reportCount.last365)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                },
              },

              { title: "Date", field: "postTime" },
            ]}
            data={this.props.result.moderatorList}
            actions={[
              (rowData) => ({
                icon: () =><Icon style={{ color: "green" }}>pageview</Icon>,
                tooltip: "View",
                onClick: (event, rowData) => {
                //  this.props.useNavigate("/mod/prof");
                  return this.props.result.moderatorRecordView({
                    rowData: rowData,
                    pageSize: 0 ,//this.props.result.pageSize,
                    requestTime: this.props.result.requestTime,
                    navigation:this.props.navigate
                  });
                },
              }),
            ]}
            options={{
              exportButton: false,
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

export default withNavigation(ModeratorListTable);
