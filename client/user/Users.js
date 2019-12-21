import React, { Component, useState, useEffect } from "react";
import { list } from "./api-user";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Person, ArrowForward } from "@material-ui/icons";

const styles = theme => ({
  root: {
    padding: 20
  },
  title: {
    color: theme.palette.openTitle,
    textAlign: "center"
  }
});

const Users = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    list()
      .then(users => setUsers(users))
      .catch(err => console.error(err));
  }, []);

  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users &&
          users.map((user, index) => (
            <Link to={"/user/" + user._id} key={index}>
              <ListItem button="button">
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
      </List>
    </Paper>
  );
};

export default withStyles(styles)(Users);
