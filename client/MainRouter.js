import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./auth/Signup";
import SignIn from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
class MainRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/user/:userId">
          <Profile />
        </Route>
        <PrivateRoute path="/user/edit/:userId">
          <EditProfile />
        </PrivateRoute>
      </Switch>
    );
  }
}

export default MainRouter;
