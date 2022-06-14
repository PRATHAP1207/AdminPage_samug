import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import { useSelector } from "react-redux";
import {Paper} from '@mui/material'
import DownloadPdfAndExcel from "./DownloadPdfAndExcel";
import Chart2Comparision from "./Chart2Comparision";
import PrintChartComparison from "./PrintChartComparison";
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

// const sample = [
//   { name: "apple", detail: ["a", "b", "c", "d"]},
//   { name: "banana", detail: ["a", "b"] }
// ];



export default function PrintOut() {
  const classes = useStyles();
  const tableData = useSelector((state)=>state.usertree)
 // console.log("rtabledata",tableData)
  const user = JSON.parse(localStorage.getItem('storageTableListData'));
  //const userId = JSON.parse(localStorage.getItem('userId'));
  //console.log("localkllllll",userId)
  return (
      <>
    <h2 style={{alignItems:"center",textAlign:"center"}}> Details of the Subscription based on Country</h2>
      <Table style={{margin:"30px", width:"50%" }} width="50%">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="left">Year/Month/Date</TableCell>
            <TableCell align="left">New Subscription</TableCell>
            <TableCell align="left">Renewal</TableCell>
          </TableRow>
        </TableHead>
        {user.data.data.map((id)=> (
        <TableBody>
       
        {/* {tableData.tableListGraph.map((id)=> ( */}
      
            <Fragment>
              <TableRow>
                <TableCell
                  rowSpan={id.detail.length + 1}
                >
                 { id.countryName}
                 {/* {id.name} */}
                </TableCell>
              </TableRow>
              {id.detail.map(detail => (
                <TableRow>
                  <TableCell align="center">{detail.subscribeDate}</TableCell>
                  <TableCell align="center">{detail.newSubscription}</TableCell>
                  <TableCell align="center">{detail.renewal}</TableCell>
                 
                </TableRow>
               ))} 
              
              
            </Fragment>
          
        </TableBody>
         ))}
      </Table> 
      <PrintChartComparison/>
  </>
  )
}
