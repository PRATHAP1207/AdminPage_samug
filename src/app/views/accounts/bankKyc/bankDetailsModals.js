import React, { useState } from "react";
import clsx from "clsx";
//import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,

  TextareaAutosize,
  Grid,
  Box,
  Icon,
  Typography,
} from  "@mui/material";
import { green } from "@mui/material/colors";
import Label from "app/views/CustomComponent/Label/index";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
   // boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: "100%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  container: {
   // marginTop: theme.spacing(3),
  },
  actions: {
    justifyContent: "flex-end",
  },
  saveButton: {
   // color: theme.palette.white,
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[900],
    },
  },
}));

const BankDetailsModals = (props) => {
  const { className } = props;
  const handleClose = (event) => {
    event.persist();
    props.accountsKycBankPopup({
      data: "",
      status: false,
    });
  };
  const handleStatusApproved = (event) => {
    event.persist();
    props.accountsKycBankApproval({
      data: props,
      remarks: "",
      props: props,
      status: 1,
    });
  };
  const handleStatusRejected = (event) => {
    event.persist();
    props.accountsKycBankReject({
      data: props,
      remarks: props.remarks,
      props: props,
      status: 1,
      mode: 2,
    });
  };

  const handleStatusSubmit = (event) => {
    event.persist();
    props.accountsKycBankApproval({
      data: props,
      remarks: props.remarks,
      props: props,
      status: 2,
      mode: 2,
    });
  };
  const classes = useStyles();
  return (
    <Modal open={props.bankKycPopup}>
      <Card className={clsx(classes.root, className)}>
        <CardHeader title=" Bank Account Details" />
        <Divider />

        <CardContent className={classes.content} style={{ margin: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>{props.popupViewData.fullName}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>AccountId</TableCell>
                <TableCell>{props.popupViewData.accountId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Account No/UPI</TableCell>
                <TableCell>{props.popupViewData.accountNo}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>IFSC Code</TableCell>
                <TableCell>{props.popupViewData.ifscCode}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fund Account</TableCell>
                <TableCell>{props.popupViewData.fundAccountId}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Bank Name</TableCell>
                <TableCell>{props.popupViewData.bankName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Branch Name</TableCell>
                <TableCell>{props.popupViewData.branchName}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Bank Address</TableCell>
                <TableCell>{props.popupViewData.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Center</TableCell>
                <TableCell>{props.popupViewData.center}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>City</TableCell>
                <TableCell>{props.popupViewData.district}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>State</TableCell>
                <TableCell>{props.popupViewData.state}</TableCell>
              </TableRow>
              <TableRow selected>
                <TableCell>Applied Date</TableCell>
                <TableCell>{props.popupViewData.appliedDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        {props.btnStatus ? (
          <>
            <CardActions className={classes.actions}>
              <Button 
              className='bankDetailsApproved'
              onClick={handleStatusApproved} variant="contained">
                Approved
              </Button>
              <Button
              className="bankDetailsRejected"
              onClick={handleStatusRejected} variant="contained">
                Rejected
              </Button>
              <Button
               className="bankDetailsCLose"
              onClick={handleClose} variant="contained">
                Close
              </Button>
            </CardActions>
          </>
        ) : (
          ""
        )}
        {props.remarksStatus ? (
          <>
            <Divider />
            <CardContent className={classes.content} style={{ margin: 2 }}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography gutterBottom variant="h6">
                    Remarks
                  </Typography>
                  <TextareaAutosize
                    id="remarks"
                    label="Remarks"
                    variant="outlined"
                    className="mb-4  w-full"
                    placeholder="Remarks"
                    aria-label="minimum height"
                    rowsMin={3}
                    onChange={(value) => {
                      props.accountInputChange({
                        prop: "remarks",
                        value: value.target.value,
                        error: "remarksError",
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                display="flex"
                justifyContent="flex-end"
                m={1}
                p={1}
                bgcolor="background.paper"
              >
                <div>
                  <Box flexShrink={1}>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      style={{ marginRight: 10 }}
                    >
                      Close
                    </Button>

                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={handleStatusSubmit}
                    >
                      <Icon>send</Icon>
                      <span className="pl-2 capitalize">Submit</span>
                    </Button>
                  </Box>
                </div>
              </Box>
            </CardContent>
          </>
        ) : (
          ""
        )}
      </Card>
    </Modal>
  );
};

export default BankDetailsModals;
