import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux' ;
import {getDateCurrencyDetails} from '../../redux/actions/CurrencyReportAction'
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



export default function Print() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dateDhanValue = useSelector((state)=>state.CurrencyReportReducer)
 //  const user = JSON.parse(localStorage.getItem('currencyDatewiseData'));
   console.log("json",dateDhanValue.dateWiseData);
  
 useEffect(() => {
  dispatch(getDateCurrencyDetails(dateDhanValue));
}, [dispatch]);
   
  return (
      <>
   <h2 style={{alignItems:"center",textAlign:"center"}}> Details of the Reward based on date</h2>
      <Table style={{margin:"20px", width:"90%" }} width="90%">
        <TableHead>
          <TableRow>
          <TableCell align="left">Country</TableCell>
          <TableCell align="left">Account Id</TableCell>
          <TableCell align="left">User Id</TableCell>
            <TableCell align="left">Contact Number</TableCell>
            <TableCell align="left">Email Id</TableCell>
            <TableCell align="left">Reward Purchase</TableCell>
            <TableCell align="left">Reward used</TableCell>
            <TableCell align="left">Reward Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <Fragment>
          {dateDhanValue.dateWiseData.map(detail => (
                 <TableRow>
                   <TableCell>{detail.country}</TableCell>
                  <TableCell>{detail.AccountId}</TableCell>
                  <TableCell>{detail.Id}</TableCell>
                  <TableCell>{detail.contactNo}</TableCell>
                  <TableCell>{detail.emailId}</TableCell> 
                  <TableCell>{detail.purchase}</TableCell>
                  <TableCell>{detail.purchaseUsed}</TableCell>
                  <TableCell>{detail.purchaseDate}</TableCell>
                </TableRow>
          ))}  
            </Fragment>
        </TableBody>
      </Table>
  </>
  )
}
