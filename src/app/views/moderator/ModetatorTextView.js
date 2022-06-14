import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,

} from "@mui/material";
import {red} from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Comment from "@mui/icons-material/Comment";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import Money from "@mui/icons-material/Money";
//import getInitials from "utils/getInitials";
import Label from "app/views/CustomComponent/Label/index";
import  MoreVertIcon  from "@mui/icons-material/MoreVert";
import { generalFunction } from '../../constant/Common';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
  },
  header: {
    paddingBottom: 0,
  },
  content: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
    margin: 10,
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3),
  },
  tags: {
    padding: theme.spacing(0, 3, 1, 3),
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  learnMoreButton: {
    marginLeft: theme.spacing(2),
  },
  likedButton: {
    color: red,
  },
  shareButton: {
    marginLeft: theme.spacing(1),
  },
  details: {
    padding: theme.spacing(1, 3),
  },
}));

const ModetatorTextView = ({props, statusMode}) => {
  const { project, className, ...rest } = props;
  const classes = useStyles();

  const [liked, setLiked] = useState(true);

  const handleLike = () => {
    setLiked(true);
  };

  const handleUnlike = () => {
    setLiked(false);
  };
  const doc = generalFunction.convertJsonParse(props.doc);//JSON.parse(props.doc);
  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <Avatar
            alt="Author"
            src={
              props.profileImage
                ? props.baseUrl + props.profileImage
                : "./assets/custom/avatar.png"
            }
          >
            {props.displayName}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <Typography variant="body2">
            by
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/profile/1/timeline"
              variant="h6"
            >
              {props.fullName}
            </Link>
            | Updated: {moment(doc.postTimestamp).fromNow()}
          </Typography>
        }
        title={
          <Link
            color="textPrimary"
            // component={RouterLink}
            // to="/projects/1/overview"
            variant="h5"
          >
            {props.displayName}
          </Link>
        }
        action={
          statusMode == 1 ? (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          ) : (
            ""
          )
        }
      />

      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography colo="textSecondary" variant="subtitle2">
            {doc.postDetails}
          </Typography>
        </div>

        {/*<div className={classes.tags}>
        {project.tags.map((tag) => (
          <Label color={tag.color} key={tag.text}>
            {tag.text}
          </Label>
        ))}
      </div>*/}
        <Divider />
        <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Tooltip title="like">
                <IconButton
                  className={classes.likedButton}
                  onClick={handleUnlike}
                  size="small"
                >
                  <FavoriteIcon />
                  {doc.postLikes}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="share">
                <IconButton className={classes.shareButton} size="small">
                  <ShareIcon />
                  {doc.shareCount}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="comment">
                <IconButton
                  className={classes.shareButton}
                  //  onClick={handleUnlike}
                  size="small"
                >
                  <Comment />
                  {doc.postCommentsCount}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="dhan">
                <IconButton
                  className={classes.shareButton}
                  // onClick={handleUnlike}
                  size="small"
                >
                  <AccountBalanceWallet />
                  {doc.postDhanCount}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="reward">
                <IconButton
                  className={classes.shareButton}
                  // onClick={handleUnlike}
                  size="small"
                >
                  <Money />
                  {doc.postRewards}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Share">
                <IconButton className={classes.shareButton} size="small">
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModetatorTextView;
