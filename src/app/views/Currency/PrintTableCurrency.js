import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {useSelector} from 'react-redux' ;
import PrintGraph from "./PrintGraph";
import PrintGraph2Data from "./PrintGraph2Data";
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



export default function PrintTableCurrency() {
  const classes = useStyles();
  const currencyData = useSelector((state)=>state.DhanReportReducer)
   const user = JSON.parse(localStorage.getItem('currencyDetails'));
  // console.log("ussssssss",user)
 
  return (
      <>
   <h2 style={{alignItems:"center",textAlign:"center"}}> Details of the Dhan based on Country</h2>
      <Table style={{margin:"30px", width:"50%" }} width="50%">
        <TableHead>
          <TableRow>
          <TableCell>Country</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Reward Purchase</TableCell>
            <TableCell align="center">Reward Used</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {user.data.map(item => (
            <Fragment>
              <TableRow>
                <TableCell 
                rowSpan={item.detail.length + 1}
                >
                  {item.name}
                </TableCell>
              </TableRow>
              {item.detail.map(detail => (
                <TableRow>
                  <TableCell align="center">{detail.purchaseDate}</TableCell>
                  <TableCell align="center">{detail.purchaseCount}</TableCell>
                  <TableCell align="center">{detail.purchaseUsed}</TableCell>
                </TableRow>
             ))} 
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <PrintGraph/>
  </>
  )
}
