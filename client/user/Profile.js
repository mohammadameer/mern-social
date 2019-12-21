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

const Profile = props => {
  const [state, setState] = useState({
    user: "",
    redirectToSignin: false
  });
  const { userId } = useParams();

  useEffect(() => {
    init(userId);
  }, [state.user]);

  const init = userId => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) setState({ redirectToSignin: true });
      else setState({ user: data });
    });
  };

  const { classes } = props;
  const redirectToSignin = state.redirectToSignin;
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
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={state.user.name}
              secondary={state.user.email}
            />
            {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == state.user._id && (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + state.user._id}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  {/* <DeleteUser userId={state.user._id} /> */}
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={"joined: " + new Date(state.user.created).toDateString()}
            />
          </ListItem>
        </List>
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
