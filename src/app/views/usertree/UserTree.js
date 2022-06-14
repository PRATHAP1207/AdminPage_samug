import React, { useState } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import { useDispatch, useSelector } from 'react-redux'
import {
    getSearchRoleForTree,
    getDetailsOfMember,
    getDetailsFromParent,
} from '../../redux/actions/UserTreeAction'
import { Container } from '../../constant/Common'
import ReactTooltip from 'react-tooltip'
import { searchListForTree, defaultListView } from '../../constant/Common'
import {
    FormLabel,
    Grid,
    Button,
    Box,
    Card,
    CircularProgress,
    CardHeader,
    TextField,
} from '@mui/material'
import { Breadcrumb } from 'app/components'
import Select from 'react-select'
import { getGrandChild } from '../../redux/actions/UserTreeAction'
import Avatar from 'react-avatar'
export default function UserTree() {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.login)
    const Details = useSelector((state) => state.usertree)
    //console.log("memberdetails",Details);
    // const [ShowGrandChild, setShowGrandChild] = useState('false')

    const handleGrandChild = () => {
        //console.log("fvdfvdfvdfvdvvdv");
        dispatch(getGrandChild())
    }
    const handleSearchEvent = () => {
        //console.log('handling the search event')
        dispatch(getDetailsOfMember({Details:Details,loginToken:userLogin}));

    }

    const handleMemberEvent = (event) => {
        // console.log("sssdsvsvsvsv",event);
        dispatch(getDetailsFromParent({event:event,loginToken:userLogin}))
    }
    // console.log(
    //     'this is the link',
    //     Details.cdnURL + Details.parent.profileImage
    // )
    return (
        <>
            <Container>
                {Details.loader && (
                    <div className="loader-view  loader">
                        <CircularProgress size={54} />
                    </div>
                )}
                <div className="breadcrumb">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Home', path: '/' },
                            {
                                name: 'Member Details',
                            },
                        ]}
                    />
                </div>
                <Card style={{ margin: 10 }}>
                    <CardHeader></CardHeader>

                    
                    <Grid container spacing={3} style={{ margin: 5 }}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 0 }}>
                            <FormLabel>
                               Types
                            </FormLabel>
                            <Select
                                className="mb-4 w-full "
                                maxMenuHeight={100}
                                options={searchListForTree}
                                value={searchListForTree.filter((val) => {
                                    return val.value == Details.searchRoleInTree
                                })}
                                onChange={(value) => {
                                    dispatch(
                                        getSearchRoleForTree({
                                            prop: 'searchRoleInTree',
                                            value: value.value,
                                            error: '',
                                        })
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                required
                                InputLabelProps={{ shrink: true }}
                                id="Search"
                                label="Search"
                                variant="outlined"
                                // className="mb-4  w-full"
                                style={{
                                    marginBottom: '20px',
                                    width: '80%',
                                    marginTop: '10px',
                                }}
                                placeholder="Search"
                                value={Details.searchdetails}
                                onChange={(value) =>
                                    dispatch(
                                        getSearchRoleForTree({
                                            prop: 'searchdetails',
                                            value: value.target.value,
                                            error: 'searchError',
                                        })
                                    )
                                }
                            />
                        </Grid>

                        <Box
                            display="flex"
                            justifyContent="flex-center"
                            m={1}
                            p={1}
                            bgcolor="background.paper"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearchEvent}
                                style={{
                                    marginLeft: '15px',
                                    marginTop: '20px',
                                }}
                            >
                                <i className="zmdi zmdi-search zmdi-hc-fw" />
                                <span>Search</span>
                            </Button>
                        </Box>
                    </Grid>
                </Card>
                {Details.ShowCardForTree == true && (
                    <Card style={{ margin: 10, padding: '20px' }}>
                        <Tree
                            lineWidth={'3px'}
                            lineColor={'green'}
                            lineBorderRadius={'10px'}
                            label={
                                <>
                                    <a data-tip data-for="parent">
                                        <Avatar
                                            size="50"
                                            src={
                                                Details.cdnURL +
                                                Details.parent.profileImage
                                            }
                                            name={Details.parent.fullName}
                                            round="50%"
                                            maxInitials="2"
                                            onClick={() =>
                                                handleMemberEvent(
                                                    Details.parent
                                                )
                                            }
                                        />
                                    </a>
                                    <ReactTooltip
                                        id="parent"
                                        aria-haspopup="true"
                                        role="example"
                                        backgroundColor="linear-gradient(#e66465, #9198e5);"
                                        effect="float"
                                        style={{
                                            transform: 'translateY(10px)',
                                        }}
                                        place="top"
                                    >
                                        <div
                                            style={{
                                                color: 'black',
                                                fontWeight: 'bolder',
                                                fontFamily: 'fantasy',
                                            }}
                                        >
                                            {Details.parent.accountId}
                                        </div>
                                        <table>
                                            {defaultListView.map((view) => (
                                                <tr>
                                                    <td
                                                        style={{
                                                            float: 'left',
                                                            color: 'black',
                                                        }}
                                                    >
                                                        {view.label}
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: '10px',
                                                            color: 'black',
                                                        }}
                                                    >
                                                        {' '}
                                                        -{' '}
                                                    </td>
                                                    {view.value == '1' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .invitationCode
                                                            }
                                                        </td>
                                                    )}
                                                    {view.value == '2' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .emailId
                                                            }
                                                        </td>
                                                    )}
                                                    {view.value == '3' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .contactNo
                                                            }
                                                        </td>
                                                    )}
                                                    {view.value == '4' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .lastSubscribeDate
                                                            }
                                                        </td>
                                                    )}
                                                    {view.value == '5' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .balanceShareAmount
                                                            }
                                                        </td>
                                                    )}
                                                    {view.value == '6' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .dhanBalance
                                                            }
                                                        </td>
                                                    )}
                                                    {view.value == '7' && (
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            {
                                                                Details.parent
                                                                    .dhanDate
                                                            }
                                                        </td>
                                                    )}
                                                    {/* {view.value == "8" && <td style={{float:"left",paddingLeft:"10px",color:"black"}}> {Details.parent.invitationCode}</td>} */}
                                                </tr>
                                            ))}
                                        </table>
                                    </ReactTooltip>

                                    <p>
                                        <span style={{ fontWeight: 'bolder' }}>
                                            Parent
                                        </span>
                                        -{Details.parent.fullName}
                                        <div> ({Details.parent.id})</div>
                                    </p>
                                </>
                            }
                        >
                            <TreeNode
                                label={
                                    <>
                                        <a data-tip data-for="member">
                                            <Avatar
                                                size="50"
                                                src={
                                                    Details.cdnURL +
                                                    Details.child.profileImage
                                                }
                                                name={Details.child.fullName}
                                                round="50%"
                                                maxInitials="2"
                                                onClick={() =>
                                                    handleGrandChild()
                                                }
                                            />
                                        </a>
                                        <ReactTooltip
                                            id="member"
                                            aria-haspopup="true"
                                            role="example"
                                            backgroundColor="linear-gradient(#e66465, #9198e5);"
                                            effect="float"
                                            style={{
                                                transform: 'translateY(10px)',
                                            }}
                                            place="top"
                                        >
                                            <div
                                                style={{
                                                    color: 'black',
                                                    fontWeight: 'bolder',
                                                    fontFamily: 'fantasy',
                                                }}
                                            >
                                                {Details.child.accountId}
                                            </div>
                                            <table>
                                                {defaultListView.map((view) => (
                                                    <tr>
                                                        <td
                                                            style={{
                                                                float: 'left',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {view.label}
                                                        </td>
                                                        <td
                                                            style={{
                                                                paddingLeft:
                                                                    '10px',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {' '}
                                                            -{' '}
                                                        </td>
                                                        {view.value == '1' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .invitationCode
                                                                }
                                                            </td>
                                                        )}
                                                        {view.value == '2' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .emailId
                                                                }
                                                            </td>
                                                        )}
                                                        {view.value == '3' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .contactNo
                                                                }
                                                            </td>
                                                        )}
                                                        {view.value == '4' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .lastSubscribeDate
                                                                }
                                                            </td>
                                                        )}
                                                        {view.value == '5' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .balanceShareAmount
                                                                }
                                                            </td>
                                                        )}
                                                        {view.value == '6' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .dhanBalance
                                                                }
                                                            </td>
                                                        )}
                                                        {view.value == '7' && (
                                                            <td
                                                                style={{
                                                                    float: 'left',
                                                                    paddingLeft:
                                                                        '10px',
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                {' '}
                                                                {
                                                                    Details
                                                                        .child
                                                                        .dhanDate
                                                                }
                                                            </td>
                                                        )}
                                                        {/* {view.value == "8" && <td style={{float:"left",paddingLeft:"10px",color:"black"}}> {Details.child.invitationCode}</td>} */}
                                                    </tr>
                                                ))}
                                            </table>
                                        </ReactTooltip>
                                        {/* </Tooltip> */}
                                        <p>
                                            <span
                                                style={{ fontWeight: 'bolder' }}
                                            >
                                                Member
                                            </span>
                                            -{Details.child.fullName}
                                            <div>({Details.child.id})</div>
                                        </p>
                                    </>
                                }
                            >
                                {Details.childrens.map((item) => (
                                    <TreeNode
                                        label={
                                            <>
                                                <a
                                                    data-tip
                                                    data-for={item.fullName}
                                                >
                                                    <Avatar
                                                        size="50"
                                                        src={
                                                            Details.cdnURL +
                                                            item.profileImage
                                                        }
                                                        name={item.fullName}
                                                        round="50%"
                                                        maxInitials="2"
                                                        onClick={() =>
                                                            handleMemberEvent(
                                                                item
                                                            )
                                                        }
                                                    />
                                                </a>
                                                <ReactTooltip
                                                    id={item.fullName}
                                                    aria-haspopup="true"
                                                    role="example"
                                                    backgroundColor="linear-gradient(#e66465, #9198e5);"
                                                    effect="float"
                                                    style={{
                                                        transform:
                                                            'translateY(10px)',
                                                    }}
                                                    place="top"
                                                >
                                                    <div
                                                        style={{
                                                            color: 'black',
                                                            fontWeight:
                                                                'bolder',
                                                            fontFamily:
                                                                'fantasy',
                                                        }}
                                                    >
                                                        {item.accountId}
                                                    </div>
                                                    <table>
                                                        {defaultListView.map(
                                                            (view) => (
                                                                <tr>
                                                                    <td
                                                                        style={{
                                                                            float: 'left',
                                                                            color: 'black',
                                                                        }}
                                                                    >
                                                                        {
                                                                            view.label
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            paddingLeft:
                                                                                '10px',
                                                                            color: 'black',
                                                                        }}
                                                                    >
                                                                        {' '}
                                                                        -{' '}
                                                                    </td>
                                                                    {view.value ==
                                                                        '1' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.invitationCode
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {view.value ==
                                                                        '2' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.emailId
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {view.value ==
                                                                        '3' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.contactNo
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {view.value ==
                                                                        '4' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.lastSubscribeDate
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {view.value ==
                                                                        '5' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.balanceShareAmount
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {view.value ==
                                                                        '6' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.dhanBalance
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {view.value ==
                                                                        '7' && (
                                                                        <td
                                                                            style={{
                                                                                float: 'left',
                                                                                paddingLeft:
                                                                                    '10px',
                                                                                color: 'black',
                                                                            }}
                                                                        >
                                                                            {' '}
                                                                            {
                                                                                item.dhanDate
                                                                            }
                                                                        </td>
                                                                    )}
                                                                    {/* {view.value == "8" && <td style={{float:"left",paddingLeft:"10px",color:"black"}}> {Details.child.invitationCode}</td>} */}
                                                                </tr>
                                                            )
                                                        )}
                                                    </table>
                                                </ReactTooltip>
                                                <p>
                                                    {item.fullName}
                                                    <div>({item.id})</div>
                                                </p>
                                            </>
                                        }
                                    />
                                ))}
                            </TreeNode>
                        </Tree>
                    </Card>
                )}
            </Container>
        </>
    )
}
