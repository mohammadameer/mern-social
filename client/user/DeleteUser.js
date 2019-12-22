import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { remove } from "./api-user";
import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Button
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import propsTypes from "prop-types";
import { Redirect } from "react-router";

const DeleteUser = props => {
  const [state, setState] = useState({
    redirect: false,
    open: false
  });

  const toggleDialoge = () => {
    setState({ ...state, open: !state.open });
  };

  const submit = () => {
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

  return (
    <span>
      <IconButton
        araia-label="Delete"
        onClick={toggleDialoge}
        color="secondary"
      >
        <Delete />
      </IconButton>
      <Dialog open={state.open} onClose={toggleDialoge}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialoge} color="primary">
            Cancel
          </Button>
          <Button onClick={submit} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  userId: propsTypes.string.isRequired
};

export default DeleteUser;
