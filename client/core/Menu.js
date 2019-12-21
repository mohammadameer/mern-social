import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/"></Link>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
