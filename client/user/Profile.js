import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Redirect, useParams } from "react-router";
import {
  Paper,
  Typography,
  ListItemAvatar,
  ListItem,
  List,
  Avatar,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton,
  withStyles
} from "@material-ui/core";
import { Person, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";

const Profile = props => {
  const [state, setState] = useState({
    user: "",
    following: false,
    redirectToSignin: false
  });
  const { userId } = useParams();
  const jwt = auth.isAuthenticated();

  const checkFollow = user => {
    const match = user.followers.find(follower => {
      return follower._id == jwt.user._id;
    });
    return match;
  };

  useEffect(() => {
    init(userId);
  }, [userId]);

  const init = userId => {
    read(
      {
        userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) return setState({ redirectToSignin: true });
      let following = checkFollow(data);
      setState({ user: data, following });
    });
  };

  const clickFollowButton = callApi => {
    callApi(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      state.user._id
    ).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      else setState({ ...state, user: data, following: !state.following });
    });
  };

  const { classes } = props;
  const redirectToSignin = state.redirectToSignin;
  const photoUrl = state.user._id
    ? `/api/users/photo/${state.user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  if (redirectToSignin) return <Redirect to="/signin" />;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={state.user.name}
              secondary={state.user.email}
            />
            {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == state.user._id ? (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + state.user._id}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser
                  user={{ name: state.user.name, email: state.user.email }}
                  userId={state.user._id}
                />
              </ListItemSecondaryAction>
            ) : (
              <FollowProfileButton
                following={state.following}
                onButtonClick={clickFollowButton}
              />
            )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={state.user.about} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"joined: " + new Date(state.user.created).toDateString()}
            />
          </ListItem>
        </List>
        <ProfileTabs user={state.user} />
      </Paper>
    </div>
  );
};

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  }
});

export default withStyles(styles)(Profile);
