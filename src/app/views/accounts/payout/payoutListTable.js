import React, { Component, useState } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { Icon, Grid, Card, Avatar, Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CountUp from 'react-countup'
import IntlMessages from '../../../utils/IntlMessages'
import { Container, Small, generalFunction } from 'app/constant/Common'
class PayoutListTable extends Component {
    render() {
        const {
            onEditEmployee,
            loadListData,
            result,
            tableName,
            onDeleteEmployee,
        } = this.props
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
        var formatValue = (value) => value.toFixed(2)
        //const [selectedRow, setSelectedRow] = useState(null);

        return (
            <>
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                        style={{ padding: 10, border: 1, width: '100%' }}
                        title={this.props.tableName}
                        columns={[
                            {
                                title: 'Sno',
                                field: 'sno',

                                render: (rowData) => {
                                    return (
                                        <span>{rowData.tableData.id + 1}</span>
                                    )
                                },
                            },
                            { title: 'Account Id', field: 'accountId' },
                            { title: 'Name', field: 'fullName' },
                            {
                                title: 'Reference Id',
                                field: 'referenceId',

                                render: (rowData) => {
                                    return (
                                        <div
                                            style={{
                                                textAlign: 'left',
                                                wordWrap: 'break-word',
                                                wordBreak: 'break-all',
                                            }}
                                        >
                                            {rowData.referenceId}
                                        </div>
                                    )
                                },
                            },
                            { title: 'Contact No', field: 'contactNo' },
                            {
                                title: 'Amount',
                                field: 'transactionAmount',

                                render: (rowData) => {
                                    return (
                                        <div style={{ textAlign: 'center' }}>
                                            {rowData.transactionAmount}
                                        </div>
                                    )
                                },
                            },
                            {
                                title: 'Payout Via',
                                field: 'accountType',

                                render: (rowData) => {
                                    return (
                                        <div style={{ textAlign: 'center' }}>
                                            {rowData.accountType}
                                        </div>
                                    )
                                },
                            },
                            {
                                title: 'Date',
                                field: 'transactionDate',

                                render: (rowData) => {
                                    return (
                                        <div style={{ textAlign: 'center' }}>
                                            {generalFunction.changeDateFormat(
                                                rowData.transactionDate
                                            )}
                                        </div>
                                    )
                                },
                            },
                            {
                                title: 'Transaction ID',
                                field: 'transactionId',
                            },
                            {
                                title: 'Status',
                                field: 'transactionStatus',

                                render: (rowData) => {
                                    if (rowData.transactionStatus == 1) {
                                        return (
                                            <Small
                                                bgcolor="blue"
                                                className="border-radius-4 bg-primary text-white px-2 py-2px "
                                            >
                                                {rowData.transactionStatusCode}
                                            </Small>
                                        )
                                    } else if (
                                        rowData.transactionStatus == 2 ||
                                        rowData.transactionStatus == 5
                                    ) {
                                        return (
                                            <Small
                                                bgcolor="green"
                                                className="border-radius-4 bg-green text-white px-2 py-2px "
                                            >
                                                {rowData.transactionStatusCode}
                                            </Small>
                                        )
                                    } else if (rowData.transactionStatus == 3) {
                                        return (
                                            <Small
                                                bgcolor="yellow"
                                                className="border-radius-4 bg-yellow text-white px-2 py-2px "
                                            >
                                                {rowData.transactionStatusCode}
                                            </Small>
                                        )
                                    } else if (
                                        rowData.transactionStatus == 6 ||
                                        rowData.transactionStatus == 9 ||
                                        rowData.transactionStatus == 10
                                    ) {
                                        return (
                                            <Small
                                                bgcolor="red"
                                                className="border-radius-4 bg-error text-white px-2 py-2px "
                                            >
                                                {rowData.transactionStatusCode}
                                            </Small>
                                        )
                                    } else {
                                        return (
                                            <Small
                                                bgcolor="yellow"
                                                className="border-radius-4 bg-warning text-white px-2 py-2px "
                                            >
                                                {rowData.transactionStatusCode}
                                            </Small>
                                        )
                                    }
                                },
                            },
                        ]}
                        data={this.props.result.accountsList}
                        // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
                        options={{
                            tableLayout:"auto",
                            pageSizeOptions:[5,10,20],
                            rowStyle: {
                                // overflowWrap: 'break-word',
                                overflowWrap: 'normal',
                            },
                            filtering: false,
                            //tableLayout: 'fixed',
                            /*fixedColumns: {
                                left: 2,
                                right: 1,
                            },*/
                            exportButton: true,
                            actionsColumnIndex: -1,
                            search: true,
                            exportFileName:
                                dateTime + ' - ' + this.props.tableName,
                            paging: true,
                            headerStyle: {
                                textAlign: 'center',
                                //width:"20%"
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
                            )
                        }}
                        components={{
                            Toolbar: (props) => (
                                <div>
                                    <MTableToolbar {...props} />

                                    <Grid container rowSpacing={1} spacing={4}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            spacing={4}
                                            style={{ marginBottom: 10 }}
                                        >
                                            <Card
                                                elevation={3}
                                                className="p-4"
                                                raised={true}
                                                // style={{marginBottom:10}}
                                            >
                                                <div className="flex items-center">
                                                    <h5
                                                        className="font-medium text-green m-2"
                                                        style={{
                                                            marginLeft: '20px',
                                                            fontSize: '15px',
                                                            color: 'green',
                                                        }}
                                                    >
                                                        <IntlMessages id="title.bankBalance" />
                                                    </h5>
                                                </div>
                                                <div className="row pt-4 pl-4 flex items-center">
                                                    <h2 className="m-2 pl-2 text-muted flex-grow">
                                                        <CountUp
                                                            start={0}
                                                            style={{
                                                                paddingLeft:
                                                                    '20px',
                                                            }}
                                                            end={
                                                                this.props
                                                                    .result
                                                                    .accountBalance
                                                            }
                                                            duration={2.75}
                                                            separator=","
                                                            decimals={2}
                                                            decimal="."
                                                            prefix="RS "
                                                            suffix=" left"
                                                            redraw={true}
                                                        ></CountUp>
                                                        <Avatar
                                                            style={{
                                                                width: 35,
                                                                height: 35,
                                                                backgroundColor:
                                                                    '#008000',
                                                                float: 'right',
                                                                marginRight:
                                                                    '20px',
                                                            }}
                                                        >
                                                            <AutorenewIcon />
                                                        </Avatar>
                                                    </h2>
                                                </div>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card elevation={3} className="p-4">
                                                <div className="flex items-center">
                                                    <h5
                                                        className="font-medium text-error m-2"
                                                        style={{
                                                            marginLeft: '20px',
                                                            fontSize: '15px',
                                                            color: 'red',
                                                        }}
                                                    >
                                                        <IntlMessages id="title.customerPayment" />
                                                    </h5>
                                                </div>
                                                <div className="row pt-4 pl-4 flex items-center">
                                                    <h2 className="m-2 pl-2  text-muted flex-grow">
                                                        <CountUp
                                                            style={{
                                                                paddingLeft:
                                                                    '20px',
                                                            }}
                                                            start={0}
                                                            end={parseInt(
                                                                this.props
                                                                    .result
                                                                    .selectedAmount
                                                            )}
                                                            duration={2.75}
                                                            separator=","
                                                            decimals={2}
                                                            decimal="."
                                                            prefix="RS "
                                                            suffix=" "
                                                        ></CountUp>

                                                        <Button
                                                        className="payOutTableList"
                                                            color="primary"
                                                            variant="contained"
                                                            style={{
                                                                float: 'right',
                                                                marginRight:
                                                                    '20px',
                                                            }}
                                                            type="button"
                                                            onClick={() => {
                                                                this.props.result.accountsPayoutUpdate(
                                                                    this.props
                                                                        .result
                                                                )
                                                            }}
                                                        >
                                                            <Icon>send</Icon>
                                                            <span className="pl-2 pb-2 capitalize">
                                                                <IntlMessages id="title.payout" />
                                                            </span>
                                                        </Button>
                                                    </h2>
                                                </div>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                    {/*<div style={{ padding: "0px 10px" }}>
                  Selected Amount :
                    <Fab className="ml-4 bg-green box-shadow-none text-white" size="small">
                       0
                    </Fab>
                  </div>*/}
                                </div>
                            ),
                        }}
                    />
                </div>
            </>
        )
    }
}

export default PayoutListTable
