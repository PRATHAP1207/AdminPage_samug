import React, { Component } from 'react'
import { Container } from 'app/constant/Common';
import { Breadcrumb } from 'app/components';
import IntlMessages from "../../utils/IntlMessages";
import { SimpleCard } from 'matx';
import Country from './Country';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import DwnldPdfAndExcelData from './DwnldPdfAndExcelData'
import Charts from './Charts'
import { GetExcelandPdfData, dhanData,sendDateToAction,getDateDhanDetails,getExcelDhan } from '../../redux/actions/DhanReportAction'
import {
    Card,
    Icon,
    Button
} from '@mui/material'
import { CSVLink, CSVDownload } from "react-csv";
import Print from './Print';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Download extends Component {
    constructor(props) {
        super(props)
        this.state = {
            OpenTheCard: false,
            original_rows: [],
            rows: [],
            search: "",
            data:[]
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
                name: "DhanGeneration",
                selector: "dhanGeneration",
                sortable: true
            },
            {
                name: "Dhan Used",
                selector: "dhanUsed",
                sortable: true
            },

        ];
        this.columns_data_for_export = this.columns
    }
    getGraphData(props){
     //   console.log("1st",this.props.tableDhan)
        let data =this.props.tableDhan.map((id) =>
          id.detail.map((id) => (
            {
              country:id.country,
              date:id.date,
              dhanGeneration:id.dhanGeneration,
              dhanUsed:id.dhanUsed,
              active: 0
            }
          )))
           
        data = data.map((currentValue, Index) => {
            currentValue.SNO = Index + 1;
            return currentValue;
        });
        this.props.GetExcelandPdfData(data);
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
    this.props.tableDhan.forEach(element => {
        element.detail.forEach(res => {
          var temp = [i,res.country,res.dhanDate,res.dhanGenerated,res.dhanUsed]
          rows.push(temp)
          i = i + 1;
        })
      //  console.log("rows data pdf",rows)
        this.props.getExcelDhan(rows)
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
            body: rows, startY:10
        })
       // console.log(temp_Colums, rows);
        this.getGraphData(this.props.tableDhan)
        doc.save("DhanGeneration.pdf");
    }
    handleClick = () => {
       // console.log("moving")

       if (this.props.countryChange == '') {
        toast('Select atleast any one country')
        return
    }
        this.setState({ OpenTheCard: true });
        this.props.dhanData(this.props);
    }

    render() {
      //  console.log(this.props.dhanTableGraphData)
        return (
            <>
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Home', path: '/' },
                                {
                                    name: (
                                        <IntlMessages id="title.DhanReport" />
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <SimpleCard>
                        <Country />

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
                                    data={this.props.excelDhanDetails}
                                    headers={['SNO','Country','Date','Dhan Generated','Dhan Used']}
                                    filename={"Dhan_list.csv"}
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
                                    <a href="/Print" target="_blank">
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
                            <DwnldPdfAndExcelData />
                            <Charts />
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
        DhanGraphData,
        fromCountryDate,
        fromCountryDateError,
        toCountryDate,
        toCountryDateError,
        DisplayCountry,
        countryId,
        DhanCountryList,
        country,
        dhanGeneratedSave,
        dhanUsedSave,
        date,
        dhanGeneration,
        dhanUsed,
        CountryError,
        removeCountryDhan,
        userId,
        displayPieChart,
        dhanTableGraphData,
        countryChange,
        tableDhan,
        excelDhanDetails,
        DhanCalculation,
        countryData
    } = state.DhanReportReducer
    return {
        DhanGraphData,
        DhanCalculation,
        fromCountryDate,
        fromCountryDateError,
        toCountryDate,
        toCountryDateError,
        DisplayCountry,
        countryId,
        dhanGeneratedSave,
        dhanUsedSave,
        date,
        countryData,
        dhanGeneration,
        dhanUsed,
        DhanCountryList,
        displayPieChart,
        CountryError,
        removeCountryDhan,
        userId,
        dhanTableGraphData,
        country,
        countryChange,
        tableDhan,
        excelDhanDetails
    }
}
const mapDispatchToProps = {
    GetExcelandPdfData: GetExcelandPdfData,
    dhanData: dhanData,
    sendDateToAction:sendDateToAction,
    getDateDhanDetails:getDateDhanDetails,
    getExcelDhan:getExcelDhan

}
export default connect(mapToStateProps, mapDispatchToProps)(Download)