import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {getTableList} from '../../redux/actions/SubscriptionAction'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PrintOut from './PrintOut'
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
export default function DownloadPdfAndExcel() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const data = useSelector((state)=>state.usertree)
//console.log("1stststst",data.tableListGraph.data)
//console.log("table view",data.tableListGraph.map((id)=>id.countryName))

  
  return (
  
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="center">Year/Month/Date</TableCell>
            <TableCell align="center">New Subscription</TableCell>
            <TableCell align="center">Renewal</TableCell>
            {/* <TableCell align="center">Date/month</TableCell> */}
            {/* <TableCell align="center">Month</TableCell> */}
          </TableRow>
        </TableHead>
        {data.tableListGraph.map((id)=> ( 
        <TableBody>
          {/* {sample.map(item => ( */}
            <Fragment>
              <TableRow>
                <TableCell rowSpan={id.detail.length+ 1}
                >
               {id.countryName} 
                </TableCell>
              </TableRow>
               {id.detail.map(data => ( 
                <TableRow>
                  <TableCell align="center">{data.subscribeDate}</TableCell>
                  <TableCell align="center">{data.newSubscription}</TableCell>
                  <TableCell align="center">{data.renewal}</TableCell>
                  {/* <TableCell align="center">{data.subscribeDate}</TableCell> */}
                  {/* <TableCell align="center">{data.monthName}</TableCell> */}
                  
                </TableRow>
                ))}   
            </Fragment>
          
        </TableBody>
           ))}   
      </Table>
    </Paper>
    
  );
}
