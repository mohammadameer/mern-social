import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";

class MainRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}

export default MainRouter;
