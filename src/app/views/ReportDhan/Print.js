import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {useSelector} from 'react-redux' ;
import PrintDhanGen from './PrintDhanGen'
//import ChartsComparision from "./ChartsComparision";
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



export default function Print() {
  const classes = useStyles();
  const dataDhanValue = useSelector((state)=>state.DhanReportReducer)
  const user = JSON.parse(localStorage.getItem('dhanTableListData'));
 // console.log("jsonview",user)
  return (
      <>
   <h2 style={{alignItems:"center",textAlign:"center"}}> Details of the Dhan based on Country</h2>
      <Table style={{margin:"30px", width:"50%" }} width="50%">
        <TableHead>
          <TableRow>
          <TableCell>country</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Dhan Generation</TableCell>
            <TableCell align="left">Dhan used</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {user.data.map(item => (
            <Fragment>
              <TableRow>
                <TableCell rowSpan={item.detail.length + 1}>
                  {item.name}
                </TableCell>
              </TableRow>
              {item.detail.map(detail => (
                <TableRow>
                  <TableCell>{detail.dhanDate}</TableCell>
                  <TableCell>{detail.dhanGenerated}</TableCell>
                  <TableCell>{detail.dhanUsed}</TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
  <PrintDhanGen/>
  </>
  )
}