import React from 'react'
import { makeStyles } from "@mui/styles";
 import { Fragment } from 'react';
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {sendDateToAction} from '../../redux/actions/UserDetailsReportAction'

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
  
export default function PrintTableUserLogin(){
    const classes = useStyles();
    const dispatch=useDispatch();
    // const reducerInput = useSelector((state)=>state.UserDetailsReportReducer)
    
    const reducerInput = JSON.parse(localStorage.getItem('UserSamugLoginDetails'));
 // console.log("reduuuuu",reducerInput)
const handleClick=(val)=>{
  //console.log("valllllll",val)
//   dispatch(sendDateToAction(val));
}

return (
    <>
     <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="left">AccountId</TableCell>
            <TableCell align="left">Start Time</TableCell>
            <TableCell align="left">End Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reducerInput.map(item => (
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
                <TableCell >{detail.accountId}</TableCell>
                <TableCell>{detail.startTime == 0 ? '0000:0000' : new Date(parseInt(detail.startTime)*1000).toLocaleString()}</TableCell>
                  <TableCell>{detail.endTime == 0 ? '0000:0000' : new Date(parseInt(detail.endTime)*1000).toLocaleString()}</TableCell>
                </TableRow>
               ))} 
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </>
)


}