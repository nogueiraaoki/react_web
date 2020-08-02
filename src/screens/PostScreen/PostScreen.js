import React from "react";
import { withRouter } from "react-router-dom";
import Post from "../../components/Post/Post";

class PostScreen extends React.Component {
    render() {
        const { post } = this.props.location.state;
        return <Post post={post} show={true} pageChange={this.props.pageChange} />;
    }
}
export default withRouter(PostScreen);
