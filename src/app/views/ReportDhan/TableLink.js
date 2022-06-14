import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux' ;
import Chart from './Charts'
import {getDateDhanDetails} from '../../redux/actions/DhanReportAction'
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



export default function Print() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dateDhanValue = useSelector((state)=>state.DhanReportReducer)
 // const user = JSON.parse(localStorage.getItem('datewisUserDhan'));
 // console.log("jsonview",user)
 // console.log("jsonview",dateDhanValue.datewiseUserDetails.response.data.details)

 useEffect(() => {
  dispatch(getDateDhanDetails(dateDhanValue));
}, [dispatch]);
   
  return (
      <>
   <h2 style={{alignItems:"center",textAlign:"center"}}> Details of the Dhan based on date</h2>
      <Table style={{margin:"20px", width:"90%" }} width="90%">
        <TableHead>
          <TableRow>
          <TableCell align="left">Country</TableCell>
          <TableCell align="left">Account Id</TableCell>
          <TableCell align="left">User Id</TableCell>
            <TableCell align="left">Contact Number</TableCell>
            <TableCell align="left">Email Id</TableCell>
            <TableCell align="left">Dhan Generated</TableCell>
            <TableCell align="left">Dhan used</TableCell>
            <TableCell align="left">Dhan Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {/* {user.data.map(item => ( */}
            <Fragment>
              {dateDhanValue.datewiseUserDetails.map(detail => (
                 <TableRow>
                   <TableCell>{detail.country}</TableCell>
                  <TableCell>{detail.AccountId}</TableCell>
                  <TableCell>{detail.Id}</TableCell>
                  <TableCell>{detail.contactNo}</TableCell>
                  <TableCell>{detail.emailId}</TableCell> 
                  <TableCell>{detail.dhan}</TableCell>
                  <TableCell>{detail.dhanUsed}</TableCell>
                  <TableCell>{detail.dhanDate}</TableCell>
                 
                </TableRow>
          ))}   
            </Fragment>
        </TableBody>
      </Table>
  </>
  )
}
