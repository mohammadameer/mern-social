import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";

const DeleteUser = props => {
  const [state, setState] = useState({
    redirect: false,
    open: false
  });

  toggleDialoge = () => {
    setState({ ...state, open: !state.open });
  };

  submit = () => {
    const jwt = auth.isAuthenticated();
    remove(
      {
        userId: props.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) console.error(data.error);
      else auth.signout(() => console.log("deleted"));
      setState({ ...state, redirect: true });
    });
  };

  if (state.redirect) return <Redirect to="/" />;
};

export default DeleteUser;
