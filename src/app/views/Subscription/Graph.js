import React from 'react'
import { SimpleCard } from 'matx'
import {
    FormControl,
    FormLabel,
    Grid,
    MenuItem,
    InputLabel,
    Select,
    Button,
} from '@mui/material'
import { Card } from '@mui/material'
import {
    InputChange,
    getExcelData,
    HandleTheYear,
    DateInputChange,
    selectedMonth,
    yearChange,
    CountryList,
    displayYear,
    getTableList,
} from '../../redux/actions/SubscriptionAction'
import { CSVLink, CSVDownload } from 'react-csv'
import styles from './Graph.css'
import IntlMessages from '../../utils/IntlMessages'
import { Container } from 'app/constant/Common'
import { Breadcrumb } from 'app/components'
import DownloadPdfAndExcel from './DownloadPdfAndExcel'
import Chart2Comparision from './Chart2Comparision'
import ReactToPrint from 'react-to-print'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { GetDataForExcelAndPdf } from '../../redux/actions/SubscriptionAction'
import GraphCountry from './GraphCountry'
import { Icon } from '@mui/material'
import { bunny } from 'app/constant/BunnyCDN';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            OpenTheCard: false,
            original_rows: [],
            rows: [],
            search: '',
            data: [],
        }
        this.columns = [
            {
                name: 'SNO',
                selector: 'sno',
                sortable: true,
            },
            {
                name: 'Year',
                selector: 'year',
                sortable: true,
            },
            {
                name: 'Country',
                selector: 'country',
                sortable: true,
            },
            {
                name: 'New Subscription',
                selector: 'newSubscription',
                sortable: true,
            },
            {
                name: 'Renewal',
                selector: 'renewal',
                sortable: true,
            },
            {
                name: 'Month/Date',
                selector: 'month',
                sortable: true,
            },
        ]
        this.columns_data_for_export = this.columns
    }
    componentDidMount() {
        var securityKey = '602c9b59-fd80-4127-a9fd-d46f40a0e2e0'
        var signedUrl = bunny.signUrl(
            'https://vz-05c2aa56-c07.b-cdn.net/3af6b770-67db-43b0-92b8-c44289340d96/playlist.m3u8',
            securityKey,
            7200,
            '',
            false,
            '/',
            '',
            ''
        )
      //  console.log(signedUrl)
    }
    getData(props) {
        let data = this.props.tableListGraph.map((id) =>
            id.detail.map((id) => ({
                year: id.year,
                country: id.country,
                newSubscription: id.newSubscription,
                renewal: id.renewal,
                month: id.monthName,
                active: 0,
            }))
        )
        data = data.map((currentValue, Index) => {
            currentValue.sno = Index + 1
            return currentValue
        })

        this.props.GetDataForExcelAndPdf(data)
        this.setState({ original_rows: data, rows: data })
    }

    handleClickManage = () => {
        if (this.props.CountryChange == '') {
            toast('Select atleast any one country')
            return
          }
          else{
        this.setState({ OpenTheCard: true })
        this.props.getTableList(this.props)
          }
    }

    download_pdf = (data) => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
        })
        var rows = []
        doc.autoTable({
            html: 'selector',
        })
        /*const temp_rows = this.props.tableListGraph.map((id) => id.detail.map((d1) => (
      this.columns
        .slice(0, this.columns.length)
        .map((d2) => d2.selector)
        .map((d3) => d1[d3])
    )))*/

        var i = 1
        this.props.tableListGraph.forEach((element) => {
            element.detail.forEach((res) => {
                var temp = [
                    i,
                    res.year,
                    res.country,
                    res.newSubscription,
                    res.renewal,
                    res.monthName,
                ]
                rows.push(temp)
                i = i + 1
            })
          //  console.log('rows', [rows])
            this.props.getExcelData(rows)
        })
        const temp_Colums = this.columns
            .slice(0, this.columns.length)
            .map((d) => d.name)
        doc.autoTable({
            head: [temp_Colums],
            body: rows,
            startY: 10,
        })
      //  console.log(temp_Colums, rows)
        this.getData(this.props.tableListGraph)

        doc.save('Subscription.pdf')
    }
    // downloadExcel=()=>{
    //   var i = 0, rows = [];
    //  this.props.tableListGraph.forEach(element => {

    //      element.detail.forEach(res => {

    //        var temp = [i, res.year, res.country, res.newSubscription, res.renewal]
    //       rows.push(temp)
    //        i = i + 1;

    //      }
    //     )
    //    })
    //    const temp_Colums = this.columns
    //    .slice(0, this.columns.length)
    //    .map((d) => d.name);
    //  console.log(temp_Colums, rows);
    // }

    // HandleTheOptions = (value) => {
    //   this.props.InputChange({
    //     prop: "optionChange",
    //     value: value.target.value,
    //     error: "optionChangeError"
    //   })

    // }
    render() {
        return (
            <>
                <Container>
                    <div className="breadcrumb">
                        <Breadcrumb
                            routeSegments={[
                                { name: 'Home', path: '/' },
                                {
                                    name: (
                                        <IntlMessages id="title.Subscription" />
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <SimpleCard
                        style={{ marginTop: '20px', paddingBottom: '20px' }}
                    >
                        <GraphCountry />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginLeft: '40px',
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}
                            onClick={() => {
                                this.handleClickManage()
                            }}
                        >
                            Search
                        </Button>
                        {this.state.OpenTheCard == true && (
                            <Button
                                variant="primary"
                                className=""
                                style={{
                                    backgroundColor: 'green',
                                    marginTop: '10px',
                                    float: 'right',
                                    marginRight: '40px',
                                    color: 'white',
                                }}
                            >
                                <CSVLink
                                    // onClick={this.downloadExcel}
                                    data={this.props.excelData}
                                    headers={[
                                        'SNO',
                                        'Year/Month/Date',
                                        'Country',
                                        'Subscription',
                                        'Renewal',
                                    ]}
                                    filename={'Subscription_list.csv'}
                                >
                                    Excel
                                </CSVLink>
                            </Button>
                        )}
                        {this.state.OpenTheCard == true && (
                            <Button
                                variant="primary"
                                className=""
                                style={{
                                    backgroundColor: 'lightblue',
                                    float: 'right',
                                    marginRight: '10px',
                                    marginTop: '10px',
                                }}
                                onClick={this.download_pdf}
                            >
                                <Icon fontSize="large">picture_as_pdf</Icon>PDF
                            </Button>
                        )}
                        {this.state.OpenTheCard == true && (
                            <ReactToPrint
                                trigger={() => (
                                    <a href="/PrintOut" target="_blank">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            style={{
                                                marginTop: '10px',
                                                marginRight: '10px',
                                                marginBottom: '10px',
                                                float: 'right',
                                                backgroundColor: 'royalblue',
                                            }}
                                            onClick={() => {
                                                // this.handleClickManagePdf()
                                            }}
                                        >
                                            <Icon fontSize="large">print</Icon>
                                            Print
                                        </Button>
                                    </a>
                                )}
                                content={() => this.componentRef}
                            />
                        )}
                    </SimpleCard>
                    {this.state.OpenTheCard == true && (
                        <Card
                            style={{ marginTop: '10px', paddingBottom: '30px' }}
                        >
                            <DownloadPdfAndExcel />
                            <Chart2Comparision
                                ref={(el) => (this.componentRef = el)}
                            />
                        </Card>
                    )}
                       <ToastContainer />
                </Container>
            </>
        )
    }
}
const mapToStateProps = (state) => {
    const {
        optionChange,
        country,
        tableListGraph,
        month,
        CountryChange,
        selectedValues,
        displayValue,
        monthError,
        childrens,
        excelData,
        RemoveOption,
        RemoveMonth,
        RemoveCountry,
        CountryListDropDown,
        optionChangeError,
        monthName,
        fromInputDate,
        yearDate,
        year,
        fromInputDateError,
        toInputDate,
        toInputDateError,
        selectedValue,
        selectedValueError,
        onRemove,
        selectedList,
        CountryDropDown,
        Year,
        countryId,
        yearError,
        countryError,
        yearMultiSelect,
        graphApidata,
        totalGraphTable,
        YearMonth,
        SNO,
        userDhanDate,
        renewal,
    } = state.usertree
    return {
        yearDate,
        excelData,
        optionChange,
        monthName,
        userDhanDate,
        country,
        tableListGraph,
        month,
        year,
        CountryChange,
        selectedValues,
        displayValue,
        monthError,
        childrens,
        RemoveOption,
        RemoveMonth,
        RemoveCountry,
        CountryListDropDown,
        optionChangeError,
        fromInputDate,
        fromInputDateError,
        toInputDate,
        toInputDateError,
        renewal,
        selectedValue,
        selectedValueError,
        onRemove,
        selectedList,
        CountryDropDown,
        Year,
        countryId,
        yearError,
        countryError,
        yearMultiSelect,
        graphApidata,
        totalGraphTable,
        YearMonth,
        SNO,
    }
}
const mapDispatchToProps = {
    GetDataForExcelAndPdf: GetDataForExcelAndPdf,
    CountryList: CountryList,
    HandleTheYear: HandleTheYear,
    getTableList: getTableList,
    getExcelData: getExcelData,
}
export default connect(mapToStateProps, mapDispatchToProps)(Graph)
