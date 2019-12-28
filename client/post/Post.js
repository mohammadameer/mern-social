import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  withStyles
} from "@material-ui/core";
import Comments from "./Comments";
import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import { Delete, Favorite, FavoriteBorder } from "@material-ui/icons";
import { remove, like, unlike } from "./api-post";
import CommentIcon from "@material-ui/icons/Comment";

const Post = props => {
  const checkLike = likes => {
    let match = likes && likes.indexOf(jwt.user._id) !== -1;
    return match;
  };

  const [state, setState] = useState({
    like: checkLike(props.post.likes),
    likes: props.post.likes && props.post.likes.length,
    comments: props.post.comments && props.post.comments
  });

  // useEffect(() => {
  //   setState(
  //     {
  //       ...state,
  //       like: checkLike(props.post.likes),
  //       likes: props.post.likes && props.post.likes.length,
  //       comments: props.post.comments && props.post.comments
  //     },
  //     [props.post]
  //   );
  // });

  const like = () => {
    let callApi = state.like ? unlike : like;
    callApi(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      props.post._id
    ).then(data => {
      if (data.error) console.error(data.error);
      else setState({ ...state, like: !state.like, likes: data.likes.length });
    });
  };

  const jwt = auth.isAuthenticated();

  const deletePost = () => {
    remove(
      {
        postId: props.post._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) console.error(data.error);
      else props.onRemove(props.post);
    });
  };

  const updateComments = comments => {
    setState({ ...state, comments });
  };

  const { classes } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={"/api/users/photo/" + props.post.postedBy._id} />}
        action={
          props.post.postedBy._id == auth.isAuthenticated().user._id && (
            <IconButton onClick={deletePost}>
              <Delete />
            </IconButton>
          )
        }
        title={
          <Link to={"/user/" + props.post.postedBy._d}>
            {props.post.postedBy.name}
          </Link>
        }
        subheader={new Date(props.post.created).toDateString()}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {props.post.text}
        </Typography>
        {props.post.photo && (
          <div className={classes.photo}>
            <img
              className={classes.media}
              src={"/api/posts/photo/" + props.post._id}
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        {state.like ? (
          <IconButton
            onClick={like}
            className={classes.button}
            aria-label="Like"
            color="secondary"
          >
            <Favorite />
          </IconButton>
        ) : (
          <IconButton
            onClick={like}
            className={classes.button}
            aria-label="Unlike"
            color="secondary"
          >
            <FavoriteBorder />
          </IconButton>
        )}{" "}
        {state.likes}
        <IconButton
          className={classes.button}
          aria-label="Comment"
          color="secondary"
        >
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Comments
        postId={props.post._id}
        comments={state.comments}
        updateComments={updateComments}
      />
    </Card>
  );
};

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing.unit * 3,
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing.unit * 2}px 0px`
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  text: {
    margin: theme.spacing.unit * 2
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing.unit
  },
  media: {
    height: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(Post);
