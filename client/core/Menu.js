import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Home } from "@material-ui/icons";
import auth from "../auth/auth-helper";

const Menu = () => {
  const history = useHistory();

  const isActive = path => {
    if (history.location.pathname == path) return { color: "#ff4081" };
    else return { color: "#fffff" };
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive("/")}>
            <Home />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive("/users")}>Users</Button>
        </Link>
        {!auth.isAuthenticated() ? (
          <span>
            <Link to="/signup">
              <Button style={isActive("/signup")}>Sign Up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive("/signin")}>Sign In</Button>
            </Link>
          </span>
        ) : (
          <span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button
                style={isActive("/user/" + auth.isAuthenticated().user._id)}
              >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => auth.signout(() => history.push("/"))}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
