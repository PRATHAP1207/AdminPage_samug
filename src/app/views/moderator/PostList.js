import React, { Component } from 'react'
import ModetatorVideoView from './ModetatorVideoView'
import ModetatorImageView from './ModetatorImageView'
import ModetatorTextView from './ModetatorTextView'
import { Button, Box } from '@mui/material'
import { Container } from 'app/constant/Common'

class PostList extends Component {
    constructor(props, context) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        e.preventDefault()
        // console.log('dsf',this.props.userZamugPostList.length)
        this.props.loadMoreRecord({
            rowData: this.props.viewData.rowData,
            pageSize: this.props.userZamugPostList.length, //this.props.pageSize,
            requestTime: this.props.requestTime,
        })
    }
    render() {
        return (
            <Container>
                <div>
                    {this.props.userZamugPostList.map((item, index) => {
                        let datas = JSON.parse(item.doc)
                        var avc = {
                            videoCdnUrl: this.props.videoCdnUrl,
                            cdnUrl: this.props.cdnUrl,
                        }
                        if (datas.postType == 1) {
                            return (
                                <ModetatorImageView
                                    key={index}
                                    props={{ ...item, ...avc }}
                                    statusMode="1"
                                />
                            )
                        }
                        if (datas.postType == 2) {
                            return (
                                <ModetatorVideoView
                                    key={index}
                                    props={{ ...item, ...avc }}
                                    statusMode="1"
                                />
                            )
                        }
                        if (datas.postType == 3) {
                            return (
                                <ModetatorTextView
                                    key={index}
                                    props={{ ...item, ...avc }}
                                    statusMode="1"
                                />
                            )
                        }
                    })}

                    <Box
                        display="flex"
                        justifyContent="center"
                        m={1}
                        p={1}
                        bgcolor="background.paper"
                    >
                        <Button
                        className="buttonPostListReadMore"
                            variant="contained"
                            color="primary"
                            style={{ textAlign: 'center', alignItem: 'center' }}
                            onClick={this.handleClick}
                        >
                            <i className="zmdi zmdi-search zmdi-hc-fw" />
                            <span>Load More</span>
                        </Button>
                    </Box>
                </div>
            </Container>
        )
    }
}

export default PostList
/*const PostList = (props) => {
  console.log(props);
  const { baseUrl, userZamugDatails, userZamugPostList } = props;
  //<ModetatorImageView {...val}/>
  {
    userZamugPostList.forEach((val, i) => {
      console.log(val);

      if (val.doc.postType == 1) {
        return <div> "dfgdgdf"</div>;
      }
      if (val.doc.postType == 2) {
        return <div> "dfgdgdf"</div>;
      }
      if (val.doc.postType == 3) {
        return <div> "dfgdgdf"</div>;
      }
    });
  }
};
export default PostList;*/
