import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Typography,
  Button,
  Hidden,
  IconButton,
  Snackbar,
  Tooltip,
  
} from "@mui/material";
import * as colors from "@mui/material/colors";
import AddPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatIcon from "@mui/icons-material/ChatOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container } from "app/constant/Common";

const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: "relative",
    height: 360,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&:before": {
      position: "absolute",
      content: '" "',
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundImage:
        "linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)",
    },
    "&:hover": {
      "& $changeButton": {
        visibility: "visible",
      },
    },
  },
  changeButton: {
    visibility: "hidden",
    position: "absolute",
    //bottom: theme.spacing(3),
   // right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
   // color: theme.palette.white,
    // [theme.breakpoints.down("md")]: {
    // //  top: theme.spacing(3),
    //   bottom: "auto",
    // },
    "&:hover": {
      backgroundColor: colors.blueGrey[900],
    },
  },
  addPhotoIcon: {
   // marginRight: theme.spacing(1),
  },
  container: {
   // width: theme.breakpoints.values.lg,
    maxWidth: "100%",
   // padding: theme.spacing(2, 3),
    margin: "0 auto",
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column",
    // },
  },
  avatar: {
  //  border: `2px solid ${theme.palette.white}`,
    height: 120,
    width: 120,
    top: -60,
    //left: theme.spacing(3),
    position: "absolute",
  },
  details: {
    marginLeft: 136,
  },
  actions: {
    marginLeft: "auto",
    // [theme.breakpoints.down("sm")]: {
    //  // marginTop: theme.spacing(1),
    // },
    "& > * + *": {
     // marginLeft: theme.spacing(1),
    },
  },
  pendingButton: {
  //  color: theme.palette.white,
    backgroundColor: colors.red[600],
    "&:hover": {
      backgroundColor: colors.red[900],
    },
  },
  personAddIcon: {
  //  marginRight: theme.spacing(1),
  },
  mailIcon: {
   // marginRight: theme.spacing(1),
  },
}));

const ProfileHeader = ({ props }) => {
  const { className, ...rest } = props;
  const userDetails = props.userZamugDatails;
  const classes = useStyles();
  const user = {
    name: "Shen Zhi",
    bio: "Web Developer",
    avatar: "/images/avatars/avatar_11.png",
    cover: "/images/covers/cover_2.jpg",
    connectedStatus: "not_connected",
  };

  const [connectedStatus, setConnectedStatus] = useState(user.connectedStatus); // if rejected do not show the button
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (connectedStatus === "pending") {
      setOpenSnackbar(true);
    }
  }, [connectedStatus]);

  const handleConnectToggle = () => {
    /*setConnectedStatus((connectedStatus) =>
      connectedStatus === "not_connected" ? "pending" : "not_connected"
    );*/
    props.moderatorStatus({
      accountId: props.userZamugDatails.uid ? props.userZamugDatails.uid : props.userZamugDatails.id,
      userId: props.userId,
      mode: "2",
      types: userDetails.id ? 2 : 3,
      remarks: props.remarks,
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  //console.log("Profile Header",props);
  return (
    <Container>
    <div className={clsx(classes.root, className)}>
      <div
        className={classes.cover}
        //style={{ backgroundImage: `url(${user.cover})` }}
        style={{ backgroundImage: `url("/assets/images/bg-3.png")` }}
      >
        {/*<Button className={classes.changeButton} variant="contained">
          <AddPhotoIcon className={classes.addPhotoIcon} />
          Change Cover
        </Button>*/}
      </div>
      <div className={classes.container}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={
            userDetails.profileImage != ""
              ? props.cdnUrl + userDetails.profileImage
              : ""
          }
        />
        <div className={classes.details}>
          <Typography component="h2" gutterBottom variant="overline">
            {userDetails.accountId}
          </Typography>
          <Typography component="h1" variant="h4">
            {userDetails.fullName} - {userDetails.displayName}
          </Typography>
        </div>
        <Hidden smDown>
          <div className={classes.actions}>
            {connectedStatus === "not_connected" && (
              <Button
              className="buttonBlockAccount"
                color="primary"
                onClick={handleConnectToggle}
                variant="contained"
              >
                <PersonAddIcon className={classes.personAddIcon} />
                Block Account
              </Button>
            )}
            {connectedStatus === "pending" && (
              <Button
                className={classes.pendingButton}
                onClick={handleConnectToggle}
                variant="contained"
              >
                <PersonAddIcon className={classes.personAddIcon} />
                Blocked
              </Button>
            )}
            <Tooltip title="More options">
              <IconButton>
                <MoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Hidden>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={6000}
        message={
          <Typography color="inherit" variant="h6">
            Sent connection request
          </Typography>
        }
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </div>
    </Container>
  );
};

export default ProfileHeader;
