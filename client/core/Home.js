import React, { Component, useState, useEffect } from "react";
import PropsTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  Grid
} from "@material-ui/core";
import FindPeople from "../user/FindPeople";
import NewsFeed from "../post/NewsFeed";

import seashellImg from "../assets/images/seashell.png";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
  card: {
    padding: 30,
    width: "90%",
    margin: "auto",
    marginTop: theme.spacing(2)
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

const Home = props => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      setIsAuth(true);
    }
  });

  const { classes } = props;
  return (
    <Grid className={classes.card} container spacing={10}>
      {isAuth && (
        <React.Fragment>
          <Grid item xs={12} lg={7}>
            <NewsFeed />
          </Grid>
          <Grid item xs={12} lg={5}>
            <FindPeople />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
};

Home.propTypes = {
  classes: PropsTypes.object.isRequired
};

export default withStyles(styles)(Home);
