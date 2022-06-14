import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@mui/materail/styles";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Container} from 'app/constant/Common'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlgin: "center",
  },
  name: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    height: 100,
    width: 100,
  },
  removeBotton: {
    width: "100%",
  },
}));

const ProfileView = (props) => {
  const { userDetails } = props.login;

  const classes = useStyles();
  //const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

 /* function handleClickOpen() {
    setOpen(true);
  }*/

  function handleClose() {
    // setOpen(false);
    props.profileDialogClose();
  }

  function savePass() {
    // setOpen(false);
    props.dialogChangePasswordRequest({
      newPassword: props.login.newPassword,
      confirmPassword: props.login.confirmPassword,
      userId: props.login.sessionLoginId,
    });
  }
  const buttonProgress = {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  };
  const heading = {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  };
  const secondaryHeading = {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  };
  return (
    <Container>
    <Dialog
      fullScreen={fullScreen}
      open={props.user.profileDialog}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth={false}
    >
      <DialogContent>
        <Card className={clsx(classes.root, "")}>
          <CardContent className={classes.content}>
            <Avatar
              className={classes.avatar}
              src={
                userDetails&&
                userDetails.profileImage != ""
                  ? userDetails.profileImage
                  : "/assets/images/custom/avatar.png"
              }
            />
            <Typography className={classes.name} gutterBottom variant="h4">
              { userDetails ?userDetails.name:""}
            </Typography>
            <Table aria-label="customized table">
              <TableBody >
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>{userDetails?userDetails.username:""}</TableCell>
                </TableRow>
                <TableRow selected>
                  <TableCell>EmployeeId</TableCell>
                  <TableCell>{userDetails?userDetails.employeeId:""}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EmailId</TableCell>
                  <TableCell>{userDetails?userDetails.emailId:""}</TableCell>
                </TableRow>
                <TableRow selected>
                  <TableCell>Login Status</TableCell>
                  <TableCell>{userDetails&&userDetails.userId>0?"Enabled" :"Disabled"}</TableCell>
                </TableRow>
               
              </TableBody>
            </Table>
            
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
        className="buttonCloseProfileView"
        onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </Container>
  );
};

export default ProfileView;
