import React from 'react';
import BlogContainer from '../../containers/BlogContainer/BlogContainer';
export default class BlogScreen extends React.Component {
    render() {
        return (
        <div className="posts">
            <BlogContainer {...this.props} />
        </div>
        )
    }
}
