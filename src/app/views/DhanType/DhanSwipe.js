import React, { Component } from 'react';
import IntlMessages from "../../utils/IntlMessages";
import { Container } from 'app/constant/Common';
import { Breadcrumb } from 'app/components';
import DhanSwipeCountry from './DhanSwipeCountry';
import { SimpleCard } from 'matx';
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { countryDhanInputChange,getDhanSwipeData,getExcelDhanType } from '../../redux/actions/DhanTypeAction'
import {
  
  Card,
  Icon,
  Button
} from '@mui/material'
import TableDhanSwipe from './TableDhanSwipe';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class DhanSwipe extends Component {
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
        name: "Date",
        selector: "date",
        sortable: true
      },
      {
        name: "Country",
        selector: "country",
        sortable: true
      },
      {
        name: "Long Press",
        selector: "longPress",
        sortable: true
      },
      {
        name: "Fortune",
        selector: "fortune",
        sortable: true
      },

    ];
    this.columns_data_for_export = this.columns
  }

  getTableData(props) {
    let data = this.props.dhanSwipeTableData.map((id) =>
      id.detail.map((id) => (

        {
          sno: id.sno,
          date: id.date,
          country: id.country,
          longPress: id.longPress,
          fortune: id.fortune,
          active: 0
        }
      )))
    data = data.map((currentValue, Index) => {
      currentValue.sno = Index + 1;
      return currentValue;
    });
    this.setState({ original_rows: data, rows: data });
  }
 
  download_pdf = (data) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
    })
    var rows = [];
    doc.autoTable({
      html: 'selector',
    });
    var i = 1;
    this.props.dhanSwipeTableData.forEach(element => {
      element.detail.forEach(res => {
        var temp = [i, res.date, res.country, res.longPress, res.fortune]
        rows.push(temp)
        i = i + 1;
      })
     // console.log("rows", [rows])
      this.props.getExcelDhanType(rows)
    });
    const temp_Colums = this.columns
      .slice(0, this.columns.length)
      .map((d) => d.name);
    doc.autoTable({
      head: [temp_Colums],
      body: rows, startY: 10
    })
    //console.log(temp_Colums, rows);
    this.getTableData(this.props.dhanSwipeTableData);

    doc.save("DhanDetails.pdf");
  }

  handleClick = () => {
    if (this.props.country == '') {
      toast('Select atleast one country');
      return
    }
    this.setState({ OpenTheCard: true });
     this.props.getDhanSwipeData(this.props);
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
                  <IntlMessages id="title.dhanGenerationType" />
                ),
              },
            ]}
          />
        </div>
        <SimpleCard>

          <DhanSwipeCountry />
          <Button
          className='buttonGetDhanSwipe'
            variant="contained"
            color="primary"
            style={{ marginLeft: "40px", marginTop: "10px", marginBottom: "10px" }}
            onClick={() => {
              this.handleClick()
            }}
          >
            Search
          </Button>
          {/* {this.state.OpenTheCard == true &&
            <Button variant="primary"
              className=""
              style={{ backgroundColor: "green", color: "white", marginTop: "10px", float: "right", marginRight: "40px" }}>
              <CSVLink
                 data = {this.props.excelDataSwipe}
                 headers = {['SNO','FromDate','ToDate','Country','LongPress','Fortune']}
                
                   filename={"DhanType_List.csv"}
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
            </Button>} */}
          {/* {this.state.OpenTheCard == true &&
            <ReactToPrint
              trigger={() => (
                <a href="/PrintOutDhanSwipe" target="_blank">
                  <Button
                  className='buttonDhanSwipePrint'
                    variant="contained"
                    color="success"
                    style={{ backgroundColor: "royalblue", marginTop: "10px", marginRight: "10px", marginBottom: "10px", float: "right" }}
                  // onClick={() => {
                  //   //  this.handleClickManage()
                  // }}
                  >
                    <Icon fontSize="large">print</Icon>Print
                  </Button>
                </a>
              )}
              content={() => this.componentRef}
            />} */}
        </SimpleCard>
        {this.state.OpenTheCard == true &&
          <Card style={{ marginTop: "10px", paddingBottom: "30px" }}>
            <TableDhanSwipe />
          </Card>
        }
         {/* <ToastContainer /> */}
         <ToastContainer/>
      </Container>
    )
  }
}
const mapToStateProps = (state) => {
  const {
    country,
    fromDhanDate,
    fromDhanDateError,
    toDhanDate,
    toDhanDateError,
    removeCountry,
    date,
    longPress,
    fortune,
    dhanSwipeTableData,
    excelDataSwipe,
    


  } = state.DhanTypeReducer
  return {
    country,
    fromDhanDate,
    fromDhanDateError,
    toDhanDate,
    toDhanDateError,
    removeCountry,
    date,
    longPress,
    fortune,
    dhanSwipeTableData,
    excelDataSwipe

  }
}
const mapDispatchToProps = {
  countryDhanInputChange: countryDhanInputChange,
  getDhanSwipeData:getDhanSwipeData,
  getExcelDhanType:getExcelDhanType
}
export default connect(mapToStateProps, mapDispatchToProps)(DhanSwipe)