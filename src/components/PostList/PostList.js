import React from "react";
import PostCard from "../PostCard/PostCard";

const PostList = props => (
    <div>
        {props.posts.map((post, index) => (
            <PostCard post={post.attributes} key={index} />
        ))}
    </div>
);

export default PostList;
