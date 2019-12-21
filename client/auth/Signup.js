import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  CardActions,
  Button,
  DialogTitle
} from "@material-ui/core";
import { create } from "../user/api-user";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  }
});

const Signup = props => {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    error: "",
    open: false
  });

  const submit = () => {
    const user = {
      name: state.name || undefined,
      email: state.email || undefined,
      password: state.password || undefined
    };

    create(user).then(data => {
      if (data.error) setState({ ...state, error: data.error });
      else setState({ ...state, error: "", open: true });
    });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const { classes } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            SignUp
          </Typography>
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={state.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={state.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            value={state.password}
            onChange={handleChange("password")}
            margin="normal"
          />
          {state.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {state.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            raised="raised"
            onClick={submit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="raised">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(Signup);
