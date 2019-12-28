import React, { useState } from "react";
import {
  CardHeader,
  Avatar,
  TextField,
  withStyles,
  Icon
} from "@material-ui/core";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import { comment, uncomment } from "./api-post";

const Comments = props => {
  const [text, setText] = useState("");

  const jwt = auth.isAuthenticated();

  const { classes } = props;

  const handleChange = () => event => {
    setText(event.target.value);
  };

  const commentBody = comment => (
    <p className={classes.commentText}>
      <Link to={"/user/" + comment.postedBy._id}>{comment.postedBy.name}</Link>
      {comment.text}
      <span className={classes.commentDate}>
        {new Date(comment.created).toDateString()} |{" "}
        {auth.isAuthenticated().user._id == comment.postedBy._id && (
          <Icon
            onClick={deleteComment(comment)}
            className={classes.commentDelete}
          >
            delete
          </Icon>
        )}
      </span>
    </p>
  );

  const addComment = event => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      comment(
        {
          userId: jwt.user._id
        },
        {
          t: jwt.token
        },
        props.postId,
        { text }
      ).then(data => {
        if (data.error) return console.log(data.error);
        setText("");
        props.updateComments(data.comments);
      });
    }
  };

  const deleteComment = comment => event => {
    uncomment(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      props.postId,
      comment
    ).then(data => {
      if (data.error) console.log(data.error);
      else props.updateComments(data.comments);
    });
  };

  return (
    <div>
      <CardHeader
        avatar={<Avatar className={classes.smallAvatar} />}
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange("text")}
            placeholder="Write Something ..."
            className={classes.commentField}
            margin="normal"
          />
        }
        className={classes.cardHeader}
      />
      {props.comments.map((comment, index) => (
        <CardHeader
          key={index}
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={"/api/users/photo/" + comment.postedBy._id}
            />
          }
          title={commentBody(comment)}
          className={classes.cardHeader}
        />
      ))}
    </div>
  );
};

const styles = theme => ({
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  smallAvatar: {
    width: 25,
    height: 25
  },
  commentField: {
    width: "96%"
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing.unit,
    margin: `2px ${theme.spacing.unit * 2}px 2px 2px`
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em"
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer"
  }
});
export default withStyles(styles)(Comments);
