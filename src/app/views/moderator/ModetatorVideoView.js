import React, { useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@mui/styles'
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
    Input,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Toolbar,
} from '@mui/material'
import * as colors from '@mui/material/colors'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Comment from '@mui/icons-material/Comment'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import Money from '@mui/icons-material/Money'

import ReactPlayer from 'react-player'
//import getInitials from "utils/getInitials";
import Label from 'app/views/CustomComponent/Label/index'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { generalFunction } from '../../constant/Common'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import SearchIcon from '@mui/icons-material/Search'
import BlockIcon from '@mui/icons-material/Block'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import ArchiveIcon from '@mui/icons-material/ArchiveOutlined'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOffOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
    },
    header: {
        paddingBottom: 0,
    },
    content: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
        margin: 10,
    },
    description: {
        padding: theme.spacing(2, 3, 1, 3),
    },
    tags: {
        padding: theme.spacing(0, 3, 1, 3),
        '& > * + *': {
            marginLeft: theme.spacing(1),
        },
    },
    learnMoreButton: {
        marginLeft: theme.spacing(2),
    },
    likedButton: {
        color: colors.red[600],
    },
    shareButton: {
        marginLeft: theme.spacing(1),
    },
    details: {
        padding: theme.spacing(1, 3),
    },
}))

const ModetatorVideoView = ({ props, statusMode, handelBlockUser }) => {
    const { project, className, ...rest } = props
    //const statusMode="2"
    const classes = useStyles()
    const moreRef = useRef(null)
    const [openMenu, setOpenMenu] = useState(false)
    const [liked, setLiked] = useState(true)

    const handleLike = () => {
        setLiked(true)
    }
    const handleMenuOpen = () => {
        setOpenMenu(true)
    }
    const handleMenuBlock = () => {
        setOpenMenu(false)
        handelBlockUser({
            accountId: props.uid ? props.uid : props.id,
            userId: props.userId,
            mode: '2',
            types: props.id ? 2 : 3,
            remarks: props.remarks,
        })
    }
    const handleMenuClose = () => {
        setOpenMenu(false)
    }
    const handleUnlike = () => {
        setLiked(false)
    }
    // console.log(props)
    const doc = generalFunction.convertJsonParse(props.doc) //JSON.parse(props.doc);
    var videoUrls = props.cdnUrl + doc.postfiles[0]
    if (doc.transcodeUid != '') {
        videoUrls = props.videoCdnUrl + doc.transcodeUid + '/playlist.m3u8'
    }
  //  console.log('videoUrls', generalFunction.generateBunnyToken("/3af6b770-67db-43b0-92b8-c44289340d96/playlist.m3u8"))
    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Author"
                        src={
                            props.profileImage
                                ? props.cdnUrl + props.profileImage
                                : './assets/custom/avatar.png'
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
                    statusMode == 2 ? (
                        <>
                            <Tooltip title="More options">
                                <IconButton
                                    onClick={handleMenuOpen}
                                    ref={moreRef}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={moreRef.current}
                                keepMounted
                                onClose={handleMenuClose}
                                open={openMenu}
                            >
                                <MenuItem onClick={handleMenuBlock}>
                                    <ListItemIcon>
                                        <BlockIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Block user" />
                                </MenuItem>
                                {/*<MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete conversation" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <ArchiveIcon />
                  </ListItemIcon>
                  <ListItemText primary="Archive conversation" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <NotificationsOffIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mute notifications" />
                </MenuItem>*/}
                            </Menu>
                        </>
                    ) : (
                        ''
                    )
                }
            />
            <CardContent className={classes.content}>
                <div className={classes.description}>
                    <ReactPlayer
                        //ref={this.ref}
                        pip={true}
                        controls={true}
                        width="100%"
                        url={videoUrls}
                        light={true}
                    />
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
                                <IconButton
                                    className={classes.shareButton}
                                    size="small"
                                >
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
                                <IconButton
                                    className={classes.shareButton}
                                    size="small"
                                >
                                    <ShareIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
        </Card>
    )
}

export default ModetatorVideoView
