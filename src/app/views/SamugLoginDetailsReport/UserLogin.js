import React, { Component } from 'react'
import UserCountry from './UserCountry'
import IntlMessages from "../../utils/IntlMessages";
import { Container } from 'app/constant/Common';
import { Breadcrumb } from 'app/components';
import { SimpleCard } from 'matx';
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import UserDetailTableData from './UserDetailTableData'
import PrintTableUserLogin from './PrintTableUserLogin'
import {
    FormControl,
    FormLabel,
    Grid,
    MenuItem,
    InputLabel,
    Select,
    Card,
    Icon,
    Button
} from '@mui/material'
import { CSVLink, CSVDownload } from "react-csv";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserProcessData, getExcel } from '../../redux/actions/UserDetailsReportAction'

class UserLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            OpenTheCard: false,
            original_rows: [],
            rows: [],
            search: "",
            data: []
        }
        this.columns = [
            {
                name: "SNO",
                selector: "sno",
                sortable: true
            },
            {
                name: "Country",
                selector: "country",
                sortable: true
            },
            {
                name: "Account Id",
                selector: "accountId",
                sortable: true
            },
            {
                name: "Start Time",
                selector: "startTime",
                sortable: true
            },
            {
                name: "End Time",
                selector: "endTime",
                sortable: true
            },

        ];

        this.columns_data_for_export = this.columns
    }
    getData(props) {
       // console.log("1st", this.props.userData)
        let data = this.props.userData.map((id) =>
            id.detail.map((id) => (
                {
                    country: id.country,
                    accountId: id.accountId,
                    startTime: id.startTime,
                    endTime: id.endTime,
                    active: 0
                }
            ))
        )
        data = data.map((currentValue, Index) => {
            currentValue.SNO = Index + 1;
            return currentValue;
        });
        this.setState({ original_rows: data, rows: data });
    }
    download_pdf = (data) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "px",
        });
        var rows = [];
        doc.autoTable({
            html: 'selector',
        });
        var i = 1;
        this.props.userData.forEach(element => {
            element.detail.forEach(res => {
                var temp = [i, res.country, res.accountId, res.startTime == 0 ? '0000:0000' : new Date(parseInt(res.startTime) * 1000).toLocaleString(), res.endTime == 0 ? '0000:00:00' : new Date(parseInt(res.endTime) * 1000).toLocaleString()]
                rows.push(temp)
                i = i + 1;
            })
         //   console.log("rows data pdf", rows)
            this.props.getExcel(rows)
        });
        // const temp_rows = this.props.DhanGraphData.map((d1) =>
        //     this.columns
        //         .slice(0, this.columns.length - 1)
        //         .map((d2) => d2.selector)
        //         .map((d3) => d1[d3])
        // )
        const temp_Colums = this.columns
            .slice(0, this.columns.length)
            .map((d) => d.name);
        doc.autoTable({
            head: [temp_Colums],
            body: rows, startY: 10
        })
        // console.log(temp_Colums, rows);
        this.getData(this.props.tableDhan)
        doc.save("AppUser.pdf");
    }
    handleClick = () => {
        if (this.props.country == '') {
            toast('Select atleast one country');
            return
        }
        this.setState({ OpenTheCard: true });
        this.props.getUserProcessData(this.props);
    }


    render() {
       // console.log("vieweweeweeew", this.props)
        return (
            <>
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                // { name: 'Home', path: '/' },
                                {
                                    name: (
                                        <IntlMessages id="title.samugUserLoginDetails" />
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <SimpleCard>
                        <UserCountry />

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: "40px", marginTop: "10px", marginBottom: "10px" }}
                            onClick={() => {
                                this.handleClick()
                            }}
                        >
                            Search
                        </Button>

                        {this.state.OpenTheCard == true &&
                            <Button variant="primary"
                                className=""
                                style={{ backgroundColor: "green", color: "white", marginTop: "10px", float: "right", marginRight: "40px" }}>
                                <CSVLink
                                    data={this.props.excelData}
                                    headers={['SNO', 'Country', 'AccountId', 'Start Time', 'End Time']}
                                    filename={"UserList.csv"}
                                >
                                    Excel
                                </CSVLink>
                            </Button>
                        }
                        {this.state.OpenTheCard == true &&
                            <Button
                                variant="primary"
                                className=""
                                style={{
                                    backgroundColor: "lightblue",

                                    float: "right",
                                    marginRight: "10px",
                                    marginTop: "10px"
                                }}
                                onClick={this.download_pdf}
                            >
                                <Icon fontSize="large">picture_as_pdf</Icon>PDF
                            </Button>}
                        {this.state.OpenTheCard == true &&
                            <ReactToPrint
                                trigger={() => (
                                    <a href="/PrintTableUserLogin" target="_blank">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            style={{ backgroundColor: "royalblue", marginTop: "10px", marginRight: "10px", marginBottom: "10px", float: "right" }}
                                            onClick={() => {
                                                //  this.handleClickManage()
                                            }}
                                        >
                                            <Icon fontSize="large">print</Icon>Print
                                        </Button>
                                    </a>
                                )}
                                content={() => this.componentRef}
                            />}
                    </SimpleCard>
                    {this.state.OpenTheCard == true &&
                        <Card style={{ marginTop: "10px", paddingBottom: "30px" }}>
                            {this.props.userData != '' ? (
                                <UserDetailTableData />
                            ) : null}
                        </Card>
                    }
                    <ToastContainer />
                </Container>
            </>
        )
    }
}
const mapToStateProps = (state) => {
    const {
        fromDate,
        fromDateError,
        toDate,
        toDateError,
        country,
        excelData,
        userId,
        removeCountry,
        userData,
        accountId,
        startTime,
        endTime

    } = state.UserDetailsReportReducer
    return {
        fromDate,
        fromDateError,
        toDate,
        toDateError,
        country,
        excelData,
        userId,
        removeCountry,
        userData,
        accountId,
        startTime,
        endTime
    }
}
const mapDispatchToProps = {
    getUserProcessData: getUserProcessData,
    getExcel: getExcel

}
export default connect(mapToStateProps, mapDispatchToProps)(UserLogin)