import React, { Component } from "react";
import PropsTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, Typography, CardContent, CardMedia } from "@material-ui/core";

import seashellImg from "../assets/images/seashell.png";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding: theme.spacing(5),
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

@withStyles(styles)
class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia
            className={classes.media}
            image={seashellImg}
            title="Unicorn Shells"
          />
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the mern Skeleton home page
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropsTypes.object.isRequired
};

export default Home;
