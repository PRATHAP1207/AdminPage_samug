import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { Tabs, Tab, Divider } from '@mui/material'
import { Timeline, Connections, Page } from 'app/views/CustomComponent'
import ProfileHeader from './ProfileHeader'
import { withStyles } from '@mui/styles'
import { connect } from 'react-redux'
import { moderatorAction } from 'app/redux/actions/moderatorActions'
import PostList from './PostList'
//import { history } from "app/redux/Store";
import * as colors from '@mui/material/colors'
import { Container } from 'app/constant/Common'
const useStyles = (theme) => ({
    root: {},
    inner: {
        width: theme.breakpoints.values.lg,
        maxWidth: '100%',
        margin: '0 auto',
        padding: theme.spacing(3),
    },
    divider: {
        backgroundColor: colors.grey,
    },
    content: {
        marginTop: theme.spacing(3),
    },
})

class userProfile extends Component {
    componentDidMount() {
        if (this.props.userZamugDatails == '') {
            // history.goBack();
        }
    }
    render() {
        const tabs = [
            { value: 'postlist', label: 'Feeds' },
            //{ value: "connections", label: "Post" },
            //  { value: 'projects', label: 'Projects' },
            //  { value: 'reviews', label: 'Reviews' }
        ]
        const id = 1
        const tab = 'postlist'
        //  var  classes = useStyles();
        const { classes } = this.props
        return (
            <Container>
                <Page className={classes.root} title="Profile">
                    <ProfileHeader props={this.props} />
                    <div className={classes.inner}>
                        <Tabs
                            //onChange={handleTabsChange}
                            scrollButtons="auto"
                            value={tab}
                            variant="scrollable"
                        >
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.value}
                                    label={tab.label}
                                    value={tab.value}
                                />
                            ))}
                        </Tabs>
                        <Divider className={classes.divider} />
                        <div className={classes.content}>
                            {tab === 'postlist' && <PostList {...this.props} />}
                            {
                                //tab === "timeline" && <Timeline />
                            }
                            {
                                //tab === "connections" && <Connections />
                            }
                            {
                                //tab === 'projects' && <Projects />
                            }
                            {
                                //tab === 'reviews' && <Reviews />
                            }
                        </div>
                    </div>
                </Page>
            </Container>
        )
    }
}
const mapToStateProps = (state) => {
    const {
        loader,
        messageError,
        messageSuccess,
        messageWarning,
        moderatorList,
        countryList,
        countryId,
        reportType,
        fromDate,
        toDate,
        dateEnable,
        viewData,
        userZamugDatails,
        userZamugPostList,
        pageSize,
        requestTime,
        baseUrl,
        videoCdnUrl,
        cdnUrl,
    } = state.moderator
    const { userId } = state.login
    return {
        loader,
        messageError,
        messageSuccess,
        messageWarning,
        moderatorList,
        countryList,
        countryId,
        reportType,
        fromDate,
        toDate,
        dateEnable,
        viewData,
        userZamugDatails,
        userZamugPostList,
        pageSize,
        requestTime,
        baseUrl,
        videoCdnUrl,
        cdnUrl,
        userId,
    }
}
const mapDispatchToProps = {
    getModeratorList: moderatorAction.getModeratorList,
    moderatorInputChange: moderatorAction.moderatorInputChange,
    getModeratorReset: moderatorAction.getModeratorReset,
    getCountryList: moderatorAction.getCountryList,
    moderatorRecordView: moderatorAction.moderatorRecordView,
    loadMoreRecord: moderatorAction.loadMoreRecord,
    moderatorStatus: moderatorAction.moderatorStatus,
}
export default connect(
    mapToStateProps,
    mapDispatchToProps
)(withStyles(useStyles)(userProfile))
