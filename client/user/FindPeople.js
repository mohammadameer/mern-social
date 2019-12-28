import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { findPeople, follow } from "./api-user";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Snackbar,
  withStyles,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Visibility } from "@material-ui/icons";

const FindPeople = props => {
  const [state, setState] = useState({
    users: [],
    open: false,
    followingMessage: "",
    error: ""
  });

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    findPeople(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      }
    ).then(data => {
      if (data.error) console.error(data.error);

      setState({ ...state, users: data });
    });
  }, []);

  const clickFollow = (user, index) => {
    follow(
      {
        userId: jwt.user._id
      },
      {
        t: jwt.token
      },
      user._id
    ).then(data => {
      if (data.error) return setState({ ...state, error: data.error });
      let toFollow = state.users;
      toFollow.splice(index, 1);
      setState({
        ...state,
        users: toFollow,
        open: true,
        followMessage: `Following ${user.name}!`
      });
    });
  };

  const handleRequestClose = () => {
    setState({ ...state, open: false });
  };

  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          People you can follow
        </Typography>
        <List>
          {state.users &&
            state.users.map((user, index) => (
              <span key={index}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={"/api/users/photo/" + user._id} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/user/" + user._id}>
                      <IconButton
                        variant="raised"
                        color="secondary"
                        className={classes.viewButton}
                      >
                        <Visibility />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label="Follow"
                      variant="raised"
                      color="primary"
                      onClick={() => clickFollow(user, index)}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            ))}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{state.followMessage}</span>}
      />
    </div>
  );
};

FindPeople.PropTypes = {
  classes: PropTypes.object
};

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: 0
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit}px ${theme.spacing
      .unit * 2}px`,
    color: theme.palette.openTitle,
    fontSize: "1em"
  },
  avatar: {
    marginRight: theme.spacing.unit * 1
  },
  follow: {
    right: theme.spacing.unit * 2
  },
  snack: {
    color: theme.palette.protectedTitle
  },
  viewButton: {
    verticalAlign: "middle"
  }
});

export default withStyles(styles)(FindPeople);
