import React, { Component } from 'react'
import { Container } from 'app/constant/Common';
import { Breadcrumb } from 'app/components';
import IntlMessages from "../../utils/IntlMessages";
import { SimpleCard } from 'matx';
import CurrencyDate from './CurrencyDate';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import {PrintOutCurrency} from './PrintTableCurrency';
import { getCountryCurrency,getDateCurrencyDetails, getCurrencyDate, GetExcelPdfData,excelData } from '../../redux/actions/CurrencyReportAction'
import PdfAndExcel from './PdfAndExcel'
import {
    Card,
    Icon,
    Button
} from '@mui/material'
import { CSVLink, CSVDownload } from "react-csv";
import ChartUsedCurrency from './ChartUsedCurrency';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Currency extends Component {
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
                name: "sno",
                selector: "sno",
                sortable: true
            },
            {
                name: "Country",
                selector: "country",
                sortable: true
            },
            {
                name: "Date",
                selector: "date",
                sortable: true
            },
            {
                name: "Reward Purchase",
                selector: "purchase",
                sortable: true
            },
            {
                name: "Reward Used",
                selector: "rewardUsed",
                sortable: true
            },

        ];
        this.columns_data_for_export = this.columns
    }
    getRewardGraphData(props) {
       // console.log("2st", this.props.currencyTableData)
        let data = this.props.currencyTableData.map((id) =>
            id.detail.map((id) => (
                {
                    country: id.country,
                    date: id.purchaseDate,
                    purchase: id.purchaseCount,
                    rewardUsed: id.purchaseUsed,
                    active: 0
                }
            )))
        data = data.map((currentValue, Index) => {
            currentValue.SNO = Index + 1;
            return currentValue;
        });
        this.props.GetExcelPdfData(data);
        this.setState({ original_rows: data, rows: data });
    }
    download_pdf = (data) => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "px",
        });
        var rows = [];
        doc.autoTable({
            html: 'selector'
        });
        var i = 1;
        this.props.currencyTableData.forEach(element => {
            element.detail.forEach(res => {
                var temp = [i, res.country, res.purchaseDate, res.purchaseCount, res.purchaseUsed]
                rows.push(temp)
                i = i + 1;
            })
           // console.log("rows data pdf", rows)
            this.props.excelData(rows)
        });
        const temp_Colums = this.columns
            .slice(0, this.columns.length)
            .map((d) => d.name);
        doc.autoTable({
            head: [temp_Colums],
            body: rows, startY: 10
        })
      //  console.log(temp_Colums, rows);
        this.getRewardGraphData(this.props.tableDhan)
        doc.save("RewardList.pdf");
    }
    handleClick = () => {
        if(this.props.curCountryIds == ''){
            toast('Select atleast one country');
            return
        }
        this.setState({ OpenTheCard: true });
        this.props.getCurrencyDate(this.props);
    }

    render() {
     //   console.log('this', this.props.currencyTableData)
        return (
            <>
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Home', path: '/' },
                                {
                                    name: (
                                        <IntlMessages id="title.Currency" />
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <SimpleCard>
                        <CurrencyDate />

                        <Button
                        className="buttonGetCurrency"
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
                                className="buttonCurrencyExcel"
                                style={{ backgroundColor: "green", color: "white", marginTop: "10px", float: "right", marginRight: "40px" }}>
                                <CSVLink
                                data = {this.props.saveExcelValues}
                                headers={['Sno','Country','RewardPurchase','Date','RewardUsed']}
                                        filename={"Reward_list.csv"}
                                >
                                    Excel
                                </CSVLink>

                            </Button>
                        }
                        {this.state.OpenTheCard == true &&
                            <Button
                                variant="primary"
                                className="buttonCurrencyPdf"
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
                                    <a href="/PrintTableCurrency" target="_blank">
                                        <Button
                                        className="buttonCurrencyPrint"
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
                            <PdfAndExcel />
                            <ChartUsedCurrency ref={el => (this.componentRef = el)} />
                        </Card>
                    }
                      <ToastContainer/>
                </Container>
            </>
        )
    }
}
const mapToStateProps = (state) => {
    const {
        countryIds,
        country,
        countryError,
        userId,
        toDate,
        tableDhanCurr,
        fromInputDate,
        fromInputDateError,
        toInputDate,
        toInputDateError,
        Graphcolumns,
        fromDate,
        date,
        currencyTableData,
        curCountryIds,
        curCountryName,
        purchase,
        rewardUsed,
        getPdfCurrency,
        saveExcelValues,
        optionChange,
        optionChangeError,
        dateWiseData,
        saveDateCurrency

    } = state.CurrencyReportReducer
    return {
        countryIds,
        country,
        toDate,
        tableDhanCurr,
        countryError,
        userId,
        purchase,
        rewardUsed,
        saveDateCurrency,
        optionChange,
        optionChangeError,
        currencyTableData,
        saveExcelValues,
        fromInputDate,
        fromInputDateError,
        toInputDate,
        toInputDateError,
        Graphcolumns,
        fromDate,
        date,
        curCountryIds,
        dateWiseData,
        curCountryName,
        getPdfCurrency

    }
}
const mapDispatchToProps = {
    getCountryCurrency: getCountryCurrency,
    getCurrencyDate: getCurrencyDate,
    GetExcelPdfData: GetExcelPdfData,
    excelData:excelData,
    getDateCurrencyDetails:getDateCurrencyDetails
}
export default connect(mapToStateProps, mapDispatchToProps)(Currency)
//export default Currency