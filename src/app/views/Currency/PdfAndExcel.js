// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { CSVLink, CSVDownload } from "react-csv";
// import styles from "./Graph.css";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import {GetDataForExcelAndPdf} from "../../redux/actions/Demo";
// import { connect } from "react-redux";
// import MaterialTable from "material-table";
// //import axios from "axios";

// import DataTable from "react-data-table-component";

// class DownloadPdfAndExcel extends React.Component {
//   constructor() {
//     super();

//     this.columns = [
//       {
//         name: "#",
//         selector: "SNO",
//         sortable: true
//       },
//       {
//         name: "Document UID",
//         selector: "docCategoryUID",
//         sortable: true
//       },
//       {
//         name: "Document Type Name",
//         selector: "docCategoryName",
//         sortable: true
//       },
//       {
//         name: "Category UID",
//         selector: "docCategoryUID",
//         sortable: true
//       },
//       {
//         name: "Category Name",
//         selector: "docCategoryName",
//         sortable: true
//       },
  
//     ];
//     this.state = { original_rows: [], rows: [], search: "" };
//     this.columns_data_for_export = this.columns
//       .slice(0, this.columns.length - 1)
//       .map((d) => d.name);
//     // this.rows_data_for_export = this.state.rows.map((d1) =>
//     //   this.columns
//     //     .slice(0, this.columns.length - 1)
//     //     .map((d2) => d2.selector)
//     //     .map((d3) => d1[d3])
//     // );
//  //   this.do_search = this.do_search.bind(this);
//     this.download_pdf = this.download_pdf.bind(this);
//   }

//   componentDidMount() {
//         let data = [
//           {
//             docCategoryUID: 33,
//             docCategoryName: "docate1",
//             createdOn: "2020-01-01T00:00:00.000+00:00",
//             createdBy: "noname",
//             active: 0
//           },
//           {
//             docCategoryUID: 60,
//             docCategoryName: "doccat2",
//             createdOn: null,
//             createdBy: null,
//             active: 0
//           },
//           {
//             docCategoryUID: 61,
//             docCategoryName: "docate123",
//             createdOn: "2020-01-02T00:00:00.000+00:00",
//             createdBy: "noname",
//             active: 0
//           },
//           {
//             docCategoryUID: 76,
//             docCategoryName: "dc1",
//             createdOn: "1970-01-01T00:00:02.000+00:00",
//             createdBy: "dc2",
//             active: 0
//           }
//         ];
//   //  this.props.GetDataForExcelAndPdf(data);

//         data = data.map((currentValue, Index) => {
//           currentValue.SNO = Index + 1;
//           return currentValue;
//         });
//         this.props.GetDataForExcelAndPdf(data);
//         this.setState({ original_rows: data, rows: data }); 
//   }
  // do_search() {
  //   const temp_rows = this.state.original_rows.filter(
  //     (e) => JSON.stringify(e).indexOf(this.state.search) >= 0
  //   );
  //   this.setState({ rows: temp_rows });
  // }

//   download_pdf() {
//     const doc = new jsPDF();

//     const temp_rows = this.state.rows.map((d1) =>
//       this.columns
//         .slice(0, this.columns.length - 1)
//         .map((d2) => d2.selector)
//         .map((d3) => d1[d3])
//     );
//     doc.autoTable({
//       head: [this.columns_data_for_export],
//       body: temp_rows
//     });
//     console.log(this.columns_data_for_export, temp_rows);
//     doc.save("SyneinsList/Username.pdf");
//   }

//   render() {
//     return (
      // <div className={styles.pageContainer}>
      //   <p className={styles.pageHeading}>Document Type List</p>
      //   <div className={styles.pageBox}>
      //     <Row className={styles.marginBottom1}>
      //       <Col md={8}>
      //         <div className={styles.displayFlex}>
      //           <Button variant="primary" className={styles.primaryBtn}>
      //             <CSVLink
      //               data={this.state.rows.map((d1) =>
      //               this.columns
      //                 .slice(0, this.columns.length - 1)
      //                 .map((d2) => d2.selector)
      //                 .map((d3) => d1[d3])
      //             )}
      //               headers={this.columns_data_for_export}
      //               filename={"client_list.csv"}
      //             >
      //               Excel
      //             </CSVLink>
      //           </Button>
      //           <Button
      //             variant="primary"
      //             className={`${styles.marginLeft} ${styles.primaryBtn}`}
      //             onClick={this.download_pdf}
      //           >
      //             Pdf
      //           </Button>
      //         </div>
      //       </Col>
      //     </Row>
      //     <div className={styles.clientContainer_old}>
      //       <div className={styles.tableContainer}>
      //         <DataTable
      //           title="Client List"
      //           columns={this.columns}
      //           data={this.state.rows}
      //           pagination
      //           striped
      //           dense
      //           noHeader
      //         />
      //       </div>
      //     </div>
      //   </div>
      // </div>
//       <div>
//        <MaterialTable
//       title="Simple Action Preview"
//       columns={[
//         { title: 'Name', field: 'name',defaultGroupOrder: 1 },
//         { title: 'Surname', field: 'surname' },
//         { title: 'vdv', field: 'sursdcsdame' },
//         { title: 'gdfd', field: 'surname' },
//         { title: 'gdfgerger', field: 'surname' },
//         { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//         {
//           title: 'Birth Place',
//           field: 'birthCity',
//           lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//         },
//       ]}
//       data={[
//         { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//         { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
//       ]}        
//       actions={[
//         {
//           icon: 'save',
//           tooltip: 'Save User',
//           onClick: (event, rowData) => alert("You saved " + rowData.name)
//         }
//       ]}
//       options={{
//         showTitle:false,
//         grouping: false
//     }}
//     />
//       </div>
//     );
//   }
// }

// const mapToStateProps = (state) => {
//     const {
       
//     } = state.DemoReducer
//     return {
      
//     }
// }
// const mapDispatchToProps = {
//     GetDataForExcelAndPdf:GetDataForExcelAndPdf
// }
// export default connect(mapToStateProps, mapDispatchToProps)(DownloadPdfAndExcel)

import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {datewiseData} from '../../redux/actions/CurrencyReportAction'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PrintOut from './PrintTableCurrency'
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));
export default function PdfAndExcel() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = useSelector((state)=>state.CurrencyReportReducer)
//console.log("1stststst",data.tableListGraph.data)
//console.log("table view",data.currencyTableData)

const handleClick=(val)=>{
  dispatch(datewiseData(val))
}
  return (
  
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Reward Purchase</TableCell>
            <TableCell align="center">Reward Used</TableCell>
          </TableRow>
        </TableHead>
         {data.currencyTableData.map((id)=> (  
        <TableBody>
            <Fragment>
              <TableRow>
                <TableCell
                 rowSpan={id.detail.length+ 1}
                >
               {id.name} 
                </TableCell>
              </TableRow>
               {id.detail.map(data => ( 
                <TableRow>
                  <TableCell onClick={(value)=>handleClick(data.purchaseDate)}>
                    <Link to="/TableLinkCurrency">
                      {data.purchaseDate}
                      </Link>
                      </TableCell>
                  <TableCell align="center">{data.purchaseCount}</TableCell> 
                <TableCell align="center">{data.purchaseUsed}</TableCell>
                </TableRow>
                 ))}    
            </Fragment>
          
        </TableBody>
           ))}   
      </Table>
    </Paper>
    
  );
}
