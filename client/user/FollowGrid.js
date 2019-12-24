import React from "react";
import {
  GridList,
  GridListTile,
  Typography,
  withStyles,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";

const FollowGrid = props => {
  const { classes, people } = props;
  return (
    <div className={classes.root} style={{ flexGrow: 1 }}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {people &&
          people.map((person, index) => (
            <GridListTile style={{ height: 120 }} key={index}>
              <Link to={`/user/${person._id}`}>
                <Avatar
                  src={"/api/users/photo/" + person._id}
                  className={classes.bigAvatar}
                />
                <Typography className={classes.tileText}>
                  {person.name}
                </Typography>
              </Link>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  gridList: {
    width: 500,
    height: 220
  },
  tileText: {
    textAlign: "center",
    marginTop: 10
  }
});

export default withStyles(styles)(FollowGrid);
