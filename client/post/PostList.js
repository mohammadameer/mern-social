import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";

const PostList = props => {
  return (
    <div style={{ marginTop: 24 }}>
      {props.posts.map((post, index) => (
        <Post post={post} key={index} onRemove={props.removeUpdate} />
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;
