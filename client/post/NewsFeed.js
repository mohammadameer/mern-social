import React, { useState, useEffect } from "react";
import { Card, Typography, Divider } from "@material-ui/core";
import auth from "../auth/auth-helper";
import { listNewsFeed } from "./api-post";
import NewPost from "./NewPost";
import PostList from "./PostList";

const NewsFedd = () => {
  const [state, setState] = useState({
    posts: []
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const jwt = auth.isAuthenticated();

  const addPost = post => {
    const updatedPosts = state.posts;
    updatedPosts.unshift(post);
    setState({ ...state, posts: updatedPosts });
  };

  const removePost = post => {
    const updatedPosts = state.posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setState({ ...state, posts: updatedPosts });
  };

  const loadPosts = () => {
    listNewsFeed(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) return console.log(data.error);
      setState({ ...state, posts: data });
      console.log(data);
    });
  };

  return (
    <Card>
      <Typography type="title">News Feed</Typography>
      <Divider />
      <NewPost addUpdate={addPost} />
      <Divider />
      <PostList removeUpdate={removePost} posts={state.posts} />
    </Card>
  );
};

export default NewsFedd;
