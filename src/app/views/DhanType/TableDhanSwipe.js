import React from 'react'
import { makeStyles } from "@mui/styles";
import { Fragment } from 'react';
import {Table} from '@mui/material'
import {TableBody} from '@mui/material'
import {TableCell} from '@mui/material'
import {TableHead} from '@mui/material'
import {TableRow} from '@mui/material'
import {Paper} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendDateToAction } from '../../redux/actions/DhanReportAction'

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

export default function TableDhanSwipe() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reducerInput = useSelector((state) => state.DhanTypeReducer)
 // console.log("view typedhan", reducerInput.dhanSwipeTableData)
 // const user = JSON.parse(localStorage.getItem('DhanType'));
  //console.log("view typedhan", user.details.map((id)=>id.country))

  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow >
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Long Press</TableCell>
              <TableCell align="center">Menu Button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Fragment>
              {reducerInput.dhanSwipeTableData.map(detail => (
                <TableRow >
               
                  <TableCell align="center">{detail.country}</TableCell>
                  <TableCell align="center">{detail.Longpress}</TableCell>
                  <TableCell align="center">{detail.menuButton}</TableCell>
                </TableRow>
              ))}
            </Fragment>
          </TableBody>
        </Table>
      </Paper>
    </>
  )


}