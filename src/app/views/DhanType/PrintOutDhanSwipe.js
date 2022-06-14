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
import {sendDateToAction} from '../../redux/actions/DhanTypeAction'

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
  
export default function PrintOutDhanSwipe(){
    const classes = useStyles();
    const dispatch=useDispatch();
    const reducerInput = useSelector((state)=>state.DhanTypeAction)
   // console.log("tableviewdata",reducerInput)
  //  console.log("api",reducerInput.tableDhan.map((id)=>id.detail.map((id)=>id.country)))
    
//  var index;
//   const  data = reducerInput.tableDhan.details.map((item)=>item.country == 'India' && (
//               index = index + item.dhanGenerated
//     ))
//   return index;
const handleClick=(val)=>{
 // console.log("valllllll",val)
//   dispatch(sendDateToAction(val));
}

return (
    <>
     <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Long Press</TableCell>
            <TableCell align="left">Menu Button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {reducerInput.tableDhan.map(item => ( */}
            <Fragment>
              <TableRow>
                <TableCell
                //  rowSpan={item.detail.length + 1}
                 >
                  {/* {item.name} */}
                </TableCell>
              </TableRow>
              {/* {item.detail.map(detail => ( */}
                <TableRow>
                {/* <TableCell >{detail.dhanDate}</TableCell>
                  <TableCell>{detail.dhanGenerated}</TableCell>
                  <TableCell>{detail.dhanUsed}</TableCell> */}
                </TableRow>
              {/* ))} */}
            </Fragment>
          {/* ))} */}
        </TableBody>
      </Table>
    </Paper>
    </>
)


}